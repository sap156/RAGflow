# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import sqlite3
import uuid
from rag.config import DB_PATH  # ✅ Add this
from rag.db import init_db
from rag.ingestion import process_and_store, extract_text
from rag.retriever import search_similar_chunks
from rag.generator import generate_answer

app = Flask(__name__)

# Safe CORS config for dev
CORS(app, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:8080"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.route("/")
def hello():
    return {"message": "RAG-ORACLE Backend is running"}

@app.route("/upload", methods=["POST", "OPTIONS"])
def upload():
    if request.method == "OPTIONS":
        response = app.make_default_options_response()
        return add_cors_headers(response)

    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    filename = file.filename
    print("Received file:", filename)

    if file and filename:
        try:
            print("Reading file bytes now...")
            file_bytes = file.read()

            print("Extracting text...")
            text = extract_text(file_bytes, filename)
            print("Extracted text sample:", text[:300])

            print("Processing and storing chunks...")
            num_chunks = process_and_store(text, filename)

            print("Upload successful.")
            return jsonify({"message": f"{filename} processed", "chunks": num_chunks})
        
        except Exception as e:
            print("Upload error:", str(e))
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Upload failed"}), 400



@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        rag_steps = []

        # Step 1 - User Question
        rag_steps.append({"step": "User Question", "value": question})

        # Step 2 - Embed Question
        from sentence_transformers import SentenceTransformer
        from rag.config import EMBED_MODEL
        model = SentenceTransformer(EMBED_MODEL)
        question_vector = model.encode([question])
        rag_steps.append({
            "step": "Embed Question",
            "value": str(question_vector[0][:10]) + "..."
        })

        # Step 3 - Search Vector DB
        import faiss
        from rag.config import INDEX_PATH
        index = faiss.read_index(INDEX_PATH)
        D, I = index.search(question_vector, 5)
        rag_steps.append({
            "step": "Search Vector DB",
            "value": f"Top {len(I[0])} chunks retrieved"
        })

        # Step 4 - Retrieve Contexts (cast index to int)
        import sqlite3
        from rag.config import DB_PATH
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        similar_chunks = []

        for i in I[0]:
            c.execute("SELECT chunk, source FROM chunks LIMIT 1 OFFSET ?", (int(i),))
            row = c.fetchone()
            if row:
                similar_chunks.append({"chunk": row[0], "source": row[1]})
        conn.close()

        preview = "\n---\n".join([c["chunk"][:200] for c in similar_chunks])
        rag_steps.append({
            "step": "Retrieve Contexts",
            "value": preview
        })

        # Step 5 - Build Prompt
        prompt = f"Use ONLY the context below to answer the question as clearly as possible.\n\nContext:\n{preview}\n\nQuestion: {question}"
        rag_steps.append({"step": "Build Prompt", "value": prompt})

        # Step 6 - Send to LLM
        rag_steps.append({"step": "Send to LLM", "value": "Calling OpenAI API..."})

        # Step 7 - Generate Answer
        from rag.generator import generate_answer
        answer = generate_answer(similar_chunks, question)
        rag_steps.append({"step": "Generate Answer", "value": answer})

        # Step 8 - Show Answer
        rag_steps.append({"step": "Show Answer", "value": "Answer displayed to user"})

        # 💾 Save question to history
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("DELETE FROM history WHERE question = ?", (question,))

        
        c.execute(
                 "INSERT INTO history (id, question, answer, timestamp) VALUES (?, ?, ?, ?)",
                (str(uuid.uuid4()), question, answer, datetime.now().isoformat())
                )
        conn.commit()
        conn.close()

        return jsonify({
            "question": question,
            "answer": answer,
            "sources": similar_chunks,
            "steps": rag_steps
        })

    except Exception as e:
        print(f"💥 Exception in /ask: {e}")
        return jsonify({"error": str(e)}), 500



@app.route("/history")
def get_history():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, question, answer, timestamp FROM history ORDER BY timestamp DESC LIMIT 100")
    rows = c.fetchall()
    conn.close()

    return jsonify([
        {
            "id": row[0],
            "question": row[1],
            "answer": row[2],
            "timestamp": row[3]
        } for row in rows
    ])

@app.route("/clear-history", methods=["POST"])
def clear_history():
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("DELETE FROM history")
        conn.commit()
        conn.close()
        return jsonify({"message": "History cleared"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/debug")
def debug():
    from rag.config import DB_PATH, INDEX_PATH
    return jsonify({
        "db_exists": os.path.exists(DB_PATH),
        "index_exists": os.path.exists(INDEX_PATH),
        "db_path": DB_PATH,
        "index_path": INDEX_PATH
    })



if __name__ == "__main__":
    from rag.db import init_db
    from rag.config import DATA_DIR
    os.makedirs(DATA_DIR, exist_ok=True)  # ← Correct directory
    init_db()
    app.run(debug=True, host="localhost", port=5050)


