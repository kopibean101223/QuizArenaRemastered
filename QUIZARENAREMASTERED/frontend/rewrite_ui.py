import re

filepath = r'c:\Users\IAMT\Documents\QuizArenaRemastered\QUIZARENAREMASTERED\frontend\src\components\profonly\AIQuestionGenerator.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update state interfaces to include stage and progress
state_find = '''  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [generateConfig, setGenerateConfig] = useState({
    count: 5,
    difficulty: 'Medium',
    types: ['Multiple Choice'],
    document_id: ''
  });'''
state_repl = '''  const [isGenerating, setIsGenerating] = useState(false);
  const [generateStage, setGenerateStage] = useState<string>('');
  const [generateProgress, setGenerateProgress] = useState<number>(0);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [generateConfig, setGenerateConfig] = useState({
    count: 5,
    types: ['Multiple Choice'],
    document_id: ''
  });'''
content = content.replace(state_find, state_repl)

# Remove difficulty selector from GeneratePanel
diff_select = r'<div>\s*<label className="block text-sm font-medium text-slate-300 mb-2">.*?<select.*?difficulty.*?</select>\s*</div>'
content = re.sub(diff_select, '', content, flags=re.DOTALL)

# Update handleGenerate to poll correctly
handle_gen_find = r'const handleGenerate = async \(config = generateConfig\) => \{.*?\n  \};'
handle_gen_repl = '''const handleGenerate = async (config = generateConfig) => {
    if (!config.document_id) {
      setGenerateError('Please select a document first.');
      return;
    }
    
    setIsGenerating(true);
    setGenerateError(null);
    setGenerateStage('Initializing...');
    setGenerateProgress(5);
    
    try {
      // 1. Start generation
      const res = await fetch('/api/rag/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      
      const data = await res.json();
      if (!res.ok && res.status !== 202) throw new Error(data.error || 'Failed to start generation');
      
      const requestId = data.requestId;
      if (!requestId) throw new Error('No requestId returned from generation start');
      
      // 2. Poll status
      const pollInterval = setInterval(async () => {
        try {
          const pollRes = await fetch(/api/rag/generate/status?request_id=);
          if (!pollRes.ok) throw new Error('Failed to fetch status');
          
          const pollData = await pollRes.json();
          setGenerateStage(pollData.stage || 'Processing...');
          setGenerateProgress(pollData.progress || 10);
          
          if (pollData.status === 'COMPLETED' || pollData.status === 'PARTIAL') {
            clearInterval(pollInterval);
            setIsGenerating(false);
            setGenerateProgress(100);
            fetchQuestions(); // Refresh question list
          } else if (pollData.status === 'FAILED') {
            clearInterval(pollInterval);
            throw new Error(pollData.error || 'Generation failed');
          }
        } catch (err: any) {
          clearInterval(pollInterval);
          setIsGenerating(false);
          setGenerateError(err.message || 'Error during polling');
        }
      }, 2000);
      
    } catch (error: any) {
      setGenerateError(error.message || 'An error occurred during generation.');
      setIsGenerating(false);
    }
  };'''
content = re.sub(handle_gen_find, handle_gen_repl, content, flags=re.DOTALL)

# Replace difficulty parameter in toggle calls or states if any? 
content = content.replace('config.difficulty', '"Medium"')

# Update the generating state UI
gen_ui_find = r'\{isGenerating && \(\s*<div className="text-center py-12">.*?</div>\s*\)\}'
gen_ui_repl = '''{isGenerating && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-slate-300">Generating Questions...</p>
              <p className="text-sm text-slate-400 mt-2">{generateStage}</p>
              <div className="w-64 mx-auto mt-4 bg-slate-700 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{width: ${generateProgress}%}}></div>
              </div>
            </div>
          )}'''
content = re.sub(gen_ui_find, gen_ui_repl, content, flags=re.DOTALL)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('UI modifications applied successfully.')
