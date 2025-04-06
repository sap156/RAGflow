
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare, Search, Database, FileText,
  Cpu, Bot, ArrowRight, Play, RefreshCw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export interface FlowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  sampleData: string;
}

export interface RAGFlowProps {
  initialActiveStep?: number;
  autoPlay?: boolean;
  stepDelay?: number;
  questionText?: string;
  stepsOverride?: { step: string; value: string }[];
  onFlowComplete?: () => void;
}

export const RAGFlow: React.FC<RAGFlowProps> = ({
  initialActiveStep = 0,
  autoPlay = true,
  stepDelay = 2000,
  questionText = "How does tokenization affect RAG systems?",
  stepsOverride = [],
  onFlowComplete,
}) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  
  // Define stepMap before using it
  const stepMap: Record<string, { title: string; description: string; icon: React.ElementType }> = {
    "User Question": {
      title: "User Question",
      description: "The user asks a question about their documents",
      icon: MessageSquare,
    },
    "Embed Question → Vector": {
      title: "Embed Question",
      description: "Convert question to a vector embedding",
      icon: Cpu,
    },
    "Search Vector DB": {
      title: "Search Vector DB",
      description: "Find similar vectors in the database",
      icon: Database,
    },
    "Retrieve Contexts": {
      title: "Retrieve Contexts",
      description: "Get the most relevant text chunks",
      icon: FileText,
    },
    "Build Prompt": {
      title: "Build Prompt",
      description: "Combine retrieved context with user question",
      icon: Search,
    },
    "Send to LLM": {
      title: "Send to LLM",
      description: "Pass the enhanced prompt to AI model",
      icon: ArrowRight,
    },
    "LLM Generates Answer": {
      title: "Generate Answer",
      description: "LLM creates response using context",
      icon: Bot,
    },
    "Show Answer": {
      title: "Show Answer",
      description: "Present answer with source citations to user",
      icon: MessageSquare,
    },
  };

  // Define steps after stepMap
  const steps: FlowStep[] = stepsOverride.length > 0
    ? stepsOverride.map((step, idx) => {
        const meta = stepMap[step.step] || {
          title: step.step,
          description: "",
          icon: MessageSquare,
        };
        return {
          id: idx,
          title: meta.title,
          description: meta.description,
          icon: meta.icon,
          sampleData: step.value,
        };
      })
    : [
        {
          id: 0,
          title: "User Question",
          description: "The user asks a question about their documents",
          icon: MessageSquare,
          sampleData: `"${questionText}"`,
        },
        {
          id: 1,
          title: "Embed Question",
          description: "Convert question to a vector embedding",
          icon: Cpu,
          sampleData: "[0.12, -0.33, 0.41, 0.09, ...]",
        },
        {
          id: 2,
          title: "Search Vector DB",
          description: "Find similar vectors in the database",
          icon: Database,
          sampleData: "Similarity search: cosine(question_vector, db_vectors)",
        },
        {
          id: 3,
          title: "Retrieve Contexts",
          description: "Get the most relevant text chunks",
          icon: FileText,
          sampleData: '"Tokenization divides text into units called tokens..."',
        },
        {
          id: 4,
          title: "Build Prompt",
          description: "Combine retrieved context with user question",
          icon: Search,
          sampleData: "CONTEXT: [retrieved text] \nQUESTION: How does tokenization affect RAG systems?",
        },
        {
          id: 5,
          title: "Send to LLM",
          description: "Pass the enhanced prompt to AI model",
          icon: ArrowRight,
          sampleData: "API request to GPT/Claude with context-enriched prompt",
        },
        {
          id: 6,
          title: "Generate Answer",
          description: "LLM creates response using context",
          icon: Bot,
          sampleData: "Tokenization in RAG affects retrieval quality by...",
        },
        {
          id: 7,
          title: "Show Answer",
          description: "Present answer with source citations to user",
          icon: MessageSquare,
          sampleData: "Answer displayed with references to source documents",
        },
      ];

  useEffect(() => {
    if (autoPlay && stepsOverride.length > 0) {
      setIsPlaying(true);
      setActiveStep(0);
    }
  }, [autoPlay, stepsOverride]);

  useEffect(() => {
    if (activeStep === steps.length - 1 && !isPlaying && onFlowComplete && steps.length > 0) {
      onFlowComplete();
    }
  }, [activeStep, isPlaying, steps.length, onFlowComplete]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setActiveStep((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, stepDelay);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, steps.length, stepDelay]);

  useEffect(() => {
    const progressValue = ((activeStep + 1) / steps.length) * 100;
    setProgress(progressValue);
  }, [activeStep, steps.length]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const activeCard = scrollContainer?.querySelector(`[data-step="${activeStep}"]`) as HTMLElement;

    if (scrollContainer && activeCard) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      const scrollLeft =
        scrollContainer.scrollLeft +
        (cardRect.left - containerRect.left - containerRect.width / 2 + cardRect.width / 2);

      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeStep]);

  const handlePlay = () => {
    if (activeStep === steps.length - 1) {
      setActiveStep(0);
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
  };

  return (
    <div className="w-full">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-center">
        Watch the RAGflow in Action
        </h2>
        <p className="text-muted-foreground text-center">
        Experience how Retrieval-Augmented Generation works behind the scenes — step by step.
        </p>
  
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            onClick={isPlaying ? handlePause : handlePlay}
            variant="outline"
            className="gap-2"
          >
            {isPlaying ? "Pause" : activeStep === steps.length - 1 ? "Restart" : "Play"}
            {isPlaying ? null : <Play className="h-4 w-4" />}
          </Button>
  
          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            disabled={activeStep === 0}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
  
        <div className="w-full max-w-xl px-0 mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>
  
      {/* Scroll container with auto-scroll behavior */}
      <div
        className="w-full overflow-x-auto pb-6"
        style={{ scrollbarWidth: "thin" }}
        ref={scrollContainerRef}
      >
        <div
          className="flex flex-nowrap gap-4 min-w-max mx-auto justify-start pl-6 pr-6"
          style={{ minWidth: "max-content", paddingTop: "40px", paddingBottom: "40px" }}
        >
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;
  
            return (
              <React.Fragment key={step.id}>
                <motion.div
                  data-step={index}
                  initial={{ opacity: 0.7, y: 20 }}
                  animate={{
                    opacity: isActive ? 1 : isPast ? 0.9 : 0.7,
                    y: isActive ? 0 : isPast ? 10 : 20,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                  style={{ marginTop: isActive ? "0px" : "20px" }}
                >
                  <Card
                    className={`w-72 h-[340px] ${
                      isActive
                        ? "ring-2 ring-primary shadow-lg bg-background"
                        : "bg-background"
                    }`}
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-center mb-4">
                        <div
                          className={`rounded-full p-2 ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : isPast
                              ? "bg-muted text-muted-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Step {index + 1}
                        </span>
                      </div>
  
                      <h3 className="font-semibold mb-1 text-center">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        {step.description}
                      </p>
  
                      <Separator className="my-2" />
  
                      <div className="bg-muted rounded-md p-2 mt-auto">
                        <p className="text-xs font-mono line-clamp-6 overflow-hidden text-ellipsis">
                          {step.sampleData}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
  
                {index < steps.length - 1 && (
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.5,
                        scale: isActive ? 1.1 : 1,
                      }}
                    >
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
