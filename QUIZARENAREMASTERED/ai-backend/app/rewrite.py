import re

filepath = r'c:\Users\IAMT\Documents\QuizArenaRemastered\QUIZARENAREMASTERED\ai-backend\app\celery_worker.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix Gemini model
content = content.replace('models/embedding-001', 'models/gemini-embedding-2')

# 2. Fix duplicate logger propagation
logger_find = 'logger = logging.getLogger("quiz_pipeline")\nlogger.setLevel(logging.INFO)\nif not logger.handlers:'
logger_repl = 'logger = logging.getLogger("quiz_pipeline")\nlogger.setLevel(logging.INFO)\nlogger.propagate = False\nif not logger.handlers:'
content = content.replace(logger_find, logger_repl)

# 3. Modify process_and_generate_quiz signature
func_find = 'def process_and_generate_quiz(\n    doc_id: str,\n    filename: str,\n    chunks: list,\n    config: dict\n):'
func_repl = 'def process_and_generate_quiz(\n    request_id: str,\n    doc_id: str,\n    user_id: str,\n    filename: str,\n    config: dict\n):\n    chunks = []'
content = content.replace(func_find, func_repl)

# Use double quotes to avoid escaping issues
old_log = r"Starting pipeline for '{filename}' (doc_id={doc_id})"
new_log = r"Starting pipeline for '{filename}' (request_id={request_id})"
content = content.replace(old_log, new_log)

# 4. Fix chunk generation count
prompt_find = 'generate exactly {len(chunks) * 2} mathematical test questions (TWO per chunk)'
prompt_repl = 'generate exactly {config.get("count", len(chunks))} mathematical test questions'
content = content.replace(prompt_find, prompt_repl)

return_find = 'Return exactly {len(chunks) * 2} question objects'
return_repl = 'Return exactly {config.get("count", len(chunks))} question objects'
content = content.replace(return_find, return_repl)

# 5. Remove the recursive regeneration bug (1075-1079)
recur_find = '''        if not valid_questions and attempt < 2:
            logger.info("[Regeneration] Attempting regeneration with adjusted prompt...")
            config['_attempt'] = 2
            config['types'] = ['Multiple Choice']  # Simplify to most reliable type
            return process_and_generate_quiz(doc_id, filename, chunks, config)'''
content = content.replace(recur_find, '')

# 6. Remove fixed INTER_REQUEST_DELAY = 12 sleep between ALL batches, even successful ones
sleep_find1 = '''            if batch_idx < len(batches) - 1:
                logger.info(
                    f"  Waiting {INTER_REQUEST_DELAY}s before next batch..."
                )
                time.sleep(INTER_REQUEST_DELAY)'''
content = content.replace(sleep_find1, '')

sleep_find2 = '''            if i + BATCH_SIZE < len(critic_items):
                logger.info(
                    f"  Waiting {INTER_REQUEST_DELAY}s before next "
                    f"critic batch..."
                )
                time.sleep(INTER_REQUEST_DELAY)'''
content = content.replace(sleep_find2, '')

# 7. Remove per-question embedding storm
embed_find = '''            try:
                q_emb = get_embedding(question_text)
                c_emb = get_embedding(context_text)
                sim = cosine_similarity([q_emb], [c_emb])[0][0]

                if sim < 0.75:
                    logger.info(
                        f"  ? Similarity too low ({sim:.3f}): "
                        f"{question_text[:60]}..."
                    )
                    continue

                logger.info(
                    f"  ? Similarity OK ({sim:.3f}): {question_text[:60]}..."
                )
            except Exception as e:
                logger.warning(
                    f"  ? Embedding failed ({e}). "
                    f"Accepting question on critic merit alone."
                )'''
content = content.replace(embed_find, '')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('celery_worker modifications applied successfully.')
