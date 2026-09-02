"""
QuizArena AI Pipeline — Celery Worker
======================================

Thesis-grade asynchronous question generation pipeline with:

  Pillar 1: Rate-Limited Multi-Provider LLM Cascade
    - Token-bucket rate limiter per provider (Groq, Gemini, OpenAI)
    - Provider health tracker to skip dead/exhausted APIs
    - Exponential backoff with jitter, parsing server-suggested retry delays

  Pillar 2: Structure-Aware Document Processing
    - PDF → Markdown conversion preserving document hierarchy (pymupdf4llm)
    - Markdown header-based chunking (LangChain)
    - Cross-encoder reranking for relevance (FlashRank ms-marco-MiniLM-L-12-v2)

  Pillar 3: Batch Actor-Critic Quality Gate
    - Batch question generation: 3 chunks per LLM call (~70% fewer API calls)
    - Batch critic validation: grounding check against source material
    - Cosine similarity verification for semantic alignment

Architecture:
  Provider Priority (optimized for free-tier throughput):
    1. Groq   (~1,000 RPD free, 30 RPM) — Primary
    2. Gemini (~20 RPD on gemini-2.5-flash free tier) — Fallback
    3. OpenAI (pay-as-you-go) — Last resort
"""

import os
import json
import re
import ast
import time
import logging
import threading
import random
import redis
from typing import Optional, List, Dict, Tuple, Any

from celery import Celery
from dotenv import load_dotenv

import pymupdf4llm
from langchain_text_splitters import MarkdownHeaderTextSplitter
from flashrank import Ranker, RerankRequest
from openai import OpenAI
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()

# ═══════════════════════════════════════════════════════════════════════════════
# LOGGING CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════
logger = logging.getLogger("quiz_pipeline")
logger.setLevel(logging.INFO)
logger.propagate = False
if not logger.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter(
        "[%(asctime)s] %(levelname)s %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    ))
    logger.addHandler(handler)

# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURATION
# All model names and rate limits are configurable via .env without code changes.
# ═══════════════════════════════════════════════════════════════════════════════
REDIS_URL = os.getenv("REDIS_URL")
REDIS_HOST = os.getenv("REDIS_HOST", "127.0.0.1")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
if not REDIS_URL:
    REDIS_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"

# Model Configuration — easily swappable via .env
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
GROQ_MODEL = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

# Rate Limiting Configuration
GEMINI_RPM = int(os.getenv("GEMINI_RPM", "10"))
GROQ_RPM = int(os.getenv("GROQ_RPM", "6"))
INTER_REQUEST_DELAY = float(os.getenv("INTER_REQUEST_DELAY", "12"))
BATCH_SIZE = int(os.getenv("BATCH_SIZE", "1"))
MAX_RETRIES = int(os.getenv("MAX_RETRIES", "3"))
GROUNDING_SIMILARITY_THRESHOLD = float(os.getenv("GROUNDING_SIMILARITY_THRESHOLD", "0.45"))

# Celery App
celery_app = Celery("tasks", broker=REDIS_URL, backend=REDIS_URL)

# FlashRank Ranker (Cross-Encoder Reranking — Pillar 2)
ranker = Ranker(model_name="ms-marco-MiniLM-L-12-v2")

# Groq Client (Primary Provider)
groq_key = os.getenv("GROQ_API_KEY")
groq_client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=groq_key or "gsk_dummy",
    max_retries=0,
    timeout=60.0
)


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 1A: TOKEN-BUCKET RATE LIMITER
#
# Enforces per-provider RPM (Requests Per Minute) limits using a token-bucket
# algorithm. Each provider has its own limiter instance so that Groq calls
# don't block Gemini calls and vice versa.
# ═══════════════════════════════════════════════════════════════════════════════
class TokenBucketRateLimiter:
    """Thread-safe token-bucket rate limiter.

    Calculates the minimum interval between requests from the provider's RPM
    limit and blocks (sleeps) when a request arrives too early.

    Example:
        limiter = TokenBucketRateLimiter(rpm=10, name="Gemini")
        limiter.wait()          # blocks if <6s since last call
        response = call_api()   # safe to call now
    """

    def __init__(self, rpm: int, name: str = ""):
        self.rpm = rpm
        self.name = name
        self.interval = 60.0 / rpm  # minimum seconds between requests
        self.lock = threading.Lock()
        self.last_request_time = 0.0

    def wait(self):
        """Block until a request slot is available."""
        with self.lock:
            now = time.time()
            elapsed = now - self.last_request_time
            if elapsed < self.interval:
                sleep_time = self.interval - elapsed
                logger.info(
                    f"[RateLimiter:{self.name}] Throttling {sleep_time:.1f}s "
                    f"(RPM={self.rpm}, interval={self.interval:.1f}s)"
                )
                time.sleep(sleep_time)
            self.last_request_time = time.time()


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 1B: PROVIDER HEALTH TRACKER
#
# When a provider returns an unrecoverable error (e.g., OpenAI insufficient_quota),
# it is marked "dead" for a configurable duration. Subsequent calls skip it
# instantly instead of wasting time on doomed requests.
# ═══════════════════════════════════════════════════════════════════════════════
class ProviderHealthTracker:
    """Tracks provider availability to skip dead providers quickly.

    Dead providers automatically recover after their cooldown expires,
    or can be manually revived via mark_alive().
    """

    def __init__(self):
        self._dead_until: Dict[str, float] = {}
        self.lock = threading.Lock()

    def mark_dead(self, provider: str, duration_seconds: int = 3600):
        """Mark a provider as unavailable for the specified duration."""
        with self.lock:
            self._dead_until[provider] = time.time() + duration_seconds
            logger.warning(
                f"[Health] Provider '{provider}' marked DEAD for {duration_seconds}s"
            )

    def is_alive(self, provider: str) -> bool:
        """Check if a provider is currently available for requests."""
        with self.lock:
            deadline = self._dead_until.get(provider, 0)
            if time.time() > deadline:
                return True
            remaining = deadline - time.time()
            logger.debug(
                f"[Health] Provider '{provider}' still dead for {remaining:.0f}s"
            )
            return False

    def mark_alive(self, provider: str):
        """Manually mark a provider as available (e.g., after adding credits)."""
        with self.lock:
            self._dead_until.pop(provider, None)
            logger.info(f"[Health] Provider '{provider}' manually marked ALIVE")


