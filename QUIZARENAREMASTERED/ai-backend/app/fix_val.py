import re

filepath = r'c:\Users\IAMT\Documents\QuizArenaRemastered\QUIZARENAREMASTERED\ai-backend\app\val.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('qtype = q.get("type", ")', 'qtype = q.get("type", "")')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
