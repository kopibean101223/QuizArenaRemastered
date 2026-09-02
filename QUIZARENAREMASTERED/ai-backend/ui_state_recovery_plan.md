# Future Implementation: UI State Recovery for Background Generation

This document outlines how to safely make the UI "remember" that a generation is running in the background, even if the user refreshes the page or navigates to a different tab and comes back. 

Since your backend generation is already safely running in Celery, these changes will **only touch the React frontend**.

## The Strategy: `localStorage`

To restore the loading state when a user returns to the page, we just need to save the `request_id` to the browser's memory (`localStorage`). When the page loads, React will check if a `request_id` exists, check its status, and resume the loading bar if it's still processing.

---

## Step 1: Save `request_id` when generation starts

Inside `AIQuestionGenerator.tsx`, locate your `handleGenerate` function. When you successfully get the `requestId` from the backend, save it to `localStorage`.

```typescript
// Inside handleGenerate, right after setting the initial state:
const requestId = data.request_id;
setIsGenerating(true);
setGenerationStage("Initializing generation run...");

// ADD THIS LINE: Save the active task to browser memory
localStorage.setItem("activeGenerationTask", requestId);
```

## Step 2: Clear it when generation finishes

Inside your polling interval `const pollInterval = setInterval(async () => { ... })`, you need to clear the memory when the task finishes so it doesn't get stuck loading forever.

```typescript
if (pollData.status === "COMPLETED" || pollData.status === "FAILED") {
    clearInterval(pollInterval);
    setIsGenerating(false);
    
    // ADD THIS LINE: Remove the task from memory
    localStorage.removeItem("activeGenerationTask");
    
    // ... rest of your completion logic (fetching new questions, etc.)
}
```

## Step 3: Resume polling on page load

Add a `useEffect` hook at the top of your `AIQuestionGenerator` component. This will run exactly once when the page loads. It will check if there's a saved task, ask the backend if it's still running, and resume the loading bar if it is.

```typescript
import { useEffect } from "react";

// Add this inside the AIQuestionGenerator component:
useEffect(() => {
  const savedTaskId = localStorage.getItem("activeGenerationTask");
  
  if (savedTaskId) {
    // Check the backend to see if it's actually still running
    fetch(`/api/rag/generate/status?request_id=${savedTaskId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "PROCESSING" || data.status === "QUEUED") {
          // It's still running! Resume the loading UI
          setIsGenerating(true);
          setGenerationStage(data.stage || "Resuming progress...");
          setGenerationProgress(data.progress || 0);
          
          // Re-start the polling loop here...
          // (You can extract your polling logic into a separate reusable function
          // like `startPolling(taskId)` so both handleGenerate and this useEffect can call it)
        } else {
          // Task already finished while the user was away
          localStorage.removeItem("activeGenerationTask");
          // Optionally auto-refresh the questions list here!
        }
      })
      .catch(err => {
        console.error("Failed to check background task:", err);
        localStorage.removeItem("activeGenerationTask");
      });
  }
}, []);
```

## Summary for the Future
When you are ready to tackle this, you won't need to touch `celery_worker.py` or the database at all. Just implement the `localStorage` caching in `AIQuestionGenerator.tsx` and you'll have a fully robust, page-refresh-proof UI!