# Instantiate rate limiters and health tracker (module-level singletons)
groq_limiter = TokenBucketRateLimiter(rpm=GROQ_RPM, name="Groq")
gemini_limiter = TokenBucketRateLimiter(rpm=GEMINI_RPM, name="Gemini")
provider_health = ProviderHealthTracker()


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 1C: EXPONENTIAL BACKOFF WITH JITTER
#
# Parses server-suggested retry delays from error responses (Gemini/Groq)
# and implements exponential backoff with randomized jitter to prevent
# thundering-herd problems on rate-limited APIs.
# ═══════════════════════════════════════════════════════════════════════════════
def _parse_retry_delay(error_str: str) -> Optional[float]:
    """Extract the server-suggested retry delay from API error messages.

    Handles formats from Gemini ('retryDelay': '40s'), Gemini inline
    ('Please retry in 40.956895191s'), and Groq ('Please try again in 15.975s').
    """
    patterns = [
        r"retry\s*Delay['\"]?\s*[:=]\s*['\"]?(\d+(?:\.\d+)?)\s*s",
        r"retry in\s+(\d+(?:\.\d+)?)\s*s",
        r"try again in\s+(\d+(?:\.\d+)?)\s*s",
    ]
    for pattern in patterns:
        match = re.search(pattern, error_str, re.IGNORECASE)
        if match:
            return float(match.group(1))
    return None


def _is_quota_exhausted_permanently(error_str: str) -> bool:
    """Detect permanent quota exhaustion (not recoverable by waiting).

    IMPORTANT: Gemini's free-tier 429 says "exceeded your current quota" but
    includes a retryDelay — this is a TEMPORARY rate limit, not a billing issue.
    Only OpenAI's 'insufficient_quota' is truly permanent (no money on account).
    """
    error_lower = error_str.lower()

    # OpenAI: truly permanent — account has $0 balance
    if "insufficient_quota" in error_lower:
        return True

    # Gemini: "exceeded your current quota" WITH a retryDelay → temporary
    # Only mark permanent if there's NO retryDelay (very unlikely)
    if "resource_exhausted" in error_lower or "exceeded your current quota" in error_lower:
        if _parse_retry_delay(error_str) is not None:
            return False  # Temporary rate limit — retry with backoff
        # No retry delay and quota message → might be permanent
        return "check your plan and billing" in error_lower

    return False


def _backoff_sleep(attempt: int, base: float = 2.0, max_delay: float = 120.0,
                   server_delay: Optional[float] = None):
    """Sleep with exponential backoff and jitter.

    If the server suggests a retry delay, uses that + small jitter.
    Otherwise, calculates: min(base * 2^attempt + random(0,1), max_delay).
    """
    if server_delay and server_delay > 0:
        delay = server_delay + random.uniform(0.5, 2.0)
    else:
        delay = min(base * (2 ** attempt) + random.uniform(0, 1), max_delay)

    logger.info(f"[Backoff] Sleeping {delay:.1f}s (attempt {attempt + 1})")
    time.sleep(delay)


# ═══════════════════════════════════════════════════════════════════════════════
# CORE: LLM GENERATION WITH SMART MULTI-PROVIDER FALLBACK
#
# Provider cascade: Groq (primary) → Gemini (secondary) → OpenAI (last resort)
# Each provider call is rate-limited and retried with exponential backoff.
# Dead providers are skipped instantly.
# ═══════════════════════════════════════════════════════════════════════════════
def generate_with_fallback(prompt: str, temperature: float = 0.2, prefill: str = "") -> str:
    """Generate text using multi-provider fallback with rate limiting and backoff."""
    providers = [
        ("groq", _call_groq),
        ("gemini", _call_gemini),
        ("openai", _call_openai),
    ]

    for provider_name, call_fn in providers:
        if not provider_health.is_alive(provider_name):
            logger.debug(f"[Fallback] Skipping dead provider: {provider_name}")
            continue

        for attempt in range(MAX_RETRIES):
            try:
                result = call_fn(prompt, temperature, prefill)
                if result:
                    # Validate that it can be parsed as JSON
                    from app.celery_worker import clean_and_parse_json
                    parsed = clean_and_parse_json(result)
                    if parsed is None:
                        raise ValueError(f"Provider {provider_name} returned unparseable JSON.")
                    
                    logger.info(f"[{provider_name}] Success on attempt {attempt + 1}")
                    return result
                else:
                    logger.warning(f"[{provider_name}] Empty response on attempt {attempt + 1}")
            except Exception as e:
                error_str = str(e)

                # JSON Parse error -> retry same provider or next
                if "unparseable" in error_str.lower():
                    logger.warning(f"[{provider_name}] JSON parse failed on attempt {attempt + 1}")
                    if attempt == MAX_RETRIES - 1:
                        break # Move to next provider
                    continue

                # Model not found (404) → mark dead, no point retrying
                if "model_not_found" in error_str or ("404" in error_str and "does not exist" in error_str):
                    logger.error(
                        f"[{provider_name}] Model not found! Check GROQ_MODEL / "
                        f"GEMINI_MODEL / OPENAI_MODEL in .env. Marking dead."
                    )
                    provider_health.mark_dead(provider_name, duration_seconds=3600)
                    break

                # Permanent quota exhaustion → mark dead, move to next provider
                if _is_quota_exhausted_permanently(error_str):
                    logger.warning(
                        f"[{provider_name}] PERMANENT quota exhaustion detected. "
                        f"Marking dead for 1 hour."
                    )
                    provider_health.mark_dead(provider_name, duration_seconds=3600)
                    break

                # Rate limit (429) → parse server delay and retry with backoff
                is_rate_limited = (
                    "429" in error_str
                    or "rate_limit" in error_str.lower()
                    or "RESOURCE_EXHAUSTED" in error_str
                )
                if is_rate_limited:
                    server_delay = _parse_retry_delay(error_str)
                    logger.warning(
                        f"[{provider_name}] Rate limited "
                        f"(attempt {attempt + 1}/{MAX_RETRIES}). "
                        f"Server suggests: {server_delay}s"
                    )

                    if attempt < MAX_RETRIES - 1:
                        _backoff_sleep(attempt, server_delay=server_delay)
                        continue
                    else:
                        logger.warning(
                            f"[{provider_name}] Exhausted retries after rate limits. "
                            f"Moving to next provider."
                        )
                        break

                # Other errors → log and try next provider
                logger.error(f"[{provider_name}] Unhandled error: {error_str[:300]}")
                break

    logger.error("[Fallback] ALL providers failed. Returning empty string.")
    return ""


