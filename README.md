# 🧠 RAGflow – Visualize Retrieval-Augmented Generation

RAGflow is an interactive web app that lets you upload documents and ask questions, powered by Retrieval-Augmented Generation (RAG). What sets it apart? You don’t just get an answer — you get to **watch the RAG process unfold** visually through a step-by-step flow, from vector embedding to LLM generation.

## 📽️ Watch RAGflow in Action
![RAGflow Demo](/media/ragflow-demo.gif)


---

## 🚀 Features

- **Document Upload:** Supports PDF, DOC, DOCX, TXT
- **Ask Natural Questions:** Get accurate, context-aware answers
- **RAG Flow Visualization:** See how the system retrieves, builds prompts, and generates answers
- **Recent History:** View past questions and revisit them anytime
- **Auto-scroll Animation:** Follows the flow as the RAG engine processes your input

---

## 🧰 Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Flask, SQLite, FAISS (vector DB), Sentence Transformers
- **LLM:** OpenAI API (GPT-4o), can use Calude as well.

---

## 🛠️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sap156/RAGflow.git
cd RAGflow
```

---

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 3. Install Backend Dependencies

You must have Python 3.9+ installed.

```bash
cd ../backend
python -m venv venv
source venv/bin/activate      # For Mac/Linux
# .\venv\Scripts\activate     # For Windows

pip install -r requirements.txt
```

---

### 4. Set up the `.env` File

Create a file called `.env` in the `backend` directory:

```
OPENAI_API_KEY=sk-xxxxxxyourapikeyxxxxx
```

> 🔑 Your OpenAI API key is required for answering questions.

---

### 5. Run the Backend Server

```bash
from the root folder
export FLASK_APP=backend/app.py
export FLASK_ENV=development
flask run --host=localhost --port=5050
```

Runs the Flask server on `http://localhost:5050`.

---

### 6. Run the Frontend App

```bash
cd frontend
npm run dev
```

Launches the React app on `http://localhost:8080`.

![RAGflow Home](/public/landing.png)

---

## 🧪 Try It Out

1. Upload a document.
2. Ask a question like: “What is this document about?”
3. Watch the **RAG Flow** in action.
4. View your **question history** and **clear it anytime**.

---

## 🧼 Optional: Reset Vector Index & DB

If you want a clean slate, delete the contents of the `/backend/data` folder.

---

## 🌐 Deployment (Optional)

You can deploy the app using platforms like:

- **Frontend:** Vercel, Netlify, or GitHub Pages
- **Backend:** Render, Railway, or your own VPS

---

## ✨ Future Ideas

- Fine-tuned document tagging
- Integration with Claude or Mistral
- Drag-and-drop multi-file upload
- Chat history export

---

## 🙏 Acknowledgements

- OpenAI for LLMs
- HuggingFace Transformers & Sentence Transformers
- FAISS for blazing fast vector search
