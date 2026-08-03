"""
Vector store setup for QuizArena's RAG pipeline.

Source material (lecture notes, past exams, textbook excerpts a professor
uploads) should be placed in app/rag/docs/ and indexed here so the
AI Question Generator and Solution Analyzer can retrieve relevant context
before calling the LLM.
"""

from pathlib import Path

DOCS_DIR = Path(__file__).parent / "docs"

_vectorstore = None


def load_vectorstore():
    """
    Load (or lazily build) the vector store used for retrieval.

    Thesis-scope stub: swap in a real embeddings + vector store combo,
    e.g. langchain_openai.OpenAIEmbeddings + Chroma/FAISS, once you're
    ready to index real course materials from DOCS_DIR.
    """
    global _vectorstore
    if _vectorstore is None:
        # from langchain_community.vectorstores import Chroma
        # from langchain_openai import OpenAIEmbeddings
        # _vectorstore = Chroma.from_documents(..., OpenAIEmbeddings())
        _vectorstore = None
    return _vectorstore
