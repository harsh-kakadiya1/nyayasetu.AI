import { useState, useRef } from "react";
import { UploadCloud, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface DocumentUploadProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: any) => void;
  onAnalysisError: () => void;
  isAnalyzing: boolean;
}

export default function DocumentUpload({ 
  onAnalysisStart, 
  onAnalysisComplete, 
  onAnalysisError,
  isAnalyzing 
}: DocumentUploadProps) {
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("auto-detect");
  const [summaryLength, setSummaryLength] = useState("standard");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a DOCX or TXT file. For PDF files, please copy and paste the text directly.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setTextContent(""); // Clear text input when file is selected
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile && !textContent.trim()) {
      toast({
        title: "No document provided",
        description: "Please upload a file or paste document text to analyze.",
        variant: "destructive",
      });
      return;
    }

    onAnalysisStart();

    try {
      let response;

      if (selectedFile) {
        // Handle file upload
        const formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('documentType', documentType);
        formData.append('summaryLength', summaryLength);

        response = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData,
        });
      } else {
        // Handle text analysis
        response = await apiRequest('POST', '/api/documents/analyze-text', {
          content: textContent,
          documentType,
          summaryLength,
        });
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
      }

      const result = await response.json();
      onAnalysisComplete(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your document has been successfully analyzed.",
      });

      // Reset form
      setSelectedFile(null);
      setTextContent("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Analysis error:", error);
      onAnalysisError();
      
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze document. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6" data-testid="card-document-upload">
      <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-upload-title">Upload Document</h3>
      
      {/* File Upload Area */}
      <div 
        className={`document-upload-area rounded-lg p-8 text-center mb-4 cursor-pointer transition-colors ${
          isDragOver ? 'border-primary bg-accent' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        data-testid="area-file-drop"
      >
        <UploadCloud className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        {selectedFile ? (
          <>
            <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-foreground font-medium mb-2" data-testid="text-selected-file">
              {selectedFile.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </>
        ) : (
          <>
            <p className="text-foreground font-medium mb-2" data-testid="text-drop-instruction">Drop your document here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <p className="text-xs text-muted-foreground" data-testid="text-file-requirements">
              Supports DOCX, TXT files up to 10MB (for PDF files, copy and paste text directly)
            </p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".docx,.txt"
          onChange={handleFileInputChange}
          data-testid="input-file-upload"
        />
      </div>

      {/* Text Input Alternative */}
      <div className="border-t border-border pt-4">
        <Label htmlFor="text-input" className="block text-sm font-medium text-foreground mb-2">
          Or paste document text:
        </Label>
        <Textarea
          id="text-input"
          className="w-full h-32 p-3 resize-none"
          placeholder="Paste your legal document text here..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          disabled={!!selectedFile}
          data-testid="textarea-document-content"
        />
        {selectedFile && (
          <p className="text-xs text-muted-foreground mt-1">
            Text input is disabled when a file is selected. Remove the file to use text input.
          </p>
        )}
      </div>

      {/* Analysis Options */}
      <div className="mt-4 space-y-3">
        <div>
          <Label htmlFor="summary-length" className="block text-sm font-medium text-foreground mb-2">
            Summary Length
          </Label>
          <Select value={summaryLength} onValueChange={setSummaryLength}>
            <SelectTrigger data-testid="select-summary-length">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brief">Brief</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="document-type" className="block text-sm font-medium text-foreground mb-2">
            Document Type (Optional)
          </Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger data-testid="select-document-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto-detect">Auto-detect</SelectItem>
              <SelectItem value="rental-agreement">Rental Agreement</SelectItem>
              <SelectItem value="employment-contract">Employment Contract</SelectItem>
              <SelectItem value="service-agreement">Service Agreement</SelectItem>
              <SelectItem value="purchase-agreement">Purchase Agreement</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleAnalyze}
        disabled={isAnalyzing || (!selectedFile && !textContent.trim())}
        data-testid="button-analyze-document"
      >
        {isAnalyzing ? (
          <>
            <div className="loading-spinner mr-2"></div>
            Analyzing Document...
          </>
        ) : (
          "Analyze Document"
        )}
      </Button>
    </div>
  );
}
