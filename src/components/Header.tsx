
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Info, Home } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SidebarTrigger />
          <Link to="/" className="text-xl font-semibold tracking-tight">RAGflow</Link>
        </motion.div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link 
                to="/"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === "/" 
                    ? "text-primary font-semibold"
                    : "text-foreground/70"
                )}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                to="/info"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === "/info" 
                    ? "text-primary font-semibold"
                    : "text-foreground/70"
                )}
              >
                <Info className="w-4 h-4 mr-2" />
                Info
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
