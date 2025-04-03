
import { useState } from "react";
import { askQuestion } from "../services/api";
import { Answer } from "../types/rag";
import { useToast } from "@/components/ui/use-toast";
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SearchBox } from "@/components/SearchBox";
import { AnswerCard } from "@/components/AnswerCard";
import { History } from "@/components/History";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { RAGFlow } from "@/components/RAGFlow";
import { Linkedin, Mail, Github, ExternalLink } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import { FileUpload } from "@/components/FileUpload";

const Index = () => {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await askQuestion(query);
      setAnswer(response);
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Matrix Rain Background */}
        <MatrixRain 
          fontSize={16}
          color="#8b5cf6"
          characters="01ABLEORCΛ"
          fadeOpacity={0.12}
          speed={0.8}
        />
        
        <Sidebar>
          <SidebarContent>
            <History onSelectQuestion={handleSearch} />
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 pt-16 pb-12 relative z-10">
          <Header />
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8 md:mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600">
                  Ask the Oracle
                </h1>
                <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                  Upload your documents and get instant, accurate answers powered by wisdom from beyond. 
                  Ask in natural language and receive enlightened responses.
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
                
                {/* Answer Card */}
                <AnswerCard answer={answer} />
                
                {!answer && !loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-12 text-center text-muted-foreground"
                  >
                    <p>Ask the Oracle a question to receive wisdom</p>
                  </motion.div>
                )}
              </div>
              
              {/* RAG Flow Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full mt-16 pt-8 border-t border-border/40"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold mb-2">How The Oracle Works</h2>
                  <p className="text-muted-foreground">
                    This diagram shows how The Oracle uses Retrieval-Augmented Generation to enhance answers with your documents.
                  </p>
                </div>
                <RAGFlow autoPlay={false} />
                
                <div className="mt-16 max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4">Why RAG Matters</h2>
                  <p className="text-muted-foreground mb-4">
                    RAG systems combine the knowledge from your documents with the intelligence of large language models. 
                    This gives you the best of both worlds: accurate, contextual answers based on your specific content.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-accent/30 p-6 rounded-lg backdrop-blur-sm">
                      <h3 className="font-medium mb-2">Benefits</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Answers grounded in your actual documents</li>
                        <li>• Reduced hallucinations and fabricated information</li>
                        <li>• Citations to verify information sources</li>
                        <li>• Up-to-date knowledge not limited to LLM training data</li>
                      </ul>
                    </div>
                    <div className="bg-accent/30 p-6 rounded-lg backdrop-blur-sm">
                      <h3 className="font-medium mb-2">Applications</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Company knowledge bases and documentation</li>
                        <li>• Legal and compliance document search</li>
                        <li>• Research paper and academic assistance</li>
                        <li>• Technical support and troubleshooting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Footer */}
              <motion.footer 
                className="mt-20 pt-8 border-t border-border/40 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-xl font-semibold mb-4 text-foreground">Connect With Me</h2>
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
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
                  <p className="text-sm text-muted-foreground">
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
