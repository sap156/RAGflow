
import { Answer, Question, QuestionRequest } from "../types/rag";

// Base API URL - adjust this to your Flask API URL
const API_URL = "http://localhost:5000"; // Change this to your actual API URL

export const askQuestion = async (question: string): Promise<Answer> => {
  try {
    const response = await fetch(`${API_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question } as QuestionRequest),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error asking question:", error);
    throw error;
  }
};

export const getHistory = async (): Promise<Question[]> => {
  try {
    const response = await fetch(`${API_URL}/history`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};
