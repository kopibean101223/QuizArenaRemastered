import os
import sys
import types

# Patch Ragas missing VertexAI import
try:
    import langchain_community.chat_models
    m = types.ModuleType('langchain_community.chat_models.vertexai')
    m.ChatVertexAI = type('ChatVertexAI', (), {})
    sys.modules['langchain_community.chat_models.vertexai'] = m
except Exception:
    pass

import pandas as pd
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy
from ragas.run_config import RunConfig
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from supabase import create_client, Client
from dotenv import load_dotenv
import nest_asyncio

# Fix Windows event loop issues
nest_asyncio.apply()
load_dotenv()

def run_live_eval():
    sb: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
    
    print("Fetching latest generated questions from database...")
    # Fetch exactly what the pipeline saved (with citations)
    res = sb.table("GeneratedQuestion").select("id, text, answerData, QuestionCitation(excerpt)").order("createdAt", desc=True).limit(5).execute()
    
    if not res.data:
        print("No questions found in database.")
        sys.exit(0)

    eval_data = {"question": [], "answer": [], "contexts": []}
    for row in res.data:
        eval_data["question"].append(row.get("text", ""))
        
        ans_data = row.get("answerData") or {}
        answer_text = ans_data.get("textAnswer") or str(ans_data.get("numericAnswer", ""))
        eval_data["answer"].append(answer_text)
        
        citations = row.get("QuestionCitation")
        if isinstance(citations, list) and len(citations) > 0:
            excerpt = citations[0].get("excerpt", "No context provided")
        elif isinstance(citations, dict):
            excerpt = citations.get("excerpt", "No context provided")
        else:
            excerpt = "No context provided"
        
        eval_data["contexts"].append([excerpt])

    dataset = Dataset.from_dict(eval_data)
    
    print(f"Running RAGAS evaluation on {len(eval_data['question'])} LIVE database questions...")
    # Setup Gemini
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=os.getenv("GEMINI_API_KEY"))
    embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004", google_api_key=os.getenv("GEMINI_API_KEY"))
    
    # max_workers=1 forcefully prevents the Windows asyncio Timeout bug you experienced earlier!
    safe_config = RunConfig(max_workers=1, max_retries=5)
    
    result = evaluate(
        dataset,
        metrics=[faithfulness, answer_relevancy],
        llm=llm,
        embeddings=embeddings,
        run_config=safe_config
    )
    
    print("\n" + "=" * 50)
    print("LIVE DATABASE METRICS REPORT")
    print("=" * 50)
    print(result)
    print("=" * 50 + "\n")
    
    df = result.to_pandas()
    os.makedirs("evaluation/results", exist_ok=True)
    df.to_csv("evaluation/results/live_eval_results.csv", index=False)
    print("Saved detailed results to evaluation/results/live_eval_results.csv")

if __name__ == "__main__":
    run_live_eval()
