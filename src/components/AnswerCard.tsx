
import { Answer, Source } from "../types/rag";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { File, Link, ThumbsDown, ThumbsUp } from "lucide-react";

interface AnswerCardProps {
  answer: Answer | null;
}

export const AnswerCard = ({ answer }: AnswerCardProps) => {
  if (!answer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card shadow-lg border-0 overflow-hidden mt-6">
        <CardContent className="p-6">
          <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none text-balance">
            {answer.answer.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
            <div className="text-sm text-muted-foreground">
              Was this response helpful?
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex gap-1">
                <ThumbsUp size={14} />
                Yes
              </Button>
              <Button variant="outline" size="sm" className="flex gap-1">
                <ThumbsDown size={14} />
                No
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {answer.sources && answer.sources.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Sources ({answer.sources.length})</h3>
          <div className="space-y-3">
            {answer.sources.map((source, index) => (
              <SourceCard key={index} source={source} index={index} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const SourceCard = ({ source, index }: { source: Source; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-md text-primary">
              <File size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{source.title || "Document source"}</h4>
              <div className="text-sm text-muted-foreground mt-1 text-ellipsis overflow-hidden line-clamp-2">
                {source.content}
              </div>
              {source.source && (
                <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                  <Link size={12} />
                  <span className="truncate">{source.source}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
