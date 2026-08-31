import os
import json
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel
from typing import List

load_dotenv()

class GeneratedQuestion(BaseModel):
    text: str
    answer: str

class BatchQuestions(BaseModel):
    questions: List[GeneratedQuestion]

def test():
    client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents='Give me 2 math questions.',
        config={
            'response_mime_type': 'application/json',
            'response_schema': BatchQuestions,
            'temperature': 0.3
        },
    )
    print(response.text)
    
test()
