import re

with open('c:/Users/IAMT/Documents/QuizArenaRemastered/QUIZARENAREMASTERED/ai-backend/app/celery_worker.py', 'r', encoding='utf-8') as f:
    text = f.read()

celery_task = '''@celery_app.task(name="process_and_generate_quiz")
def process_and_generate_quiz(
    doc_id: str,
    filename: str,
    chunks: list,
    config: dict
):
    """Generate quiz questions using dynamic configs passed from frontend."""
    logger.info(f"{'═' * 60}")
    logger.info(f"Starting pipeline for '{filename}' (doc_id={doc_id})")
    logger.info(f"Config: model={GROQ_MODEL}, count={config.get('count')}, difficulty={config.get('difficulty')}")
    logger.info(f"{'═' * 60}")

    try:
        # Use chunks passed from frontend
        top_chunks = chunks[:10]
        logger.info(f"  Received {len(chunks)} chunks from frontend, using top {len(top_chunks)}")
'''

text = re.sub(r'@celery_app\.task\(name="process_and_generate_quiz"\).*?top_chunks = reranked\[:10\]\s+logger\.info\(f"  Selected top \{len\(top_chunks\)\} chunks for generation"\)', celery_task, text, flags=re.DOTALL)

with open('c:/Users/IAMT/Documents/QuizArenaRemastered/QUIZARENAREMASTERED/ai-backend/app/celery_worker.py', 'w', encoding='utf-8') as f:
    f.write(text)

