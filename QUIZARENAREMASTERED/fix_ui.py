import re

filepath = r'c:\Users\IAMT\Documents\QuizArenaRemastered\QUIZARENAREMASTERED\frontend\src\components\profonly\AIQuestionGenerator.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

handle_gen_find = r'const handleGenerate = async \(config: \{.*?\}\) => \{.*?(?=const handleEditQuestion)'

handle_gen_repl = '''const handleGenerate = async (config: {
    count: string;
    qtypes: string[];
    docId: number | "all";
  }) => {
    if (docs.length === 0) {
      toast.error("Please upload at least one syllabus document first.");
      return;
    }

    setGenerating(true);
    toast.loading("AI is crafting questions... initializing", { id: "generating" });

    try {
      const activeDocId = config.docId === "all" ? docs[0].id : config.docId;

      const response = await fetch("/api/rag/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          count: parseInt(config.count, 10),
          types: config.qtypes,
          document_id: activeDocId,
          category: "General",
        }),
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok && response.status !== 202) {
        throw new Error(resData?.error || resData?.detail || "Failed to start generation");
      }

      const requestId = resData.requestId;
      if (!requestId) {
        throw new Error("No requestId returned from server");
      }

      const pollInterval = setInterval(async () => {
        try {
          const pollRes = await fetch(/api/rag/generate/status?request_id= + requestId);
          if (!pollRes.ok) throw new Error("Backend error");
          
          const pollData = await pollRes.json();
          const stage = pollData.stage || "Processing...";
          toast.loading("AI is crafting questions... " + stage, { id: "generating" });
          
          if (pollData.status === "COMPLETED" || pollData.status === "PARTIAL") {
            clearInterval(pollInterval);
            toast.success("Questions generated successfully!", { id: "generating" });
            setGenerating(false);
            fetchDocsAndQuestions();
          } else if (pollData.status === "FAILED") {
            clearInterval(pollInterval);
            toast.error(pollData.error || "Generation failed", { id: "generating" });
            setGenerating(false);
          }
        } catch (err: any) {
          clearInterval(pollInterval);
          toast.error("Polling interrupted: " + err.message, { id: "generating" });
          setGenerating(false);
        }
      }, 2500);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to generate questions.", { id: "generating" });
      setGenerating(false);
    }
  };

  '''

content = re.sub(handle_gen_find, handle_gen_repl, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('UI modifications applied successfully.')
