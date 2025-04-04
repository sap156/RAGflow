# backend/rag/ingestion.py
from langchain.text_splitter import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import faiss
import os
import pickle
import docx
import fitz
import io
import numpy as np
import traceback  # ← Added for detailed error logging
from PyPDF2 import PdfReader
import docx

from rag.config import INDEX_PATH, EMBED_MODEL
from rag.db import save_chunks

def chunk_text(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    return splitter.split_text(text)

def embed_chunks(chunks):
    model = SentenceTransformer(EMBED_MODEL)
    embeddings = model.encode(chunks)
    return embeddings

def load_faiss():
    if os.path.exists(INDEX_PATH):
        return faiss.read_index(INDEX_PATH)
    return faiss.IndexFlatL2(768)  

def save_faiss(index):
    faiss.write_index(index, INDEX_PATH)

def process_and_store(text, filename):
    try:
        print("📄 Chunking text...")
        chunks = chunk_text(text)
        print(f"🧩 Created {len(chunks)} chunks")

        print("🔗 Generating embeddings...")
        embeddings = embed_chunks(chunks)
        print(f"✅ Embeddings shape: {np.array(embeddings).shape}")

        print("📥 Loading FAISS index...")
        index = load_faiss()
        print(f"🧠 FAISS index contains {index.ntotal} vectors.")

        print("➕ Adding new embeddings...")
        index.add(np.array(embeddings).astype("float32"))

        print(f"💾 Saving FAISS index to: {INDEX_PATH}")
        os.makedirs(os.path.dirname(INDEX_PATH), exist_ok=True)
        save_faiss(index)

        print("📝 Saving chunks to DB...")
        save_chunks(chunks, filename)

        return len(chunks)

    except Exception as e:
        print("🚨 Error in process_and_store:", str(e))
        traceback.print_exc()
        raise  # re-raise so Flask can catch and return 500 response

def extract_text(file_bytes, filename):
    if filename.endswith(".txt"):
        return file_bytes.decode("utf-8")
    
    elif filename.endswith(".docx"):
        doc = docx.Document(io.BytesIO(file_bytes))
        return "\n".join([para.text for para in doc.paragraphs])

    elif filename.endswith(".pdf"):
        text = ""
        with fitz.open(stream=file_bytes, filetype="pdf") as pdf:
            for page in pdf:
                text += page.get_text()
        return text

    else:
        raise ValueError("Unsupported file type")