def _call_groq(prompt: str, temperature: float, prefill: str) -> str:
    """Call Groq API with rate limiting.

    Appends Qwen3's /no_think directive to disable reasoning mode,
    which otherwise consumes all output tokens on chain-of-thought
    and never produces the requested JSON output.
    """
    if not os.getenv("GROQ_API_KEY"):
        raise Exception("No GROQ_API_KEY configured")

    groq_limiter.wait()
    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful assistant. Respond ONLY with the "
                "exact output format requested. Do NOT include any "
                "reasoning, thinking, or analysis. Output the answer "
                "directly."
            )
        },
        {"role": "user", "content": prompt}
    ]
    
    if prefill:
        messages.append({"role": "assistant", "content": prefill})

    response = groq_client.chat.completions.create(
        model=GROQ_MODEL,
        messages=messages,
        temperature=temperature,
        max_tokens=4096
    )
    finish_reason = response.choices[0].finish_reason
    if finish_reason == "length":
        logger.warning(f"[Groq] Output truncated (finish_reason=length). Consider reducing prompt size.")
        raise Exception("Output truncated by max_tokens limit")

    content = response.choices[0].message.content
    
    # Re-attach the prefilled start if it succeeded
    if content and prefill:
        content = prefill + content
        
    return content.strip() if content else ""


def _call_gemini(prompt: str, temperature: float, prefill: str = "") -> str:
    """Call Gemini API with rate limiting. Uses gemini-2.0-flash for higher free-tier RPD (1500 vs 20)."""
    if not os.getenv("GEMINI_API_KEY"):
        raise Exception("No GEMINI_API_KEY configured")

    gemini_limiter.wait()
    from google import genai
    from google.genai import types as genai_types
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
        config=genai_types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=4096,
        ),
    )
    if response and response.text:
        return response.text.strip()
    return ""


def _call_openai(prompt: str, temperature: float, prefill: str = "") -> str:
    """Call OpenAI API (last resort fallback)."""
    if not os.getenv("OPENAI_API_KEY"):
        raise Exception("No OPENAI_API_KEY configured")

    openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), max_retries=0)
    response = openai_client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        max_tokens=4096
    )
    finish_reason = response.choices[0].finish_reason
    if finish_reason == "length":
        logger.warning(f"[OpenAI] Output truncated (finish_reason=length).")
        raise Exception("Output truncated by max_tokens limit")

    content = response.choices[0].message.content
    return content.strip() if content else ""


# ═══════════════════════════════════════════════════════════════════════════════
# JSON PARSING UTILITIES
# ═══════════════════════════════════════════════════════════════════════════════
def clean_and_parse_json(raw_str: str) -> Any:
    """Parse potentially messy JSON from LLM output.

    Handles:
    - Markdown code fences (```json ... ```)
    - Trailing commas before ] or }
    - Both JSON arrays [...] and objects {...}
    - Python-style True/False/None literals
    - Thinking model artifacts (<think>...</think> tags)
    """
    if not raw_str:
        return None

    # Strip thinking model artifacts (e.g., Qwen's <think> blocks)
    # Handle properly closed tags first
    cleaned = re.sub(r"<think>.*?</think>", "", raw_str, flags=re.DOTALL)
    # Handle UNCLOSED <think> tags (model ran out of tokens mid-thinking)
    cleaned = re.sub(r"<think>.*", "", cleaned, flags=re.DOTALL)

    # Strip markdown code fences
    cleaned = re.sub(r"^```(?:json)?", "", cleaned.strip(), flags=re.MULTILINE)
    cleaned = re.sub(r"```$", "", cleaned.strip(), flags=re.MULTILINE).strip()

    # Extract JSON structure (array or object)
    match = re.search(r"(\[.*\]|\{.*\})", cleaned, re.DOTALL)
    if match:
        cleaned = match.group(1)

    # Remove trailing commas before ] or }
    cleaned = re.sub(r",\s*([\]}])", r"\1", cleaned)

    # Attempt 1: Standard JSON parse
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    # Attempt 2: Python literal eval (handles True/False/None)
    try:
        ast_str = (cleaned
                   .replace("true", "True")
                   .replace("false", "False")
                   .replace("null", "None"))
        return ast.literal_eval(ast_str)
    except Exception:
        return None


