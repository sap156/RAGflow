
export interface Question {
  id: string;
  question: string;
  timestamp: string;
}

export interface Source {
  id: string;
  content: string;
  title: string;
  source: string;
}

export interface Answer {
  answer: string;
  sources: Source[];
}

export interface QuestionRequest {
  question: string;
}

export interface ChatSession {
  id: string;
  question: string;
  answer: string;
  sources: Source[];
  timestamp: string;
}
