# backend/rag/db.py
import sqlite3
from rag.config import DB_PATH

def init_db():
    print("📦 Initializing DB at:", DB_PATH)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS chunks (
        id INTEGER PRIMARY KEY,
        chunk TEXT,
        source TEXT
    )""")
    conn.commit()
    conn.close()

def save_chunks(chunks, source):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    for chunk in chunks:
        c.execute("INSERT INTO chunks (chunk, source) VALUES (?, ?)", (chunk, source))
    conn.commit()
    conn.close()

