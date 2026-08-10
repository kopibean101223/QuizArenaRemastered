import os
import io
import json
import random
import re
import ast
import socketio
import uvicorn
from dotenv import load_dotenv

# 1. Load environment variables (Automatically enables LangChain tracing)
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
    try:
        print("Attempting to initialize Google Gemini embedding model...")
        return GoogleGenerativeAIEmbeddings(
            model="text-embedding-004", 
            google_api_key=os.getenv("GEMINI_API_KEY")
        )
    except Exception as gemini_err:
        print(f"Gemini embedding failed ({gemini_err}). Falling back to OpenAI embeddings...")
        try:
            return OpenAIEmbeddings(
                model="text-embedding-3-small", 
                api_key=os.getenv("OPENAI_API_KEY")
            )
        except Exception as openai_err:
            raise RuntimeError(f"Both Gemini and OpenAI embedding models failed to initialize: {openai_err}")

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

@fastapi_app.post("/ingest")
async def ingest_file(file: UploadFile = File(...), docId: str = Form(...)):
    """Extracts text, splits with LangChain, and stores vectors/chunks for retrieval."""
    try:
        contents = await file.read()
        pdf_reader = PdfReader(io.BytesIO(contents))
        
        full_text = ""
        extracted_chunks = []
        for page_num, page in enumerate(pdf_reader.pages, start=1):
            text = page.extract_text() or ""
            full_text += f"\n--- Page {page_num} ---\n" + text
            
            paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
            for para_num, para_text in enumerate(paragraphs, start=1):
                if len(para_text) > 20:
                    extracted_chunks.append({
                        "page": page_num,
                        "paragraph": para_num,
                        "text": para_text
                    })

        LOCAL_CHUNKS_BACKEND_STORE[str(docId)] = {
            "filename": file.filename,
            "chunks": extracted_chunks
        }

        # LangChain Smart Text Splitter
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            add_start_index=True
        )
        raw_chunks = text_splitter.split_text(full_text)

        texts_to_embed = []
        metadatas = []
        for idx, chunk in enumerate(raw_chunks):
            texts_to_embed.append(chunk)
            metadatas.append({
                "docId": str(docId),
                "filename": file.filename,
                "chunkIndex": idx
            })

        if supabase_client:
            try:
                SupabaseVectorStore.from_texts(
                    texts=texts_to_embed,
                    embedding=embeddings,
                    metadatas=metadatas,
                    client=supabase_client,
                    table_name="documents",
                    query_name="match_documents"
                )
            except Exception as sb_err:
                print(f"Supabase vector insert warning (using local fallback memory): {sb_err}")

        return {
            "status": "success", 
            "docId": docId, 
            "filename": file.filename,
            "pages": len(pdf_reader.pages),
            "chunksInserted": len(raw_chunks)
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
    """Generates questions using pgvector, Next.js payload chunks, or local backup memory."""
    doc_key = str(req.document_id)
    relevant_docs = []

    if supabase_client:
        try:
            vector_store = SupabaseVectorStore(
                client=supabase_client,
                embedding=embeddings,
                table_name="documents",
                query_name="match_documents"
            )
            search_query = f"{req.category} {req.difficulty} level concepts"
            filter_clause = {"docId": doc_key} if doc_key != "all" else {}

            relevant_docs = vector_store.similarity_search(
                query=search_query,
                k=req.count,
                filter=filter_clause
            )
        except Exception as v_err:
            print(f"Vector search warning: {v_err}")

    if not relevant_docs and req.chunks and len(req.chunks) > 0:
        class DummyDoc:
            def __init__(self, text, meta):
                self.page_content = text
                self.metadata = meta
        
        relevant_docs = [
            DummyDoc(
                c.get('text', str(c)), 
                {"filename": req.filename or "Syllabus.pdf", "chunkIndex": idx, "page": c.get('page', 1)}
            ) for idx, c in enumerate(req.chunks)
        ]

    if not relevant_docs and doc_key in LOCAL_CHUNKS_BACKEND_STORE:
        stored_doc = LOCAL_CHUNKS_BACKEND_STORE[doc_key]
        class DummyDoc:
            def __init__(self, text, meta):
                self.page_content = text
                self.metadata = meta
        relevant_docs = [
            DummyDoc(c['text'], {"filename": stored_doc["filename"], "chunkIndex": idx, "page": c.get('page', 1)}) 
            for idx, c in enumerate(stored_doc["chunks"])
        ]

    if not relevant_docs:
        raise HTTPException(
            status_code=400, 
            detail="No uploaded PDF vectors or chunks found. Please re-upload your PDF."
        )

    selected_types = req.types if req.types else ["Multiple Choice"]
    context_items = []
    
    sampled_docs = random.choices(relevant_docs, k=min(req.count, len(relevant_docs)))
    
    for idx, doc in enumerate(sampled_docs):
        q_type = selected_types[idx % len(selected_types)]
        excerpt = doc.page_content[:300].replace('\n', ' ')
        context_items.append(
            f"Item {idx+1} [Target Type: '{q_type}']: \"{excerpt}\""
        )

    full_context = "\n".join(context_items)
    filename = req.filename or "Syllabus.pdf"

    prompt = f"""
Create exactly {req.count} test questions based on these excerpts from "{filename}":

CONTEXT EXCERPTS:
{full_context}

Difficulty Level: {req.difficulty}
Target Category: {req.category}

CRITICAL QUESTION TYPE VALIDATION RULE:
If any of the target question types include "Coding" or "Mathematics", you MUST verify that the context excerpts contain relevant code snippets, programming structures, or mathematical formulas/numbers. 
If they DO NOT contain these concepts, you MUST abort and return EXACTLY this JSON object:
{{
  "error": "Selected question type requires coding or mathematics concepts, but none were detected in the uploaded document."
}}

Otherwise, return ONLY a raw JSON object containing the questions array, without markdown wrappers, matching this exact structure:
{{
  "questions": [
    {{
      "text": "Question text derived from concept",
      "type": "Target Type",
      "difficulty": "{req.difficulty}",
      "topic": "Topic keyword",
      "answer": "Correct answer text/explanation",
      "choices": []
    }}
  ]
}}

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
4. For "Multiple Choice", "Coding", or "Mathematics":
   - "choices" MUST be an array of exactly 4 objects (A, B, C, D) with one correct choice.
5. GENERAL RULE:
   - NEVER include phrases like "According to page X", "Based on excerpt Y", or "In page Z".
"""

    raw_text = None
    
    # --- GROQ FALLBACK CHAIN (2 Groq Models) ---
    groq_models = ["llama-3.1-8b-instant", "llama-3.3-70b-versatile"]

    for model_name in groq_models:
        try:
            response = groq_client.chat.completions.create(
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                response_format={"type": "json_object"}
            )
            raw_text = response.choices[0].message.content.strip()
            if raw_text:
                break
        except Exception as groq_err:
            print(f"Groq ({model_name}) failed: {groq_err}")

    # --- GEMINI LLM FINAL FALLBACK ---
    if not raw_text and gemini_client:
        try:
            print("All Groq models failed. Falling back to Gemini LLM...")
            response = gemini_client.models.generate_content(
                model="gemini-2.5-pro",
                contents=prompt
            )
            raw_text = response.text.strip()
        except Exception as gemini_err:
            print(f"Gemini fallback failed: {gemini_err}")

    if not raw_text:
        raise HTTPException(status_code=500, detail="All AI generation models failed.")

    parsed = clean_and_parse_json(raw_text)
    if isinstance(parsed, dict) and "error" in parsed:
        raise HTTPException(status_code=400, detail=parsed["error"])

    questions_data = parsed if isinstance(parsed, list) else parsed.get("questions", [])

    for idx, q in enumerate(questions_data):
        doc = sampled_docs[idx % len(sampled_docs)]
        meta = doc.metadata if hasattr(doc, 'metadata') else {}
        q["citation"] = {
            "docId": req.document_id,
            "docName": filename,
            "topic": q.get("topic", req.category),
            "confidence": "strong",
            "excerpt": doc.page_content[:250] + "..." if len(doc.page_content) > 250 else doc.page_content
        }

    return questions_data

app = socketio.ASGIApp(sio, other_asgi_app=fastapi_app)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)