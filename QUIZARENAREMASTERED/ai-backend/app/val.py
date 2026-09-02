import os
import sys
import json
import time
import datetime
import pandas as pd
from fpdf import FPDF
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall,
)
from ragas.run_config import RunConfig
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

# We need to simulate the backend RAG pipeline. Let's import what we need.
# Assuming we can just hit the local DB or call functions.
# The user's backend might be partially broken, but we will write our own logic here
# that adheres to the RAG pipeline to test it, or we import from celery_worker.

def generate_pdf(filepath="test_rag.pdf"):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    content = [
        "Antigravity AI is a revolutionary framework for multi-agent systems.",
        "It was released in 2024 and introduces the concept of hyper-threaded agents.",
        "The core communication protocol uses asynchronous message passing over Redis.",
        "Security is handled by a layered token bucket rate limiter and cryptographic signatures.",
        "The primary database for Antigravity is Supabase pgvector.",
        "By default, Antigravity generates structured output using Pydantic schemas."
    ]
    
    for line in content:
        pdf.cell(200, 10, txt=line, ln=True, align="L")
        
    pdf.output(filepath)
    print(f"Generated PDF at {filepath}")
    return filepath

def ingest_pdf_to_db(filepath):
    print(f"Ingesting {filepath}...")
    # In a real scenario, we'd use the actual ingest route
    # Let's try to use TestClient
    from fastapi.testclient import TestClient
    from app.main import fastapi_app
    
    client = TestClient(fastapi_app)
    doc_id = f"test_doc_{int(time.time())}"
    
    with open(filepath, "rb") as f:
        response = client.post("/ingest", files={"file": (filepath, f, "application/pdf")}, data={"docId": doc_id})
    
    if response.status_code != 200:
        print(f"Ingestion failed: {response.text}")
        return None
    
    print(f"Ingestion successful for doc_id: {doc_id}")
    return doc_id

def mock_retrieval(question: str):
    # If the real retrieval is broken, we fall back to something basic, but let's assume it works.
    # The requirement is "actual QuizArena retrieval". Let's import vectorstore or chains.
    return []

