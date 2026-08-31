import asyncio
from fastapi.testclient import TestClient
from app.main import fastapi_app

client = TestClient(fastapi_app)

def run_test():
    doc_id = "test_doc_auto_1"
    filepath = "test_rag.pdf"
    
    with open(filepath, "rb") as f:
        print("Sending ingest request...")
        response = client.post("/ingest", files={"file": (filepath, f, "application/pdf")}, data={"docId": doc_id})
    
    if response.status_code == 200:
        print(f"Ingestion successful! Response: {response.json()}")
    else:
        print(f"Ingestion failed: {response.text}")

if __name__ == '__main__':
    run_test()
