
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SidebarTrigger />
          <h1 className="text-xl font-semibold tracking-tight">💬 Ask Your Docs</h1>
        </motion.div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/rag-demo">RAG Flow</Link>
          </Button>
          <Button variant="ghost" size="sm">About</Button>
          <Button variant="ghost" size="sm">Help</Button>
        </div>
      </div>
    </header>
  );
};
