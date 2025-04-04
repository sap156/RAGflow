# backend/rag/retriever.py
from sentence_transformers import SentenceTransformer
import sqlite3
import faiss
import os

from rag.config import DB_PATH, INDEX_PATH, EMBED_MODEL

def search_similar_chunks(question, top_k=5):
    print(f"\n🔎 Searching for similar chunks to: '{question}'")

    model = SentenceTransformer(EMBED_MODEL)
    query_vector = model.encode([question])
    
    index = faiss.read_index(INDEX_PATH)
    print(f"🧠 FAISS index contains {index.ntotal} vectors.")

    D, I = index.search(query_vector, top_k)
    print(f"📊 Distances: {D}")
    print(f"📌 Retrieved IDs: {I}")

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    results = []
    for i in I[0]:
        i = int(i)  # ✅ Ensure FAISS ID is a native Python int
        c.execute("SELECT chunk, source FROM chunks WHERE id = ?", (i + 1,))
        row = c.fetchone()
        if row:
            results.append({"chunk": row[0], "source": row[1]})

    conn.close()
    print(f"🔍 Retrieved {len(results)} chunks")
    return results
