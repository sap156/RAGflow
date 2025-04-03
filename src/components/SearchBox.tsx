
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  loading: boolean;
  disabled?: boolean;
}

export const SearchBox = ({ onSearch, loading, disabled = false }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading && !disabled) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center max-w-3xl mx-auto">
          <div className="absolute left-3 text-gray-400">
            <Search size={18} />
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your documents..."
            className="pl-10 pr-24 py-6 text-base shadow-md focus-visible:ring-2 focus-visible:ring-primary"
            disabled={loading || disabled}
          />
          <div className="absolute right-1">
            <Button 
              type="submit" 
              disabled={!query.trim() || loading || disabled}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking
                </>
              ) : (
                "Ask"
              )}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};
