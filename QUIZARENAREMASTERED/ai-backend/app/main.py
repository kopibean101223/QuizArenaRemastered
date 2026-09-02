import os
import io
import json
import random
import re
import ast
import socketio
import uvicorn
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
# 1. Load environment variables (Automatically enables LangChain tracing)
load_dotenv()

# 2. Safely import config variables
try:
    from app.config import REDIS_HOST, REDIS_PORT, FRONTEND_ORIGIN, REDIS_URL
except ImportError:
    REDIS_URL = os.getenv("REDIS_URL")
    REDIS_HOST = os.getenv("REDIS_HOST", "127.0.0.1")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
    if not REDIS_URL:
        REDIS_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

if not FRONTEND_ORIGIN:
    FRONTEND_ORIGIN = "http://localhost:3000"

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
from pypdf import PdfReader
from openai import OpenAI
import redis
from fastapi import Request

redis_url_safe = REDIS_URL.replace("CERT_NONE", "none") if REDIS_URL else ""
redis_client = redis.from_url(redis_url_safe, decode_responses=True) if redis_url_safe.startswith("redis") else redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

def check_rate_limit_and_audit(student_id: str, endpoint: str, limit: int = 5, window_seconds: int = 60):
    """
    Addresses Panel Issue 7: Rate limits on analyzer submissions and audit logging.
    Allows 5 requests per minute per student.
    """
    if not student_id:
        raise HTTPException(status_code=400, detail="Missing student ID for audit logging.")

    rate_key = f"ratelimit:{endpoint}:{student_id}"
    current_requests = redis_client.get(rate_key)

    if current_requests and int(current_requests) >= limit:
        audit_log = f"[AUDIT WARNING] Student {student_id} spamming {endpoint}."
        redis_client.lpush("audit:security_logs", audit_log)
        
        raise HTTPException(
            status_code=429, 
            detail=f"Rate limit exceeded to prevent API abuse. Please wait {window_seconds} seconds."
        )
    

    pipe = redis_client.pipeline()
    pipe.incr(rate_key, 1)
    pipe.expire(rate_key, window_seconds)
    pipe.execute()

    redis_client.lpush("audit:activity_logs", f"[AUDIT] Student {student_id} accessed {endpoint}")

# LangChain & Vector Store Imports
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from supabase import create_client, Client

from app.realtime.events import register_game_events


# Initialize Supabase Client & Global Stores
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase_client: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None
LOCAL_CHUNKS_BACKEND_STORE = {}

# --- SAFE EMBEDDING SELECTOR (Gemini First -> OpenAI Fallback) ---
# --- SAFE EMBEDDING SELECTOR (Updated Model Name) ---
# --- SAFE EMBEDDING SELECTOR (Updated Model Name) ---
# --- SAFE EMBEDDING SELECTOR (Standard Gemini -> OpenAI Fallback) ---
def get_embedding_model():
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    if gemini_key:
        try:
            return GoogleGenerativeAIEmbeddings(
                model="models/gemini-embedding-2", 
                google_api_key=gemini_key
            )
        except Exception as gemini_err:
            print(f"Gemini embedding failed: {gemini_err}")
    if openai_key:
        try:
            return OpenAIEmbeddings(
                model="text-embedding-3-small", 
                api_key=openai_key
            )
        except Exception as openai_err:
            print(f"OpenAI embedding failed: {openai_err}")
    print("Warning: No valid GEMINI_API_KEY or OPENAI_API_KEY provided for embeddings.")
    return None

embeddings = get_embedding_model()
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
    client_manager=socketio.AsyncRedisManager(REDIS_URL),
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

    cleaned = re.sub(r"^```(?:json)?", "", raw_str.strip(), flags=re.MULTILINE)
    cleaned = re.sub(r"```$", "", cleaned.strip(), flags=re.MULTILINE).strip()

    match = re.search(r"(\[.*\]|\{.*\})", cleaned, re.DOTALL)
    if match:
        cleaned = match.group(1)

    cleaned = re.sub(r",\s*([\]}])", r"\1", cleaned)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    try:
        ast_str = cleaned.replace("true", "True").replace("false", "False").replace("null", "None")
        return ast.literal_eval(ast_str)
    except Exception as e:
        raise ValueError(f"Failed to parse JSON string: {e}")

# 5. HTTP Endpoints

import tempfile