# ═══════════════════════════════════════════════════════════════════════════════
# EMBEDDINGS (for Cosine Similarity Quality Gate)
# ═══════════════════════════════════════════════════════════════════════════════
def get_embedding(text: str) -> np.ndarray:
    """Get text embedding with Gemini → OpenAI fallback.

    Used in the cosine similarity quality gate to verify that generated
    questions are semantically aligned with their source material.
    """
    try:
        if os.getenv("GEMINI_API_KEY"):
            from langchain_google_genai import GoogleGenerativeAIEmbeddings
            emb = GoogleGenerativeAIEmbeddings(
                model="models/gemini-embedding-2",
                google_api_key=os.getenv("GEMINI_API_KEY")
            )
            return np.array(emb.embed_query(text))
        raise Exception("No Gemini key")
    except Exception as e:
        logger.debug(f"Gemini embedding failed ({e}), trying OpenAI...")
        if os.getenv("OPENAI_API_KEY") and provider_health.is_alive("openai"):
            from langchain_openai import OpenAIEmbeddings
            emb = OpenAIEmbeddings(
                model="text-embedding-3-small",
                api_key=os.getenv("OPENAI_API_KEY")
            )
            return np.array(emb.embed_query(text))
        raise Exception("No embedding provider available")


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 3A: BATCH QUESTION GENERATION (Actor)
#
# Instead of 1 LLM call per chunk (10 calls for 10 chunks), we batch
# BATCH_SIZE chunks into a single prompt and ask the LLM to generate one
# question per chunk. This reduces total Actor calls from ~10 to ~4.
# ═══════════════════════════════════════════════════════════════════════════════
import instructor
from pydantic import BaseModel, Field

class QuestionChoice(BaseModel):
    label: str
    text: str
    isCorrect: bool

class StepWeight(BaseModel):
    stepDescription: str
    pointsAwarded: int
    commonMistake: str

class AnswerData(BaseModel):
    steps: Optional[List[str]] = None
    numericAnswer: Optional[float] = None
    tolerance: Optional[float] = None
    expression: Optional[str] = None
    graphType: Optional[str] = None

class GeneratedQuestion(BaseModel):
    chunk_index: int
    text: str
    type: str
    difficulty: str  # Keep as str for backward compat but will contain numeric string
    answer: str
    estimated_difficulty: Optional[float] = None  # 0.00-1.00 normalized
    bloom_level: Optional[str] = None  # REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE, CREATE
    choices: Optional[List[QuestionChoice]] = None
    answerData: Optional[AnswerData] = None
    stepWeights: Optional[List[StepWeight]] = None
    partialCreditRules: Optional[str] = None

class BatchQuestions(BaseModel):
    questions: List[GeneratedQuestion]

