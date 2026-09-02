import re

filepath = r'c:\Users\IAMT\Documents\QuizArenaRemastered\QUIZARENAREMASTERED\ai-backend\app\celery_worker.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Stage 7 Redis save with Supabase direct save
stage7_regex = r'# -- Stage 7: Store Results in Redis ------------------------------.*?return \{[^\}]*\}'

new_stage7 = '''# -- Stage 7: Store Results in Supabase & Redis ------------------------------
        logger.info("[Stage 7/7] Storing results in Supabase...")
        
        try:
            from supabase import create_client
            supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))
            
            # Save to GeneratedQuestion
            for q in valid_questions:
                q_data = {
                    "request_id": request_id,
                    "docId": int(doc_id),
                    "userId": user_id,
                    "text": q.get("text", ""),
                    "type": q.get("type", "Multiple Choice"),
                    "difficulty": q.get("difficulty", "Medium"),
                    "estimatedDifficulty": q.get("estimated_difficulty", 0.5),
                    "bloomLevel": q.get("bloom_level", "UNDERSTAND"),
                    "topic": config.get("category", "General"),
                    "answer": q.get("answer", ""),
                    "status": "PENDING",
                    "answerData": q.get("answerData", {})
                }
                
                # Insert question
                res = supabase.table("GeneratedQuestion").insert(q_data).execute()
                if res.data:
                    new_q_id = res.data[0]["id"]
                    
                    # Insert choices if any
                    choices = q.get("choices", [])
                    if choices:
                        choice_rows = []
                        for c in choices:
                            choice_rows.append({
                                "questionId": new_q_id,
                                "label": c.get("label", ""),
                                "text": c.get("text", ""),
                                "isCorrect": c.get("isCorrect", False)
                            })
                        supabase.table("QuestionChoice").insert(choice_rows).execute()
                        
                    # Insert citation
                    citation = q.get("citation", {})
                    if citation:
                        cit_row = {
                            "questionId": new_q_id,
                            "docName": citation.get("docName", ""),
                            "section": citation.get("section", ""),
                            "pageRange": citation.get("pageRange", ""),
                            "excerpt": citation.get("excerpt", ""),
                            "confidence": citation.get("confidence", "medium")
                        }
                        supabase.table("QuestionCitation").insert(cit_row).execute()
                        
            # Mark run as COMPLETED
            supabase.table("generation_runs").update({
                "status": "COMPLETED",
                "stage": "Finished successfully.",
                "progress": 100.0,
                "raw_generated": len(all_generated),
                "validated_count": len(valid_questions),
                "saved_count": len(valid_questions)
            }).eq("request_id", request_id).execute()
            
        except Exception as e:
            logger.error(f"Failed to save to Supabase: {e}")
            # Mark run as FAILED
            try:
                supabase.table("generation_runs").update({
                    "status": "FAILED",
                    "stage": "Failed to save results.",
                    "error_message": str(e)
                }).eq("request_id", request_id).execute()
            except:
                pass
                
        # Also store in Redis for the status route
        r = _get_redis_client()
        r.set(
            f"generation:{request_id}",
            json.dumps({
                "requestId": request_id,
                "status": "COMPLETED",
                "stage": "Finished successfully.",
                "progress": 100.0,
                "rawGenerated": len(all_generated),
                "validated": len(valid_questions),
                "saved": len(valid_questions)
            })
        )
        return {"status": "success", "saved": len(valid_questions)}'''

content = re.sub(stage7_regex, new_stage7, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('celery_worker stage 7 modifications applied successfully.')
