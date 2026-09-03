import os
import sys
from langchain_google_genai import ChatGoogleGenerativeAI
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# We use pure Langchain to bypass the RAGAS Windows asyncio bugs!
def run_custom_eval():
    sb: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
    
    print("Fetching latest generated questions from database...")
    res = sb.table("GeneratedQuestion").select("id, text, answerData, QuestionCitation(excerpt)").order("createdAt", desc=True).limit(5).execute()
    
    if not res.data:
        print("No questions found in database.")
        sys.exit(0)

    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=os.getenv("GEMINI_API_KEY"), temperature=0)

    total_faithfulness = 0
    total_relevancy = 0
    count = len(res.data)

    print(f"\n--- EVALUATING {count} LIVE QUESTIONS ---")
    for i, row in enumerate(res.data):
        q_text = row.get("text", "")
        ans_data = row.get("answerData") or {}
        a_text = ans_data.get("textAnswer") or str(ans_data.get("numericAnswer", ""))
        
        citations = row.get("QuestionCitation")
        if isinstance(citations, list) and len(citations) > 0:
            excerpt = citations[0].get("excerpt", "No context provided")
        elif isinstance(citations, dict):
            excerpt = citations.get("excerpt", "No context provided")
        else:
            excerpt = "No context provided"

        faithfulness_prompt = f"""
You are an expert evaluator. Given the context and an answer, evaluate if the answer is FAITHFUL to the context.
It is faithful if it contains NO hallucinated details outside the context.
Respond strictly with "SCORE: 1.0" if faithful, or "SCORE: 0.0" if unfaithful.

Context: {excerpt}
Question: {q_text}
Answer: {a_text}
"""
        relevancy_prompt = f"""
You are an expert evaluator. Does the generated Question and Answer directly relate to the provided context?
Respond strictly with "SCORE: 1.0" if relevant, or "SCORE: 0.0" if irrelevant.

Context: {excerpt}
Question: {q_text}
Answer: {a_text}
"""

        import time
        # Evaluate Faithfulness
        f_res = llm.invoke(faithfulness_prompt)
        f_score = 1.0 if "1.0" in f_res.content else 0.0
        time.sleep(2) # Prevent Gemini Free Tier Rate Limit (429)
        
        # Evaluate Relevancy
        r_res = llm.invoke(relevancy_prompt)
        r_score = 1.0 if "1.0" in r_res.content else 0.0
        time.sleep(2) # Prevent Gemini Free Tier Rate Limit (429)
        
        total_faithfulness += f_score
        total_relevancy += r_score
        print(f"Q{i+1}: Faithfulness={f_score}, Relevancy={r_score} | {q_text[:40]}...")

    print("\n==================================================")
    print("LIVE DATABASE METRICS REPORT (CUSTOM EVALUATOR)")
    print("==================================================")
    print(f"{{'faithfulness': {total_faithfulness/count:.4f}, 'answer_relevancy': {total_relevancy/count:.4f}}}")
    print("==================================================")

if __name__ == "__main__":
    run_custom_eval()
