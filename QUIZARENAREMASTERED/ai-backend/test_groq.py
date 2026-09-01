import os, json
from dotenv import load_dotenv
load_dotenv()
from openai import OpenAI

client = OpenAI(base_url='https://api.groq.com/openai/v1', api_key=os.getenv('GROQ_API_KEY'))
response = client.chat.completions.create(
    model='qwen/qwen3.8-27b',
    messages=[
        {'role': 'system', 'content': 'You are a helpful assistant. Respond ONLY with valid JSON. /no_think'},
        {'role': 'user', 'content': 'Generate 1 math question. Return JSON with a "questions" array containing objects with "text" and "answer" fields.'}
    ],
    temperature=0.3,
    max_tokens=500,
    response_format={'type': 'json_object'}
)
print(response.choices[0].message.content)

