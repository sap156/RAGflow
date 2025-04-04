
import React from "react";
import { RAGFlow } from "@/components/RAGFlow";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Cpu, Bot } from "lucide-react";

const RAGDemo = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        
        <main className="flex-1 pt-16 pb-12">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center my-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Understanding RAG Systems
              </h1>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                See how Retrieval-Augmented Generation works behind the scenes to provide accurate answers from your documents.
              </p>
            </motion.div>
            
            <Tabs defaultValue="demo" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="demo">Demo</TabsTrigger>
                <TabsTrigger value="info">
                  <Info className="h-4 w-4 mr-2" />
                  Info
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="demo" className="mt-0">
                <div className="w-full overflow-auto" style={{ maxWidth: '100%' }}>
                  <div className="min-w-[1200px] mx-auto">
                    <RAGFlow autoPlay={true} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="info" className="mt-0">
                <div className="max-w-4xl mx-auto">
                  <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Why RAG Matters</h2>
                    <p className="text-muted-foreground mb-8 text-center text-lg">
                      RAG systems combine the knowledge from your documents with the intelligence of large language models. 
                      This gives you the best of both worlds: accurate, contextual answers based on your specific content.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-accent/30 p-6 rounded-lg">
                        <h3 className="font-medium mb-2 text-center">Benefits</h3>
                        <ul className="space-y-2 text-sm text-center">
                          <li>• Answers grounded in your actual documents</li>
                          <li>• Reduced hallucinations and fabricated information</li>
                          <li>• Citations to verify information sources</li>
                          <li>• Up-to-date knowledge not limited to LLM training data</li>
                        </ul>
                      </div>
                      <div className="bg-accent/30 p-6 rounded-lg">
                        <h3 className="font-medium mb-2 text-center">Applications</h3>
                        <ul className="space-y-2 text-sm text-center">
                          <li>• Company knowledge bases and documentation</li>
                          <li>• Legal and compliance document search</li>
                          <li>• Research paper and academic assistance</li>
                          <li>• Technical support and troubleshooting</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                  
                  <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-center">LLMs vs RAG: What's the Difference?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                      <div className="bg-background border border-border/60 p-6 rounded-lg shadow-sm">
                        <div className="flex justify-center mb-4">
                          <Bot className="h-12 w-12 text-primary/80" />
                        </div>
                        <h3 className="text-xl font-medium mb-4 text-center">Regular LLMs</h3>
                        <p className="text-muted-foreground mb-4">
                          Think of a regular LLM (like ChatGPT) as a super-smart student who studied tons of books and websites up until a specific date. They're really good at:
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>• Answering general knowledge questions</li>
                          <li>• Writing creative content</li>
                          <li>• Explaining concepts they learned about</li>
                          <li>• Making educated guesses based on what they've seen</li>
                        </ul>
                        <div className="mt-4 p-3 bg-destructive/10 rounded text-sm">
                          <p><strong>Limitations:</strong> They can't access new information beyond what they were trained on, and they might make up answers when they're unsure (this is called "hallucination").</p>
                        </div>
                      </div>
                      
                      <div className="bg-background border border-border/60 p-6 rounded-lg shadow-sm">
                        <div className="flex justify-center mb-4">
                          <Cpu className="h-12 w-12 text-primary/80" />
                        </div>
                        <h3 className="text-xl font-medium mb-4 text-center">RAG Systems</h3>
                        <p className="text-muted-foreground mb-4">
                          A RAG system is like giving that same smart student your personal library of books and documents to reference. Now they can:
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>• Look up exact information in your documents</li>
                          <li>• Reference specific pages and quotes</li>
                          <li>• Answer questions about your personal files</li>
                          <li>• Combine their general knowledge with your specific information</li>
                        </ul>
                        <div className="mt-4 p-3 bg-primary/10 rounded text-sm">
                          <p><strong>Advantages:</strong> RAG provides up-to-date, specific information from your documents and can tell you exactly where it found each piece of information.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-6 rounded-lg mt-8">
                      <h3 className="text-lg font-medium mb-3 text-center">How RAG Works (In Simple Terms)</h3>
                      <ol className="space-y-4 max-w-3xl mx-auto">
                        <li className="flex gap-3">
                          <span className="font-bold">1.</span>
                          <span>When you upload documents, the system breaks them into small chunks and converts each chunk into a special code (vector) that captures its meaning.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-bold">2.</span>
                          <span>When you ask a question, your question is also converted into the same type of code (vector).</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-bold">3.</span>
                          <span>The system finds document chunks with codes similar to your question's code - these are likely relevant to your question.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-bold">4.</span>
                          <span>These relevant chunks are sent to the AI along with your question.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-bold">5.</span>
                          <span>The AI uses this information to create an answer based on your actual documents, not just what it was originally trained on.</span>
                        </li>
                      </ol>
                    </div>
                  </section>
                  
                  <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Real-World Examples</h2>
                    <div className="space-y-6 max-w-3xl mx-auto">
                      <div className="border border-border/60 rounded-lg p-5">
                        <h3 className="font-medium mb-2">Student Research</h3>
                        <p className="text-muted-foreground text-sm">
                          Imagine you're working on a school project about climate change. With regular AI, you might get general information that could be outdated. With RAG, you could upload recent research papers and get the latest findings, with citations to exactly where each fact came from.
                        </p>
                      </div>
                      
                      <div className="border border-border/60 rounded-lg p-5">
                        <h3 className="font-medium mb-2">Company Help Desk</h3>
                        <p className="text-muted-foreground text-sm">
                          A company can upload their product manuals, help guides, and frequently asked questions. Now when employees or customers ask questions, they get accurate answers based on the company's actual documentation, not general information that might be wrong for their specific products.
                        </p>
                      </div>
                      
                      <div className="border border-border/60 rounded-lg p-5">
                        <h3 className="font-medium mb-2">Personal Knowledge Assistant</h3>
                        <p className="text-muted-foreground text-sm">
                          Upload your class notes, books you're reading, or articles you've saved. Now you can ask questions about this content and get answers based on your personal knowledge collection, helping you remember and understand the information better.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RAGDemo;
