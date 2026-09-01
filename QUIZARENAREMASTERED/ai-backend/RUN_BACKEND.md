# How to Run the AI Backend

To run the AI Backend, you need to start **two** separate processes. Open two different terminal windows (Command Prompt or PowerShell) and navigate to the `ai-backend` directory in both.

### 0. Install Dependencies
Before running for the first time, make sure all required packages are installed by running:
```bash
pip install -r requirements.txt
```

### 1. Start the API Server (Uvicorn)
In your first terminal window, run the following command to start the FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```
*This starts your main backend server on `http://localhost:8000`.*

### 2. Start the Background Worker (Celery)
In your second terminal window, run the following command to start the Celery worker (which handles the heavy AI generation tasks):

```bash
python -m celery -A app.celery_worker.celery_app worker --loglevel=info -P solo
```
*Note: The `-P solo` flag is required on Windows to prevent multiprocessing errors.*

---
### Troubleshooting
- **Redis Error?** Make sure you have your `.env` file correctly set up with the Upstash Redis URL.
- **Task not running?** Ensure both the Uvicorn server AND the Celery worker are running at the same time. Uvicorn sends the task, and Celery processes it.

