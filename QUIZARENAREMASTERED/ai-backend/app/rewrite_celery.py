import sys
import re

with open('c:/Users/IAMT/Documents/QuizArenaRemastered/QUIZARENAREMASTERED/ai-backend/app/celery_worker.py', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix Gemini model (models/embedding-001 -> models/gemini-embedding-2)
content = content.replace('models/embedding-001', 'models/gemini-embedding-2')

# 2. Prevent propagation of duplicate logger
logger_config = '''logger = logging.getLogger("quiz_pipeline")
logger.setLevel(logging.INFO)
logger.propagate = False
if not logger.handlers:'''
content = content.replace('logger = logging.getLogger("quiz_pipeline")\nlogger.setLevel(logging.INFO)\nif not logger.handlers:', logger_config)

# 3. Add Pydantic Models for answerData schemas
models_to_add = '''
class MCQAnswerData(BaseModel):
    pass  # Choices are top-level

class StepByStepAnswerData(BaseModel):
    steps: List[Dict[str, Any]] = Field(description="List of steps, each with 'stepDescription', 'expectedValue', 'points'")
    totalPoints: int

class NumericalAnswerData(BaseModel):
    numericAnswer: float
    tolerance: float

class GraphingAnswerData(BaseModel):
    expression: str
    graphType: str
    expectedShape: str
    keyPoints: List[Dict[str, float]]
    xRange: List[float]
    yRange: List[float]
'''
# Insert after QuestionChoice
content = content.replace('class QuestionChoice(BaseModel):', models_to_add + '\nclass QuestionChoice(BaseModel):')

# 4. Modify generate_batch_questions to use these models (and generate exactly count, not len(chunks)*2)
# Too complex to regex easily, maybe I can just replace the whole function.
# Let's replace generate_batch_questions completely.

generate_batch_replacement = '''
def generate_batch_questions(
    chunks: List[Dict],
    filename: str,
    config: dict,
    batch_count: int
) -> List[Dict]:
    types_list = config.get('types', ['Multiple Choice'])
    types_str = ', '.join(types_list)
    
    chunks_text = ""
    for i, chunk in enumerate(chunks):
        text = chunk["text"] if isinstance(chunk, dict) else chunk.page_content
        chunks_text += f"\\n--- CHUNK {i + 1} ---\\n{text[:800]}\\n"

    prompt = f"""You are an expert Mathematics Professor.
Based on the following {len(chunks)} text chunks from "{filename}", generate exactly {batch_count} mathematical test questions.

Allowed Question Types: {types_str}

Each question MUST be one of the Allowed Question Types.
Each question must strictly be derived from formulas and concepts in its corresponding chunk.

Generate a MIXED-DIFFICULTY set of questions.
Use Bloom's Taxonomy as a guide.

For every question, return:
- question type
- bloom_level: one of REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE, CREATE
- estimated_difficulty: a normalized number from 0.00 (very easy) to 1.00 (very difficult)
- difficulty: a human-readable label derived from estimated_difficulty (Easy if <0.33, Medium if 0.33-0.66, Hard if >0.66)
- answerData: required object with type-specific fields.
  - If MCQ: {}
  - If Step-by-step: {{"steps": [{{"stepDescription": "...", "expectedValue": "...", "points": 1}}], "totalPoints": ...}}
  - If Numerical: {{"numericAnswer": 12.5, "tolerance": 0.1}}
  - If Graphing: {{"expression": "y=x^2", "graphType": "parabola", "expectedShape": "U", "keyPoints": [...], "xRange": [-5, 5], "yRange": [-5, 5]}}

{chunks_text}

IMPORTANT: Return exactly {batch_count} question objects. chunk_index is 0-based."""

    try:
        patched_client = instructor.from_openai(groq_client, mode=instructor.Mode.MD_JSON)
        batch_res = patched_client.chat.completions.create(
            model=GROQ_MODEL,
            response_model=BatchQuestions,
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Output exactly the requested JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=4096
        )
        return [q.model_dump() for q in batch_res.questions]
    except Exception as e:
        logger.warning(f"[Actor] Groq failed, trying Gemini fallback: {e}")
        try:
            from google import genai
            gemini_fallback_model = "gemini-3.5-flash"
            client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
            
            for attempt in range(3):
                try:
                    response = client.models.generate_content(
                        model=gemini_fallback_model,
                        contents=prompt,
                        config={
                            'response_mime_type': 'application/json',
                            'response_schema': BatchQuestions,
                            'temperature': 0.3
                        },
                    )
                    data = json.loads(response.text)
                    return data.get("questions", [])
                except Exception as rate_err:
                    err_str = str(rate_err)
                    if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                        delay = 15 * (attempt + 1)
                        time.sleep(delay)
                    else:
                        raise rate_err
            raise Exception("Gemini rate limit retries exhausted")
        except Exception as e3:
            logger.error(f"[Actor] All structured output providers failed: {e3}")
            return []
'''
# Actually, I'd rather rewrite the whole file cleanly. Let's write the whole file to a new one.
