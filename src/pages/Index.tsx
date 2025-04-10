
import { useState } from "react";
import { askQuestion } from "../services/api";
import { Answer } from "../types/rag";
import { useToast } from "@/components/ui/use-toast";
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { AnswerCard } from "@/components/AnswerCard";
import { History } from "@/components/History";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { Linkedin, Mail, Github, ExternalLink } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { SearchBox } from "@/components/SearchBox";
import { RAGFlow, FlowStep } from "@/components/RAGFlow";

import {
  MessageSquare, Cpu, Database, FileText,
  Search, ArrowRight, Bot
} from "lucide-react";

const getIconForStep = (step: string) => {
  const map: Record<string, any> = {
    "User Question": MessageSquare,
    "Embed Question → Vector": Cpu,
    "Search Vector DB": Database,
    "Retrieve Contexts": FileText,
    "Build Prompt": Search,
    "Send to LLM": ArrowRight,
    "LLM Generates Answer": Bot,
    "Show Answer": MessageSquare,
  };
  return map[step] || MessageSquare;
};


const Index = () => {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [steps, setSteps] = useState<FlowStep[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [ragFlowComplete, setRagFlowComplete] = useState(false);


  const handleSearch = async (query: string) => {
    setLoading(true);
    setQuestion(query);
    setSteps([]);
    setAnswer(null);
  
    try {
      const response = await askQuestion(query);
      setAnswer(response);
  
      const stepDescriptions: Record<string, string> = {
        "User Question": "User submitted a question to the system.",
        "Embed Question → Vector": "Question converted to vector embedding.",
        "Search Vector DB": "Similar documents found using vector search.",
        "Retrieve Contexts": "Top text chunks retrieved from database.",
        "Build Prompt": "Question and context combined to form prompt.",
        "Send to LLM": "Prompt sent to language model.",
        "LLM Generates Answer": "LLM generated a contextual answer.",
        "Show Answer": "Answer shown with source citations."
      };
      
      const mappedSteps: FlowStep[] = response.steps.map((step: any, i: number) => ({
        id: i,
        title: step.step,
        description: stepDescriptions[step.step] || step.step,
        icon: getIconForStep(step.step),
        sampleData: step.value,
      }));
  
      setSteps(mappedSteps);
    } catch (error) {
      console.error("Error getting answer:", error);
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <History onSelectQuestion={handleSearch} />
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 pt-16 pb-12">
          <Header />
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center py-12 md:py-16 lg:py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8 md:mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600">
                  RAGflow
                </h1>

                {/* Tagline */}
                <p className="text-sm md:text-base font-medium text-muted-foreground mb-4">
                  Ask Smart. See Smarter.
                </p>

                {/* Force subtext to stay on one line */}
                <p className="text-muted-foreground md:text-lg mx-auto text-center whitespace-nowrap max-w-full">
                  Upload documents and get instant answers — Watch how RAG works under the hood.
                </p>
              </motion.div>

              <div className="w-full max-w-3xl mx-auto">
                {/* File Upload Component */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <FileUpload />
                </motion.div>
                
                {/* Search Box */}
                <SearchBox onSearch={handleSearch} loading={loading} />
                <p className="text-center text-muted-foreground mt-4">
           Don't just ask a question — watch RAGflow bring the answer to life.
         </p>
                

                {/* RAG Flow Section */}
              <motion.div
              
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full mt-16 pt-8 border-t border-border/40 container-full-width"
              >
                <div className="w-full overflow-x-auto" style={{ maxWidth: '100vw', paddingLeft: '0', paddingRight: '0' }}>
                  <RAGFlow 
                    autoPlay={!!steps.length} 
                    questionText={question} 
                    initialActiveStep={0} 
                    stepDelay={1800} 
                    key={question} 
                    stepsOverride={steps.map(step => ({ step: step.title, value: step.sampleData }))}
                    onComplete={() => setRagFlowComplete(true)}
                  />
                </div>
                
              </motion.div>
                
                {/* Answer Card */}
                {ragFlowComplete && <AnswerCard answer={answer} />}

                
                {!answer && !loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-12 text-center text-foreground"
                  >
                    
                  </motion.div>
                )}
              </div>
              
              
              
              {/* Footer */}
              <motion.footer 
                className="mt-20 pt-8 border-t border-border/40 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-4 text-foreground text-center">Connect With Me</h2>
                  <div className="flex flex-wrap justify-center gap-4 mb-6 text-center">
                    <a 
                      href="https://www.linkedin.com/in/abhinavneni/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="mailto:neni.abhinav@gmail.com" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>Email</span>
                    </a>
                    <a 
                      href="https://github.com/sap156" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://saiparvathaneni.medium.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Medium Blog</span>
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    © {new Date().getFullYear()} Created by Sai Abhinav Parvathaneni
                  </p>
                </div>
              </motion.footer>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
