import os
import re

main_path = "ai-backend/app/main.py"
with open(main_path, "r", encoding="utf-8") as f:
    main_py = f.read()

# Replace the 404 response with 202 Accepted.
# Note: FastAPI raises HTTPException. For 202, it should probably return JSONResponse(status_code=202) instead of raising exception,
# or raise HTTPException(status_code=202).
main_py = main_py.replace('status_code=404, \n            detail="The AI is still reading your document and crafting questions.', 'status_code=202, \n            detail="The AI is still reading your document and crafting questions.')

# Wait, the code has this exact block:
# raise HTTPException(
#     status_code=404, 
#     detail="The AI is still reading your document and crafting questions. This usually takes about 30-45 seconds. Please wait a moment and click Generate again!"
# )
main_py = re.sub(r'status_code=404,\s*detail="The AI is still reading', 'status_code=202, \n            detail="The AI is still reading', main_py)

with open(main_path, "w", encoding="utf-8") as f:
    f.write(main_py)
print("Updated ai-backend main.py (HTTP 202)")

