import os
import io
import json
import random
import re
import ast
import socketio
import uvicorn
from dotenv import load_dotenv

# 1. Load environment variables first
load_dotenv()

# 2. Safely import config variables
try:
    from app.config import REDIS_HOST, REDIS_PORT, FRONTEND_ORIGIN
except ImportError:
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

if not FRONTEND_ORIGIN:
    FRONTEND_ORIGIN = "http://localhost:3000"

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
from pypdf import PdfReader
from openai import OpenAI

from app.realtime.events import register_game_events

# Initialize Google GenAI Client if available
try:
    from google import genai
    gemini_key = os.getenv("GEMINI_API_KEY")
    gemini_client = genai.Client(api_key=gemini_key) if gemini_key else None
except ImportError:
    gemini_client = None

# Primary Provider: Groq Cloud
groq_key = os.getenv("GROQ_API_KEY")
groq_client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=groq_key or "gsk_dummy"
)

DOC_STORE = {}

# 3. Initialize FastAPI App
fastapi_app = FastAPI(title="QuizArena AI Engine")

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Initialize Socket.IO Server
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=[FRONTEND_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"],
    client_manager=socketio.AsyncRedisManager(f"redis://{REDIS_HOST}:{REDIS_PORT}"),
)

register_game_events(sio)

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

# Helper: Robust JSON Sanitizer
def clean_and_parse_json(raw_str: str):
    """Cleans AI markdown output, trailing commas, and parses messy JSON."""
    if not raw_str:
        raise ValueError("Empty string provided")

    # 1. Strip markdown wrappers
    cleaned = re.sub(r"^```(?:json)?", "", raw_str.strip(), flags=re.MULTILINE)
    cleaned = re.sub(r"```$", "", cleaned.strip(), flags=re.MULTILINE).strip()

    # 2. Extract valid JSON array or object structure
    match = re.search(r"(\[.*\]|\{.*\})", cleaned, re.DOTALL)
    if match:
        cleaned = match.group(1)

    # 3. Strip trailing commas before brackets/braces
    cleaned = re.sub(r",\s*([\]}])", r"\1", cleaned)

    # 4. Attempt standard JSON parse
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    # 5. AST Evaluation fallback (for single quotes or python-style dict strings)
    try:
        ast_str = cleaned.replace("true", "True").replace("false", "False").replace("null", "None")
        return ast.literal_eval(ast_str)
    except Exception as e:
        raise ValueError(f"Failed to parse JSON string: {e}")

# 5. HTTP Endpoints