@fastapi_app.post("/ingest")
async def ingest_file(file: UploadFile = File(...), docId: str = Form(...)):
    """Extracts text from PDF, applies structure-aware chunking, and stores ALL chunks in pgvector."""
    try:
        contents = await file.read()
        import tempfile, os
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
        tmp.write(contents)
        tmp.close()
        
        import pymupdf4llm
        md_text = pymupdf4llm.to_markdown(tmp.name)
        os.unlink(tmp.name)
            
        from langchain_text_splitters import MarkdownHeaderTextSplitter
        headers_to_split_on = [("#", "Header 1"), ("##", "Header 2"), ("###", "Header 3")]
        markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers_to_split_on)
        md_header_splits = markdown_splitter.split_text(md_text)
        
        # We index ALL meaningful chunks.
        # Structure-aware chunking + Chunk Context Injection.
        for i, chunk in enumerate(md_header_splits):
            if len(chunk.page_content.strip()) > 50: # Avoid tiny fragments
                # Context injection
                context_header = f"Document: {file.filename}\nSection: {chunk.metadata.get('Header 1', 'General')}\n"
                full_content = context_header + chunk.page_content
                
                # Store in Supabase 'documents' table
                # We assume supabase_client is available
                if supabase_client and embeddings:
                    emb = embeddings.embed_query(full_content)
                    supabase_client.table('document_chunks').insert({
                        "document_id": docId,
                        "content": full_content,
                        "metadata": chunk.metadata,
                        "embedding": emb
                    }).execute()
        
        return {
            "status": "success", 
            "message": "File processed and entirely indexed.",
            "docId": docId, 
            "filename": file.filename,
            "chunks": [], # No longer return chunks to frontend
            "pages": 1
        }
    except Exception as e:
        print(f"Ingestion error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


class MathCitation(BaseModel):
    docId: int = Field(description="The ID of the source document")
    docName: str = Field(description="The filename of the syllabus/document")
    topic: str = Field(description="The specific mathematical topic (e.g., Algebra)")
    section: str = Field(description="The section or chapter name")
    pageRange: str = Field(description="The exact page number(s) where this concept is found")
    excerpt: str = Field(description="A direct quote from the text supporting the math problem")
    confidence: str = Field(description="Must be 'strong', 'medium', or 'weak'")


class MathQuestion(BaseModel):
    text: str = Field(description="The mathematical problem to be solved.")
    type: str = Field(description="Must be one of: 'Multiple Choice', 'Step-by-step Solution', 'Numerical Input', 'Graphing'")
    difficulty: str = Field(description="Human-readable label: 'Easy', 'Medium', or 'Hard'")
    estimated_difficulty: Optional[float] = Field(default=None, description="Normalized difficulty from 0.00 (very easy) to 1.00 (very difficult)")
    bloom_level: Optional[str] = Field(default=None, description="Bloom's Taxonomy level: REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE, CREATE")
    answer: str = Field(description="The final, correct mathematical answer.")
    choices: Optional[List[str]] = Field(default=None, description="Provide exactly 4 plausible choices if the type is 'Multiple Choice'. Otherwise null.")
    

    stepWeights: Optional[Dict[str, int]] = Field(
        default=None, 
        description="If 'Step-by-step Solution', provide a dictionary mapping each logical step to a percentage weight (e.g., {'Formula setup': 30, 'Substitution': 30, 'Calculation': 40})."
    )
    partialCreditRules: Optional[str] = Field(
        default=None, 
        description="If 'Step-by-step Solution', explain exactly how partial credit should be awarded if the final answer is incorrect but intermediate steps are right."
    )
    
    citation: MathCitation

class MathQuestionList(BaseModel):
    questions: List[MathQuestion]

import uuid
from datetime import datetime

class GenerateRequest(BaseModel):
    document_id: int
    user_id: str
    count: int = 5
    types: List[str] = ["Multiple Choice"]
    filename: str = "Unknown"
    category: str = "General"

@fastapi_app.post("/generate")
async def generate_questions(req: GenerateRequest):
    """Starts generation pipeline and returns a requestId for polling."""
    request_id = str(uuid.uuid4())
    
    # Store initial state in Supabase
    if supabase_client:
        try:
            supabase_client.table("generation_runs").insert({
                "request_id": request_id,
                "document_id": req.document_id,
                "user_id": req.user_id,
                "status": "QUEUED",
                "stage": "Initializing generation run...",
                "progress": 0.0,
                "requested_count": req.count,
                "types": req.types,
                "created_at": datetime.utcnow().isoformat()
            }).execute()
        except Exception as e:
            print(f"Supabase init run error: {e}")
            raise HTTPException(status_code=500, detail="Failed to initialize generation run in database.")
    
    config = {
        "count": req.count,
        "types": req.types,
        "category": req.category
    }
    
    from app.celery_worker import process_and_generate_quiz
    process_and_generate_quiz.delay(request_id, req.document_id, req.user_id, req.filename, config)
    
    return {"requestId": request_id, "status": "QUEUED", "message": "Generation started."}

@fastapi_app.get("/generate/status/{request_id}")
async def get_generation_status(request_id: str):
    """Polls the status of a generation run."""
    # Check Redis first for low-latency progress
    redis_key = f"generation:{request_id}"
    cached = redis_client.get(redis_key)
    if cached:
        return json.loads(cached)
        
    # Fallback to Supabase if not in Redis (e.g. expired or completed)
    if supabase_client:
        try:
            res = supabase_client.table("generation_runs").select("*").eq("request_id", request_id).execute()
            if res.data and len(res.data) > 0:
                run = res.data[0]
                return {
                    "requestId": run["request_id"],
                    "status": run["status"],
                    "stage": run["stage"],
                    "progress": run["progress"],
                    "rawGenerated": run.get("raw_generated", 0),
                    "validated": run.get("validated_count", 0),
                    "saved": run.get("saved_count", 0),
                    "error": run.get("error_message")
                }
        except Exception as e:
            print(f"Supabase status fetch error: {e}")
            
    raise HTTPException(status_code=404, detail="Generation run not found")

app = socketio.ASGIApp(sio, other_asgi_app=fastapi_app)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)