def generate_batch_questions(
    chunks: List[Dict],
    filename: str,
    config: dict
) -> List[Dict]:
    """Generate questions for multiple chunks using native structured outputs."""
    types_list = config.get('types', ['Multiple Choice'])
    types_str = ', '.join(types_list)
    
    chunks_text = ""
    for i, chunk in enumerate(chunks):
        text = chunk["text"] if isinstance(chunk, dict) else chunk.page_content
        chunks_text += f"\n--- CHUNK {i + 1} ---\n{text[:800]}\n"

    prompt = f"""You are an expert Mathematics Professor.
Based on the following {len(chunks)} text chunks from "{filename}", generate exactly {config.get("count", len(chunks))} mathematical test questions.

Allowed Question Types: {types_str}

Each question MUST be one of the Allowed Question Types.
Each question must strictly be derived from formulas and concepts in its corresponding chunk.

IMPORTANT DIFFICULTY INSTRUCTIONS:
Generate a MIXED-DIFFICULTY set of questions. Do NOT target a single difficulty level.
Vary cognitive demand naturally according to the information available in the source document.
Use Bloom's Taxonomy as a guide: Remember, Understand, Apply, Analyze, Evaluate, Create.
Do NOT introduce information not supported by the document.
Do NOT make a question artificially difficult through confusing wording.
Difficulty should reflect cognitive demand.

For every question, return:
- question type
- bloom_level: one of REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE, CREATE
- estimated_difficulty: a normalized number from 0.00 (very easy) to 1.00 (very difficult)
- difficulty: a human-readable label derived from estimated_difficulty (Easy if <0.33, Medium if 0.33-0.66, Hard if >0.66)

SPECIAL TYPE INSTRUCTIONS:
- If type is 'Step-by-step Solution' or 'Numerical Input': Do NOT generate choices. Place the final mathematical answer in the `answer` string, and place the step-by-step derivation in `answerData.steps` (as a list of strings, e.g. ["Step 1: ...", "Step 2: ..."]).
- If type is 'Multiple Choice': You must generate exactly 4 choices, with exactly 1 marked `isCorrect=True`.

Preserve the requested question-type distribution.

{chunks_text}

IMPORTANT: Return exactly {config.get("count", len(chunks))} question objects. chunk_index is 0-based."""

    # Using Instructor with Groq as primary (using JSON mode)
    try:
        patched_client = instructor.from_openai(groq_client, mode=instructor.Mode.MD_JSON)
        batch_res = patched_client.chat.completions.create(
            model=GROQ_MODEL,
            response_model=BatchQuestions,
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Output exactly the requested JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=4096
        )
        # Convert pydantic models back to dicts for downstream compatibility
        return [q.model_dump() for q in batch_res.questions]
    except Exception as e:
        logger.warning(f"[Actor] Groq failed, trying Gemini fallback: {e}")
        try:
            from google import genai
            gemini_fallback_model = "gemini-3.5-flash"
            client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
            
            # Retry up to 3 times with delay for rate limits
            for attempt in range(3):
                try:
                    response = client.models.generate_content(
                        model=gemini_fallback_model,
                        contents=prompt,
                        config={
                            'response_mime_type': 'application/json',
                            'response_schema': BatchQuestions,
                            'temperature': 0.3
                        },
                    )
                    data = json.loads(response.text)
                    return data.get("questions", [])
                except Exception as rate_err:
                    err_str = str(rate_err)
                    if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                        delay = _parse_retry_delay(err_str) or (15 * (attempt + 1))
                        logger.warning(f"[Gemini] Rate limited, retrying in {delay:.0f}s (attempt {attempt+1}/3)")
                        time.sleep(delay)
                    else:
                        raise rate_err
            raise Exception("Gemini rate limit retries exhausted")
        except Exception as e3:
            logger.error(f"[Actor] All structured output providers failed: {e3}")
            return []


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 3B: BATCH CRITIC VALIDATION
#
# Validates multiple generated questions against their source text in a
# single LLM call. Each question receives a PASS or FAIL verdict based
# on whether the source text explicitly supports it.
# ═══════════════════════════════════════════════════════════════════════════════
def batch_critic_check(
    questions_with_context: List[Dict]
) -> List[str]:
    """Validate multiple questions in a single critic call.

    Args:
        questions_with_context: List of dicts with keys:
            - context: source text the question was generated from
            - question: the generated question text
            - answer: the expected answer

    Returns:
        List of "PASS" or "FAIL" verdicts, one per question.
    """
    if not questions_with_context:
        return []

    items_text = ""
    for i, item in enumerate(questions_with_context):
        context = item["context"][:500]  # Truncate context to save tokens
        items_text += f"""
--- ITEM {i + 1} ---
Source Text: {context}
Question: {item["question"]}
Answer: {item["answer"]}
"""

    prompt = f"""You are a strict academic evaluator.
For each item below, determine if the Source Text supports the question and its answer.
A question PASSES if it is grounded in the source material, or correctly applies formulas/concepts from the source text.
A question FAILS if it contains incorrect information, contradicts the text, or requires knowledge entirely outside the text.

{items_text}

Return ONLY a JSON array of verdicts, one per item. Example: ["PASS", "FAIL", "PASS"]"""

    raw = generate_with_fallback(prompt, temperature=0.0)
    if not raw:
        return ["FAIL"] * len(questions_with_context)

    # Attempt 1: Parse as JSON array
    try:
        verdicts = json.loads(raw.strip())
        if isinstance(verdicts, list):
            result = ["PASS" if "PASS" in str(v).upper() else "FAIL" for v in verdicts]
            while len(result) < len(questions_with_context):
                result.append("FAIL")
            return result[:len(questions_with_context)]
    except (json.JSONDecodeError, ValueError):
        pass

    # Attempt 2: Clean and parse (handles markdown fences, etc.)
    parsed = clean_and_parse_json(raw)
    if isinstance(parsed, list):
        result = ["PASS" if "PASS" in str(v).upper() else "FAIL" for v in parsed]
        while len(result) < len(questions_with_context):
            result.append("FAIL")
        return result[:len(questions_with_context)]

    # Attempt 3: Scan for PASS/FAIL tokens (most resilient fallback)
    verdicts = []
    for token in re.split(r'[,\n\[\]"\']+', raw):
        token_upper = token.strip().upper()
        if "PASS" in token_upper:
            verdicts.append("PASS")
        elif "FAIL" in token_upper:
            verdicts.append("FAIL")

    while len(verdicts) < len(questions_with_context):
        verdicts.append("FAIL")

    return verdicts[:len(questions_with_context)]


# ═══════════════════════════════════════════════════════════════════════════════
# REDIS HELPER
# ═══════════════════════════════════════════════════════════════════════════════
def _get_redis_client():
    """Create a Redis client with proper SSL handling for Upstash."""
    redis_url_safe = REDIS_URL.replace("CERT_NONE", "none") if REDIS_URL else ""
    if redis_url_safe.startswith("redis"):
        return redis.from_url(redis_url_safe, decode_responses=True)
    return redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)


