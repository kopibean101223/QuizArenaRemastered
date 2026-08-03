"""
LangChain chains backing two features of QuizArena:

1. AI Question Generator (professor side) — generate quiz questions
   grounded in a section's uploaded course materials.
2. Solution Analyzer (professor side) — review a student's submitted
   solution/answer and produce feedback.

Thesis-scope stubs: fill in the LLM + retriever wiring once an
OPENAI_API_KEY (or other provider) is configured in .env.
"""

from app.rag.vectorstore import load_vectorstore


def get_rag_chain():
    """
    Build the retrieval-augmented chain used by both features below.
    Returns None until a real LLM + vectorstore are wired in.
    """
    vectorstore = load_vectorstore()
    if vectorstore is None:
        return None

    # from langchain_openai import ChatOpenAI
    # from langchain.chains import RetrievalQA
    # llm = ChatOpenAI(model="gpt-4o-mini")
    # return RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())
    return None


def generate_questions(topic: str, difficulty: str, count: int = 5):
    """
    Used by AIQuestionGenerator.tsx. Should return a list of question
    dicts matching the `Question` shape in prisma/schema.prisma:
    { text, subject, difficulty, topic, type, points, timeLimit,
      choices, answer, explanation, tags }
    """
    chain = get_rag_chain()
    if chain is None:
        return []  # TODO: wire up chain, then prompt + parse into Question shape
    # result = chain.invoke({"query": f"Generate {count} {difficulty} questions on {topic}"})
    # return parse_questions(result)


def analyze_solution(question_text: str, student_answer: str):
    """
    Used by SolutionAnalyzer.tsx. Should return feedback on a student's
    submitted answer, e.g. { isCorrect, feedback, suggestedScore }.
    """
    chain = get_rag_chain()
    if chain is None:
        return None  # TODO: wire up chain, then prompt for analysis + feedback
