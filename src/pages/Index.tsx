
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
        <Sidebar>
          <SidebarContent>
            <History onSelectQuestion={handleSearch} />
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 pt-16 pb-12">
          <Header />
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8 md:mb-12"
              >
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ask anything about your documents
                </h1>
                <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                  Get instant, accurate answers powered by your own content. Ask questions in natural language and get comprehensive responses.
                </p>
              </motion.div>

              <div className="w-full max-w-3xl mx-auto">
                <SearchBox onSearch={handleSearch} loading={loading} />
                
                <AnswerCard answer={answer} />
                
                {!answer && !loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-12 text-center text-muted-foreground"
                  >
                    <p>Ask a question to get started</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
