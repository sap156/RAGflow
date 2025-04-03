
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    uploadFiles(files);
  };
  
  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    
    try {
      // Placeholder for backend integration
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Files uploaded successfully",
        description: `Uploaded ${files.length} document(s)`,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your documents",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="file"
          id="file-upload"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        <Button 
          variant="outline" 
          className="w-full py-6 border-dashed border-2 hover:bg-accent/50 flex items-center justify-center gap-2"
          disabled={uploading}
        >
          <Upload size={18} />
          {uploading ? "Uploading..." : "Upload Documents"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Supported formats: PDF, DOC, DOCX, TXT
      </p>
    </div>
  );
};
