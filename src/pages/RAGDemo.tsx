
import React from "react";
import { RAGFlow } from "@/components/RAGFlow";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";

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
            
            <div className="w-full overflow-auto" style={{ maxWidth: '100%' }}>
              <div className="min-w-[1200px] mx-auto">
                <RAGFlow autoPlay={true} />
              </div>
            </div>
            
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-center">Why RAG Matters</h2>
              <p className="text-muted-foreground mb-4 text-center">
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
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RAGDemo;
