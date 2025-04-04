# backend/rag/generator.py

import os
import openai
from dotenv import load_dotenv
load_dotenv()

# Load API key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_answer(context_chunks, question):
    context = "\n\n".join([chunk["chunk"] for chunk in context_chunks])
    full_prompt = f"""Use ONLY the context below to answer the question as clearly as possible.

Context:
{context}

Question: {question}"""

    response = openai.ChatCompletion.create(
        model="gpt-4o",  
        messages=[
            {"role": "system", "content": "You're a helpful assistant."},
            {"role": "user", "content": full_prompt}
        ],
        temperature=0.3,
        max_tokens=1024
    )

    return response.choices[0].message["content"]
