import re

with open('c:/Users/IAMT/Documents/QuizArenaRemastered/QUIZARENAREMASTERED/ai-backend/app/main.py', 'r') as f:
    text = f.read()

ingest_func = '''@fastapi_app.post("/ingest")
async def ingest_file(file: UploadFile = File(...), docId: str = Form(...)):
    """Extracts text from PDF synchronously and returns chunks for the frontend to save."""
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
        
        passages = []
        for i, chunk in enumerate(md_header_splits):
            if len(chunk.page_content.strip()) > 100:
                passages.append({
                    "id": str(i),
                    "text": chunk.page_content,
                    "meta": chunk.metadata
                })
                
        from flashrank import Ranker, RerankRequest
        ranker = Ranker(model_name="ms-marco-MiniLM-L-12-v2")
        query = "mathematical equations, formulas, definitions, theorems, and worked examples"
        rerankrequest = RerankRequest(query=query, passages=passages)
        reranked = ranker.rerank(rerankrequest)
        top_chunks = reranked[:10]

        return {
            "status": "success", 
            "message": "File processed.",
            "docId": docId, 
            "filename": file.filename,
            "chunks": top_chunks,
            "pages": 1
        }
    except Exception as e:
        print(f"Ingestion error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
'''

text = re.sub(r'@fastapi_app\.post\("/ingest"\).*?class MathCitation\(BaseModel\):', ingest_func + '\n\nclass MathCitation(BaseModel):', text, flags=re.DOTALL)

with open('c:/Users/IAMT/Documents/QuizArenaRemastered/QUIZARENAREMASTERED/ai-backend/app/main.py', 'w') as f:
    f.write(text)