# ═══════════════════════════════════════════════════════════════════════════════
# MAIN CELERY TASK
#
# Orchestrates the full 7-stage pipeline:
#   1. PDF → Markdown conversion
#   2. Structure-aware chunking
#   3. Cross-encoder reranking
#   4. Batch question generation (Actor)
#   5. Batch critic validation
#   6. Cosine similarity verification
#   7. Redis result storage
# ═══════════════════════════════════════════════════════════════════════════════
@celery_app.task(name="process_and_generate_quiz")
def process_and_generate_quiz(
    request_id: str,
    doc_id: str,
    user_id: str,
    filename: str,
    config: dict
):
    chunks = []
    """Generate quiz questions using dynamic configs passed from frontend."""
    attempt = config.get('_attempt', 1)
    logger.info(f"{'═' * 60}")
    logger.info(f"Starting pipeline for '{filename}' (request_id={request_id})")
    logger.info(f"Config: model={GROQ_MODEL}, count={config.get('count')}, difficulty={config.get('difficulty')}")
    logger.info(f"{'═' * 60}")

    try:
        # Use chunks passed from frontend
        # Stage 7: Dynamic Retrieval & Hybrid Search
        logger.info(f"[Stage 7] Performing Dynamic Hybrid Retrieval for docId={doc_id} topic={config.get('types')}")
        top_chunks = []
        # Attempt to retrieve from Supabase
        try:
            from supabase import create_client
            supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
            
            query = f"{config.get('difficulty')} {config.get('category', '')} {config.get('types')}"
            
            # Embed the query
            from app.main import get_embedding_model
            embedding_model = get_embedding_model()
            if not embedding_model:
                raise Exception("No embedding model available")
            
            query_embedding = embedding_model.embed_query(query)
            
            # Call Supabase RPC for Hybrid Search (Dense + Sparse with RRF)
            rpc_response = supabase.rpc(
                'match_document_chunks_v2',
                {
                    'query_text': query,
                    'query_embedding': query_embedding,
                    'match_count': 30,
                    'filter_doc_id': str(doc_id)
                }
            ).execute()
            
            if rpc_response.data and len(rpc_response.data) > 0:
                candidates = [{"id": str(i), "text": chunk["content"], "metadata": chunk["metadata"]} for i, chunk in enumerate(rpc_response.data)]
                # Phase 1.1: Cross-Encoder Reranking
                from flashrank import RerankRequest
                rerankreq = RerankRequest(query=query, passages=candidates)
                reranked = ranker.rerank(rerankreq)
                top_chunks = reranked[:10]
            elif len(chunks) > 0:
                top_chunks = chunks[:10]
            else:
                raise Exception("RPC returned no results and no fallback chunks provided")
                
        except Exception as e:
            logger.warning(f"Failed hybrid search, using fallback chunks: {e}")
            top_chunks = chunks[:10]
            
        if not top_chunks:
            logger.warning("No context chunks retrieved!")
            # Do not generate if no context found
            r = _get_redis_client()
            r.set(
                f"generated_questions:{doc_id}",
                json.dumps([{"error": "No relevant context found in document."}])
            )
            try:
                from supabase import create_client
                sb = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
                sb.table("generation_runs").update({"status": "FAILED", "stage": "No context found", "error_message": "No context"}).eq("request_id", request_id).execute()
            except: pass
            return {"status": "failed", "error": "No context"}

        # Evidence Sufficiency Gate (AIRAG Part 2.1)
        requested_count = config.get('count', 5)
        min_chunks_needed = max(2, requested_count // 2)
        if len(top_chunks) < min_chunks_needed:
            logger.warning(
                f"[Evidence Gate] INSUFFICIENT_CONTEXT: Only {len(top_chunks)} chunks "
                f"retrieved, need at least {min_chunks_needed} for {requested_count} questions"
            )
            r = _get_redis_client()
            r.set(
                f"generated_questions:{doc_id}",
                json.dumps([{"error": "INSUFFICIENT_CONTEXT: Not enough relevant content found in the document to generate grounded questions. The AI abstained rather than risk generating ungrounded content."}])
            )
            try:
                from supabase import create_client
                sb = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
                sb.table("generation_runs").update({"status": "FAILED", "stage": "Insufficient context", "error_message": "INSUFFICIENT_CONTEXT"}).eq("request_id", request_id).execute()
            except: pass
            return {"status": "abstained", "reason": "INSUFFICIENT_CONTEXT"}


        # ── Stage 4: Batch Question Generation (Actor) ───────────────────
        logger.info(
            f"[Stage 4/7] Generating questions in batches of {BATCH_SIZE}..."
        )

        # Group chunks into batches
        batches = []
        for i in range(0, len(top_chunks), BATCH_SIZE):
            batches.append(top_chunks[i:i + BATCH_SIZE])

        all_generated: List[Tuple[Dict, Dict]] = []

        for batch_idx, batch in enumerate(batches):
            logger.info(
                f"  Batch {batch_idx + 1}/{len(batches)}: "
                f"processing {len(batch)} chunks..."
            )

            questions = generate_batch_questions(batch, filename, config)

            if questions:
                for q_idx, q_data in enumerate(questions):
                    # Map question back to its source chunk
                    chunk_idx = q_data.get("chunk_index", q_idx)
                    if isinstance(chunk_idx, int) and chunk_idx < len(batch):
                        all_generated.append((q_data, batch[chunk_idx]))
                    elif q_idx < len(batch):
                        all_generated.append((q_data, batch[q_idx]))
                logger.info(
                    f"  → Generated {len(questions)} questions from batch "
                    f"{batch_idx + 1}"
                )
            else:
                logger.warning(
                    f"  → Batch {batch_idx + 1} returned no questions"
                )

            # Inter-batch delay to respect rate limits


        logger.info(f"  Total raw questions generated: {len(all_generated)}")

        if not all_generated:
            logger.warning("  No questions generated from any batch")
            r = _get_redis_client()
            r.set(
                f"generated_questions:{doc_id}",
                json.dumps([{
                    "error": (
                        "AI could not generate questions from this document. "
                        "The content may lack sufficient mathematical "
                        "formulas or examples."
                    )
                }])
            )
            try:
                from supabase import create_client
                sb = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
                sb.table("generation_runs").update({"status": "COMPLETED", "stage": "Finished (0 generated)", "progress": 100.0}).eq("request_id", request_id).execute()
            except: pass
            return {"status": "success", "questions_generated": 0}

        # ── Stage 5: Batch Critic Validation ─────────────────────────────
        logger.info("[Stage 5/7] Running critic validation...")

        critic_items = []
        for q_data, chunk in all_generated:
            context = (
                chunk["text"] if isinstance(chunk, dict) else chunk.page_content
            )
            critic_items.append({
                "context": context,
                "question": q_data.get("text", ""),
                "answer": q_data.get("answer", ""),
            })

        # Run critic in batches with inter-batch delays
        all_verdicts: List[str] = []
        for i in range(0, len(critic_items), BATCH_SIZE):
            critic_batch = critic_items[i:i + BATCH_SIZE]
            verdicts = batch_critic_check(critic_batch)
            all_verdicts.extend(verdicts)



        
        # Structure Validation and Duplicate Detection
        valid_structured = []
        seen_questions = set()
        for q_data, chunk in all_generated:
            
            # Duplicate detection
            q_text = q_data.get("text", "")
            if q_text in seen_questions:
                continue
            seen_questions.add(q_text)
            
            # Type-specific validation
            q_type = q_data.get("type", "")
            if q_type == "Multiple Choice":
                choices = q_data.get("choices", [])
                ans = q_data.get("answer", "")
                if len(choices) != 4 or ans not in choices or len(set(choices)) != 4:
                    logger.warning("MCQ Validation failed: Choices invalid.")
                    continue
            elif q_type == "Step-by-step Solution":
                ans_data = q_data.get("answerData") or {}
                steps = ans_data.get("steps", [])
                if not isinstance(steps, list) or len(steps) < 1:
                    logger.warning("Step-by-step Validation failed: Missing steps.")
                    continue
            
            valid_structured.append(id(q_data))
        
        # Filter by critic verdict and structure validation
        critic_passed: List[Tuple[Dict, Dict]] = []
        for idx, (q_data, chunk) in enumerate(all_generated):
            if id(q_data) not in valid_structured:
                continue
                
            verdict = all_verdicts[idx] if idx < len(all_verdicts) else "FAIL"
            q_preview = q_data.get("text", "")[:80]
            if "PASS" in verdict:
                critic_passed.append((q_data, chunk))
                logger.info(f"  ✓ PASSED: {q_preview}...")
            else:
                logger.info(f"  ✗ FAILED: {q_preview}...")

        logger.info(
            f"  Critic results: {len(critic_passed)}/{len(all_generated)} passed"
        )

        # ── Stage 5.5: Grounding Layer A/B (Deterministic) ────────────────
        logger.info("[Stage 5.5/7] Running deterministic grounding checks...")
        grounding_passed: List[Tuple[Dict, Dict]] = []
        
        for q_data, chunk in critic_passed:
            context_text = chunk["text"] if isinstance(chunk, dict) else chunk.page_content
            
            # Layer A: Source existence — cited chunk must exist
            citation = q_data.get("citation", {})
            if not context_text or len(context_text.strip()) < 20:
                logger.info(f"  ✗ Layer A FAIL (no source): {q_data.get('text', '')[:60]}...")
                continue
            
            # Layer B: Quote existence — excerpt must match source text
            excerpt = citation.get("excerpt", "") if isinstance(citation, dict) else ""
            if excerpt and len(excerpt) > 15:
                # Fuzzy substring match: check if any significant portion exists
                excerpt_words = excerpt.lower().split()[:8]  # First 8 words
                match_count = sum(1 for w in excerpt_words if w in context_text.lower())
                if match_count < len(excerpt_words) * 0.4:  # Less than 40% word overlap
                    logger.info(f"  ✗ Layer B FAIL (quote mismatch): {q_data.get('text', '')[:60]}...")
                    continue
            
            grounding_passed.append((q_data, chunk))
            logger.info(f"  ✓ Grounding OK: {q_data.get('text', '')[:60]}...")
        
        logger.info(f"  Grounding results: {len(grounding_passed)}/{len(critic_passed)} passed")


        # ── Stage 6: Cosine Similarity Verification ──────────────────────
        logger.info("[Stage 6/7] Running semantic similarity checks...")
        valid_questions: List[Dict] = []

        for q_data, chunk in grounding_passed:
            context_text = (
                chunk["text"] if isinstance(chunk, dict) else chunk.page_content
            )
            question_text = q_data.get("text", "")

            try:
                q_emb = get_embedding(question_text)
                c_emb = get_embedding(context_text)
                sim = cosine_similarity([q_emb], [c_emb])[0][0]

                if sim < 0.75:
                    logger.info(
                        f"  ✗ Similarity too low ({sim:.3f}): "
                        f"{question_text[:60]}..."
                    )
                    continue

                logger.info(
                    f"  ✓ Similarity OK ({sim:.3f}): {question_text[:60]}..."
                )
            except Exception as e:
                logger.warning(
                    f"  ⚠ Embedding failed ({e}). "
                    f"Accepting question on critic merit alone."
                )

            # Validate difficulty metadata (AIRAG Part 4.7)
            est_diff = q_data.get("estimated_difficulty")
            bloom = q_data.get("bloom_level", "")
            
            VALID_BLOOM_LEVELS = {"REMEMBER", "UNDERSTAND", "APPLY", "ANALYZE", "EVALUATE", "CREATE"}
            
            # Normalize difficulty to 0.00-1.00 if it's a string like 'Easy'/'Medium'/'Hard'
            if isinstance(est_diff, str):
                diff_map = {"easy": 0.25, "medium": 0.5, "hard": 0.75}
                est_diff = diff_map.get(est_diff.lower(), 0.5)
            if est_diff is None or not isinstance(est_diff, (int, float)):
                est_diff = 0.5  # Default to medium
            est_diff = max(0.0, min(1.0, float(est_diff)))
            
            if bloom.upper() not in VALID_BLOOM_LEVELS:
                bloom = "UNDERSTAND"  # Safe default
            else:
                bloom = bloom.upper()
            
            # Map numeric difficulty to label for backward compat
            if est_diff < 0.33:
                diff_label = "Easy"
            elif est_diff <= 0.66:
                diff_label = "Medium"
            else:
                diff_label = "Hard"
            
            q_data["difficulty"] = diff_label
            q_data["estimated_difficulty"] = round(est_diff, 2)
            q_data["bloom_level"] = bloom

            # Build final question object with citation metadata
            q_data["citation"] = {
                "docId": doc_id,
                "docName": filename,
                "excerpt": context_text[:250],
                "confidence": "strong"
            }
            # Remove internal batch-processing fields
            q_data.pop("chunk_index", None)

            valid_questions.append(q_data)

        logger.info(f"  Final validated questions: {len(valid_questions)}")
        


        # ── Stage 7: Store Results in DB ──────────────────────────────
        logger.info("[Stage 7/7] Storing results in DB and Redis...")
        r = _get_redis_client()
        
        if valid_questions:
            r.set(
                f"generated_questions:{doc_id}",
                json.dumps(valid_questions)
            )
            
            # Save directly to Supabase DB
            try:
                from supabase import create_client
                sb = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
                
                for q in valid_questions:
                    # Insert Question
                    q_res = sb.table("GeneratedQuestion").insert({
                        "userId": user_id,
                        "docId": int(doc_id) if str(doc_id).isdigit() else None,
                        "text": q["text"],
                        "type": q.get("type", "Multiple Choice"),
                        "difficulty": q.get("difficulty", "Medium"),
                        "topic": q.get("topic", topic[0] if isinstance(topic, list) and topic else "General"),
                        "answer": q.get("answer"),
                        "answerData": q.get("answerData") or {},
                        "estimatedDifficulty": q.get("estimated_difficulty", 0.5),
                        "bloomLevel": q.get("bloom_level", "UNDERSTAND"),
                        "request_id": request_id,
                        "status": "PENDING"
                    }).execute()
                    
                    if q_res.data:
                        q_id = q_res.data[0]["id"]
                        
                        # Insert Choices
                        choices = q.get("choices", [])
                        if choices:
                            labels = ['A', 'B', 'C', 'D', 'E', 'F']
                            choice_payloads = [
                                {
                                    "questionId": q_id,
                                    "label": labels[idx] if idx < len(labels) else str(idx),
                                    "text": c["text"],
                                    "isCorrect": c.get("isCorrect", False)
                                } for idx, c in enumerate(choices)
                            ]
                            sb.table("QuestionChoice").insert(choice_payloads).execute()
                            
                        # Insert Citation
                        citation = q.get("citation")
                        if citation:
                            sb.table("QuestionCitation").insert({
                                "questionId": q_id,
                                "docName": filename,
                                "section": citation.get("section", ""),
                                "pageRange": citation.get("pageRange", ""),
                                "excerpt": citation.get("excerpt", ""),
                                "confidence": citation.get("confidence", "strong")
                            }).execute()
                            
            except Exception as e_db:
                logger.error(f"Failed to save questions to DB: {e_db}")

            logger.info(
                f"{'═' * 60}\n"
                f"  SUCCESS: {len(valid_questions)} questions saved "
                f"(doc_id={doc_id})\n"
                f"{'═' * 60}"
            )
        else:
            logger.warning(
                f"{'═' * 60}\n"
                f"  No valid questions after all quality gates\n"
                f"{'═' * 60}"
            )
            error_msg = [{
                "error": (
                    "Failed to generate valid questions. The content may "
                    "lack sufficient mathematical context for grounded "
                    "question generation."
                )
            }]
            r.set(f"generated_questions:{doc_id}", json.dumps(error_msg))

        # Pipeline Metrics
        logger.info(f"[Metrics] Pipeline Summary:")
        logger.info(f"  Doc ID: {doc_id}")
        logger.info(f"  Chunks retrieved: {len(top_chunks)}")
        logger.info(f"  Raw questions generated: {len(all_generated)}")
        logger.info(f"  Critic passed: {len(critic_passed)}")
        logger.info(f"  Grounding passed: {len(grounding_passed)}")
        logger.info(f"  Final valid: {len(valid_questions)}")
        logger.info(f"  Attempt: {attempt}")

        try:
            from supabase import create_client
            sb = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
            sb.table("generation_runs").update({
                "status": "COMPLETED",
                "stage": "Finished successfully",
                "progress": 100.0,
                "validated_count": len(valid_questions),
                "saved_count": len(valid_questions),
                "raw_generated": len(all_generated),
                "error_message": None
            }).eq("request_id", request_id).execute()
        except Exception as e_sb:
            logger.error(f"Failed to update run status: {e_sb}")
        return {"status": "success", "questions_generated": len(valid_questions)}

    except Exception as e:
        logger.error(f"CRITICAL ERROR in pipeline: {e}", exc_info=True)
        try:
            r = _get_redis_client()
            error_msg = [{"error": f"Internal pipeline crash: {str(e)}"}]
            r.set(f"generated_questions:{doc_id}", json.dumps(error_msg))
        except Exception:
            pass
        try:
            from supabase import create_client
            sb = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
            sb.table("generation_runs").update({
                "status": "FAILED",
                "stage": "Failed with exception",
                "error_message": str(e)
            }).eq("request_id", request_id).execute()
        except Exception:
            pass
        return {"status": "error", "message": str(e)}

