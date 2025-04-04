import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # points to backend/
DATA_DIR = os.path.join(BASE_DIR, "data")  # ✅ this resolves to ./data
DB_PATH = os.path.join(DATA_DIR, "rag.db")  # ✅ ./data/rag.db
INDEX_PATH = os.path.join(DATA_DIR, "faiss.index")
EMBED_MODEL = "all-mpnet-base-v2" # SentenceTransformer model