def run_real_evaluation():
    # 1. Generate PDF
    pdf_path = "test_rag.pdf"
    generate_pdf(pdf_path)
    
    # 2. Ingest
    doc_id = ingest_pdf_to_db(pdf_path)
    
    if not doc_id:
        print("Skipping evaluation due to ingestion failure.")
        return
        
    # 3. Define Benchmark (for our custom PDF)
    eval_data = {
        "question": [
            "What year was Antigravity AI released?",
            "What is the primary database used by Antigravity?",
            "How does the core communication protocol work?",
            "What is the name of the CEO of Antigravity AI?", # Unanswerable
            "How does Antigravity integrate with the Apple Vision Pro?" # Unanswerable
        ],
        "ground_truth": [
            "2024",
            "Supabase pgvector",
            "Asynchronous message passing over Redis",
            "Insufficient Context",
            "Insufficient Context"
        ],
        "is_answerable": [True, True, True, False, False]
    }
    
    from app.main import supabase_client, get_embedding_model
    embeddings = get_embedding_model()
    
    answers = []
    contexts = []
    retrieval_recalls = []
    retrieval_mrrs = []
    
    gemini_key = os.getenv("GEMINI_API_KEY")
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=gemini_key)
    
    for idx, q in enumerate(eval_data["question"]):
        print(f"Querying: {q}")
        
        vec = embeddings.embed_query(q)
        try:
            res = supabase_client.rpc(
                "match_document_chunks_v2",
                {"query_embedding": vec, "match_count": 5, "filter_doc_id": doc_id}
            ).execute()
            docs = res.data
        except Exception as e:
            print(f"Error querying supabase: {e}")
            docs = []
            
        retrieved_texts = [d.get("content", "") for d in docs] if docs else ["No context found."]
        
        # Calculate Mock MRR and Recall
        # In a real system, we'd check if the retrieved chunk contains the ground truth
        is_ans = eval_data["is_answerable"][idx]
        gt = eval_data["ground_truth"][idx]
        
        chunk_hits = [i for i, text in enumerate(retrieved_texts) if gt.lower() in text.lower()]
        
        if is_ans:
            recall = 1.0 if len(chunk_hits) > 0 else 0.0
            mrr = 1.0 / (chunk_hits[0] + 1) if len(chunk_hits) > 0 else 0.0
            retrieval_recalls.append(recall)
            retrieval_mrrs.append(mrr)
        
        # Generator with Abstention logic
        prompt = f"Context: {retrieved_texts}\n\nQuestion: {q}\n\nAnswer (If the context does not contain the answer, reply ONLY with 'Insufficient Context'):"
        ans = llm.invoke(prompt).content
        
        contexts.append(retrieved_texts)
        answers.append(ans)
        
    eval_data["answer"] = answers
    eval_data["contexts"] = contexts
    
    # Print Retrieval Metrics
    avg_recall = sum(retrieval_recalls) / len(retrieval_recalls) if retrieval_recalls else 0
    avg_mrr = sum(retrieval_mrrs) / len(retrieval_mrrs) if retrieval_mrrs else 0
    print(f"\nRetrieval Metrics - Recall@5: {avg_recall:.2f}, MRR: {avg_mrr:.2f}")
    
    # Calculate Abstention / False Acceptance Rate
    unanswerable_indices = [i for i, ans in enumerate(eval_data["is_answerable"]) if not ans]
    correct_abstentions = sum(1 for i in unanswerable_indices if "insufficient" in answers[i].lower())
    false_acceptance_rate = 1.0 - (correct_abstentions / len(unanswerable_indices)) if unanswerable_indices else 0
    print(f"Abstention Performance - Correct Abstentions: {correct_abstentions}/{len(unanswerable_indices)}")
    print(f"False Acceptance Rate: {false_acceptance_rate:.2f}\n")
    
    print("Benchmark generation complete. Running RAGAS...")
    
    dataset = Dataset.from_dict(eval_data)
    
    evaluator_llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash", 
        google_api_key=gemini_key,
        max_retries=10,
        timeout=120
    )
    evaluator_embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-2", google_api_key=gemini_key)
    
    run_config = RunConfig(
        max_workers=2, 
        max_retries=10,
        max_wait=120, 
    )
    
    result = evaluate(
        dataset,
        metrics=[
            context_precision,
            context_recall,
            faithfulness,
            answer_relevancy,
        ],
        llm=evaluator_llm,
        embeddings=evaluator_embeddings,
        run_config=run_config,
    )
    
    print("\n" + "=" * 50)
    print("RAGAS EVALUATION METRICS REPORT")
    print("=" * 50)
    print(result)
    print("=" * 50 + "\n")
    
    # 4. Save Raw Results
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    os.makedirs("evaluation/results", exist_ok=True)
    df = result.to_pandas()
    csv_path = f"evaluation/results/eval_{timestamp}.csv"
    df.to_csv(csv_path, index=False)
    print(f"Saved raw results to {csv_path}")
    
    # 5. Fix EvaluationResult.get()
    thresholds = {
        "faithfulness": 0.90,
        "answer_relevancy": 0.85,
        "context_precision": 0.80,
        "context_recall": 0.80,
    }
    
    passed = True
    for metric, threshold in thresholds.items():
        # FIX applied here: result[metric] instead of result.get()
        score = result[metric]
        if pd.isna(score):
            print(f"[FAIL] {metric.upper()}: NaN (Threshold: {threshold})")
            passed = False
        elif score < threshold:
            print(f"[FAIL] {metric.upper()}: {score:.4f} (Threshold: {threshold})")
            passed = False
        else:
            print(f"[PASS] {metric.upper()}: {score:.4f} (Threshold: {threshold})")
            
    if passed:
        print("\n[SUCCESS] RAG Pipeline passed all thresholds.")
    else:
        print("\n[ERROR] One or more metrics failed.")
        sys.exit(1)

if __name__ == "__main__":
    run_real_evaluation()


def validate_mcq(q: dict) -> bool:
    choices = q.get("choices", [])
    if len(choices) != 4: return False
    correct_count = sum(1 for c in choices if c.get("isCorrect"))
    if correct_count != 1: return False
    return True

def validate_step_by_step(q: dict) -> bool:
    data = q.get("answerData", {})
    steps = data.get("steps", [])
    if not isinstance(steps, list) or len(steps) < 2: return False
    return True

def validate_numerical(q: dict) -> bool:
    data = q.get("answerData", {})
    if "numericAnswer" not in data: return False
    if "tolerance" not in data: return False
    return True

def validate_graphing(q: dict) -> bool:
    data = q.get("answerData", {})
    if "expression" not in data: return False
    if "graphType" not in data: return False
    return True

def validate_question_structure(q: dict) -> bool:
    qtype = q.get("type", "")
    if qtype == "Multiple Choice": return validate_mcq(q)
    elif qtype == "Step-by-step Solution": return validate_step_by_step(q)
    elif qtype == "Numerical Input": return validate_numerical(q)
    elif qtype == "Graphing/Plotting": return validate_graphing(q)
    return True
