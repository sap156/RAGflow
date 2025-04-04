import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import { Question } from "../types/rag";
import { motion } from "framer-motion";
import { Clock, Search } from "lucide-react";
import { clearHistory } from "../services/api";

import { format, parseISO } from "date-fns";

interface HistoryProps {
  onSelectQuestion: (question: string) => void;
}

export const History = ({ onSelectQuestion }: HistoryProps) => {
  const [history, setHistory] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getHistory();
        setHistory(data);
        setError(null);
      } catch (err) {
        setError("Failed to load history. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const groupedQuestions = history.reduce((groups: Record<string, Question[]>, question) => {
    const date = new Date(question.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(question);
    return groups;
  }, {});

  const formatTime = (timestamp: string) => {
    try {
      return format(parseISO(timestamp), "h:mm a");
    } catch (e) {
      return "Unknown time";
    }
  };

  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Clock size={18} />
          Recent Questions
        </h2>
        {history.length > 0 && (
    <button
      onClick={async () => {
        try {
          await clearHistory();
          setHistory([]);
        } catch (e) {
          console.error(e);
          setError("Failed to clear history.");
        }
      }}
      className="text-xs text-red-400 hover:text-red-500 transition"
    >
      Clear History
    </button>
  )}
      </div>

      <div className="flex-1 overflow-y-auto sidebar-gradient">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-sidebar-foreground/70">
            <div className="animate-pulse-subtle">Loading history...</div>
          </div>
        ) : error ? (
          <div className="p-4 text-red-400">{error}</div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-sidebar-foreground/70 p-4">
            <Search size={24} className="mb-2 opacity-50" />
            <p className="text-center">No questions yet. Start by asking something!</p>
          </div>
        ) : (
          <div className="p-2">
            {Object.entries(groupedQuestions).map(([date, questions]) => (
              <div key={date} className="mb-4">
                <div className="text-xs font-medium text-sidebar-foreground/70 px-2 py-1">
                  {date}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.05 }}
                  className="space-y-1"
                >
                  {questions.map((q) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="p-2 rounded-md cursor-pointer"
                      onClick={() => onSelectQuestion(q.question)}
                    >
                      <div className="text-sm font-medium truncate">{q.question}</div>
                      <div className="text-xs text-sidebar-foreground/60 flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {formatTime(q.timestamp)}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
