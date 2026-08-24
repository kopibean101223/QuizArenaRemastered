import re

with open('c:/Users/IAMT/Documents/QuizArenaRemastered/QUIZARENAREMASTERED/ai-backend/app/celery_worker.py', 'r', encoding='utf-8') as f:
    text = f.read()

def_generate = '''def generate_batch_questions(
    chunks: List[Dict],
    filename: str,
    config: dict
) -> List[Dict]:
    """Generate questions for multiple chunks in a single LLM call."""
    difficulty = config.get('difficulty', 'Medium')
    types_list = config.get('types', ['Multiple Choice'])
    types_str = ', '.join(types_list)
    
    chunks_text = ""
    for i, chunk in enumerate(chunks):
        text = chunk["text"] if isinstance(chunk, dict) else chunk.page_content
        chunks_text += f"\\n--- CHUNK {i + 1} ---\\n{text[:800]}\\n"

    prompt = f"""You are an expert Mathematics Professor.
Based on the following {len(chunks)} text chunks from "{filename}", generate exactly {len(chunks) * 2} mathematical test questions (TWO per chunk).
Target Difficulty: {difficulty}
Allowed Question Types: {types_str}

Each question MUST be one of the Allowed Question Types.
Each question must strictly be derived from formulas and concepts in its corresponding chunk.

{chunks_text}

Return ONLY a valid JSON array of objects with no additional text.
If type is "Multiple Choice", include "choices" array (4 options, 1 correct).
If type is "Step-by-step Solution", include "stepWeights" (array of {{"stepDescription": "...", "pointsAwarded": 2, "commonMistake": "..."}}) and "partialCreditRules".
Example JSON output:
[
  {{
    "chunk_index": 0,
    "text": "The mathematical problem statement",
    "type": "Multiple Choice",
    "difficulty": "{difficulty}",
    "answer": "The correct answer text",
    "choices": [
      {{"label": "A", "text": "Option A text", "isCorrect": true}},
      {{"label": "B", "text": "Option B text", "isCorrect": false}},
      {{"label": "C", "text": "Option C text", "isCorrect": false}},
      {{"label": "D", "text": "Option D text", "isCorrect": false}}
    ]
  }},
  {{
    "chunk_index": 0,
    "text": "Another problem statement",
    "type": "Step-by-step Solution",
    "difficulty": "{difficulty}",
    "answer": "Final answer",
    "stepWeights": [
      {{"stepDescription": "Setup formula", "pointsAwarded": 2, "commonMistake": "Wrong sign"}}
    ],
    "partialCreditRules": "Deduct 1 point for arithmetic error"
  }}
]

IMPORTANT: Return exactly {len(chunks) * 2} question objects. chunk_index is 0-based."""
'''

text = re.sub(r'def generate_batch_questions\(.*?IMPORTANT: Return exactly \{len\(chunks\) \* 2\} question objects\. chunk_index is 0-based\."""', def_generate, text, flags=re.DOTALL)

with open('c:/Users/IAMT/Documents/QuizArenaRemastered/QUIZARENAREMASTERED/ai-backend/app/celery_worker.py', 'w', encoding='utf-8') as f:
    f.write(text)

