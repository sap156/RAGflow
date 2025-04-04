
// backend URL
const BASE_URL = "http://localhost:5050"; // update if needed

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  return res.json(); // { message, chunks }
};

export const askQuestion = async (question: string) => {
  const res = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error("Failed to get answer");
  }

  return res.json(); // { answer, sources, steps }
};

export const getHistory = async () => {
  const res = await fetch("http://localhost:5050/history");
  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }
  return res.json(); // You can format this on the backend too
};

export const getAnswer = async (question: string) => {
  const response = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  const data = await response.json();
  console.log("RAG response:", data); // 👈 See if steps have value

  if (!response.ok) {
    throw new Error(data.error || "Failed to get answer");
  }

  return data;
};