@fastapi_app.post("/ingest")
async def ingest_file(file: UploadFile = File(...), docId: str = Form(...)):
    """Extracts text and metadata from uploaded PDF and returns chunks for Supabase persistence."""
    try:
        contents = await file.read()
        pdf_reader = PdfReader(io.BytesIO(contents))
        
        extracted_chunks = []
        for page_num, page in enumerate(pdf_reader.pages, start=1):
            text = page.extract_text() or ""
            paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
            
            for para_num, para_text in enumerate(paragraphs, start=1):
                if len(para_text) > 30:
                    extracted_chunks.append({
                        "page": page_num,
                        "paragraph": para_num,
                        "text": para_text
                    })

        DOC_STORE[str(docId)] = {
            "filename": file.filename,
            "chunks": extracted_chunks
        }

        return {
            "status": "success", 
            "docId": docId, 
            "filename": file.filename,
            "pages": len(pdf_reader.pages),
            "chunks": extracted_chunks
        }
    except Exception as e:
        print(f"Ingestion error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


class GenerateRequest(BaseModel):
    count: int = 5
    difficulty: str = "Medium"
    types: List[str] = ["Multiple Choice"]
    document_id: Optional[Any] = "all"
    chunks: Optional[List[dict]] = None
    filename: Optional[str] = None
    category: str = "General"


@fastapi_app.post("/generate")
async def generate_questions(req: GenerateRequest):
    """Generates questions using multi-model fallback (Groq -> Gemini -> Local)."""
    doc_key = str(req.document_id)
    
    active_doc = DOC_STORE.get(doc_key)
    if not active_doc and len(DOC_STORE) > 0:
        active_doc = list(DOC_STORE.values())[-1]

    if active_doc:
        chunks = active_doc["chunks"]
        filename = active_doc["filename"]
    elif req.chunks and len(req.chunks) > 0:
        chunks = req.chunks
        filename = req.filename or "Syllabus.pdf"
    else:
        raise HTTPException(
            status_code=400, 
            detail="No uploaded PDF found in memory or request payload. Please re-upload your PDF."
        )

    if not chunks:
        raise HTTPException(status_code=400, detail="The uploaded PDF contains no extractable text.")

    selected_chunks = random.choices(chunks, k=req.count)
    selected_types = req.types if req.types else ["Multiple Choice"]

    context_items = []
    for idx, chunk in enumerate(selected_chunks):
        q_type = selected_types[idx % len(selected_types)]
        short_excerpt = chunk['text'][:250].replace('\n', ' ')
        context_items.append(
            f"Item {idx+1} [Target Type: '{q_type}', Page {chunk['page']}]: \"{short_excerpt}\""
        )

    full_context = "\n".join(context_items)

    prompt = f"""
Create exactly {req.count} test questions based on these excerpts from "{filename}":

CONTEXT EXCERPTS:
{full_context}

Difficulty Level: {req.difficulty}
Target Category: {req.category}

CRITICAL CATEGORY RULE:
If the Target Category is "Coding" or "Mathematics", you MUST verify that the context excerpts contain relevant programming/coding or mathematical concepts. 
If they DO NOT contain these concepts, you MUST ABORT question generation and return EXACTLY this JSON object:
{{
  "error": "No {req.category.lower()} concepts detected in the uploaded document. Please upload a relevant syllabus."
}}

Otherwise, if valid, return ONLY a raw JSON array matching this format without markdown wrappers:
[
  {{
    "text": "Question text derived from concept",
    "type": "Target Type",
    "difficulty": "{req.difficulty}",
    "topic": "Topic keyword",
    "answer": "Correct answer text/explanation",
    "choices": []
  }}
]

STRICT TYPE FORMATTING RULES:
1. For "Identification":
   - The question MUST ask for a specific term, concept, or name.
   - "choices" MUST BE AN EMPTY ARRAY: []
   - "answer" MUST BE the exact word or short phrase.
2. For "Short Answer":
   - "choices" MUST BE AN EMPTY ARRAY: []
   - "answer" MUST BE a concise explanation.
3. For "True / False":
   - The question "text" MUST be a statement evaluating to True or False.
   - "answer" MUST BE EXACTLY "True" or "False".
   - "choices" MUST contain exactly two options:
     [
       {{"label": "A", "text": "True", "isCorrect": true}},
       {{"label": "B", "text": "False", "isCorrect": false}}
     ]
4. For "Multiple Choice":
   - "choices" MUST be an array of exactly 4 objects (A, B, C, D).
5. GENERAL RULE:
   - NEVER include phrases like "According to page X", "Based on excerpt Y", or "In page Z".
"""

    raw_text = None
    groq_models = ["llama-3.1-8b-instant", "llama-3.3-70b-versatile"]

    # --- 1. TRY GROQ MODELS ---
    for model_name in groq_models:
        try:
            print(f"Attempting generation via Groq ({model_name})...")
            response = groq_client.chat.completions.create(
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3
            )
            raw_text = response.choices[0].message.content.strip()
            if raw_text:
                break
        except Exception as groq_err:
            print(f"Groq ({model_name}) failed: {groq_err}. Trying next fallback...")

    # --- 2. TRY GEMINI API IF GROQ FAILED ---
    if not raw_text and gemini_client:
        gemini_models = ["gemini-2.5-flash", "gemini-1.5-flash"]
        for g_model in gemini_models:
            try:
                print(f"Attempting fallback generation via Gemini ({g_model})...")
                response = gemini_client.models.generate_content(
                    model=g_model,
                    contents=prompt
                )
                raw_text = response.text.strip()
                if raw_text:
                    break
            except Exception as gemini_err:
                print(f"Gemini ({g_model}) failed: {gemini_err}")

    # --- PARSE RESPONSE WITH FALLBACK ---
    # --- PARSE RESPONSE WITH FALLBACK ---
    questions_data = None
    if raw_text:
        try:
            parsed = clean_and_parse_json(raw_text)
            
            # Catch the AI-generated error if no math/coding is found
            if isinstance(parsed, dict) and "error" in parsed:
                raise HTTPException(status_code=400, detail=parsed["error"])
                
            questions_data = parsed if isinstance(parsed, list) else parsed.get("questions", parsed.get("items", []))
            
        except HTTPException:
            raise  # Let FastAPI pass the 400 error back to Next.js immediately
        except Exception as parse_err:
            print(f"JSON Parsing Error: {parse_err}. Falling back to deterministic generator...")
    # --- 3. TERTIARY LOCAL CODE FALLBACK ---
    if not questions_data:
        print("Executing local fallback...")
        questions_data = []
        for idx in range(req.count):
            chunk = selected_chunks[idx % len(selected_chunks)]
            q_type = selected_types[idx % len(selected_types)]
            
            # Deterministic choices based on type
            if q_type == "True / False":
                fallback_choices = [
                    {"label": "A", "text": "True", "isCorrect": True},
                    {"label": "B", "text": "False", "isCorrect": False}
                ]
            elif q_type == "Multiple Choice":
                fallback_choices = [
                    {"label": "A", "text": chunk['text'][:90], "isCorrect": True},
                    {"label": "B", "text": "Details not covered in this section.", "isCorrect": False},
                    {"label": "C", "text": "Unrelated standard procedures.", "isCorrect": False},
                    {"label": "D", "text": "None of the above.", "isCorrect": False}
                ]
            else:
                fallback_choices = []

            questions_data.append({
                "text": f"What key principle is emphasized regarding: '{chunk['text'][:60].strip()}...'?",
                "type": q_type,
                "difficulty": req.difficulty,
                "topic": "Syllabus Content",
                "answer": "True" if q_type == "True / False" else chunk['text'][:120],
                "choices": fallback_choices,
            })

    # Post-processing enforcement: Ensure rigid adherence to choice rules
    for q in questions_data:
        q_type = q.get("type", "")
        
        # Identification and Short Answer MUST NOT have choices
        if q_type in ["Identification", "Short Answer"]:
            q["choices"] = []
            
        # True / False MUST have choices (Safeguard in case AI hallucinated)
        elif q_type == "True / False":
            if not q.get("choices") or len(q.get("choices")) != 2:
                is_true = str(q.get("answer", "")).strip().lower() == "true"
                q["choices"] = [
                    {"label": "A", "text": "True", "isCorrect": is_true},
                    {"label": "B", "text": "False", "isCorrect": not is_true}
                ]

    # Attach citation metadata
    for idx, q in enumerate(questions_data):
        chunk = selected_chunks[idx % len(selected_chunks)]
        q["citation"] = {
            "docId": req.document_id if req.document_id != "all" else 1,
            "docName": filename,
            "topic": q.get("topic", "General"),
            "section": f"Page {chunk['page']}",
            "pageRange": f"Page {chunk['page']}",
            "paragraph": f"Paragraph {chunk['paragraph']}",
            "confidence": "strong",
            "excerpt": chunk['text'][:250] + "..." if len(chunk['text']) > 250 else chunk['text']
        }

    return questions_data

app = socketio.ASGIApp(sio, other_asgi_app=fastapi_app)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)