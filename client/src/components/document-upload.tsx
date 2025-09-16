import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { UploadCloud, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { API_ENDPOINTS } from "@/lib/api";

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
  const { t, i18n } = useTranslation();
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
        title: t('upload.fileTooLarge'),
        description: t('upload.fileTooLargeDesc'),
        variant: "destructive",
      });
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: t('upload.invalidFileType'),
        description: t('upload.invalidFileTypeDesc'),
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
        title: t('upload.uploadError'),
        description: t('upload.uploadErrorDesc'),
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

        response = await fetch(API_ENDPOINTS.documents.upload, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept-Language': i18n.language,
          },
        });
      } else {
        // Handle text analysis
        response = await fetch(API_ENDPOINTS.documents.analyzeText, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': i18n.language,
          },
          body: JSON.stringify({
            content: textContent,
            documentType: documentType === 'auto-detect' ? undefined : documentType,
            summaryLength,
            language: i18n.language,
          }),
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
        title: t('upload.analysisError'),
        description: t('upload.analysisErrorDesc'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6" data-testid="card-document-upload">
      <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-upload-title">{t('upload.title')}</h3>
      
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
            <p className="text-foreground font-medium mb-2" data-testid="text-drop-instruction">{t('upload.dragAndDrop')}</p>
            <p className="text-sm text-muted-foreground mb-4">{t('upload.orClickToSelect')}</p>
            <p className="text-xs text-muted-foreground" data-testid="text-file-requirements">
              {t('upload.supportedFormats')} - {t('upload.maxFileSize')}
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
          {t('upload.pasteText')}
        </Label>
        <Textarea
          id="text-input"
          className="w-full h-32 p-3 resize-none"
          placeholder={t('upload.textPlaceholder')}
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
            {t('upload.summaryLength')}
          </Label>
          <Select value={summaryLength} onValueChange={setSummaryLength}>
            <SelectTrigger data-testid="select-summary-length">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brief">{t('upload.brief')}</SelectItem>
              <SelectItem value="standard">{t('upload.standard')}</SelectItem>
              <SelectItem value="detailed">{t('upload.detailed')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="document-type" className="block text-sm font-medium text-foreground mb-2">
            {t('upload.documentType')}
          </Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger data-testid="select-document-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto-detect">{t('upload.autoDetect')}</SelectItem>
              <SelectItem value="rental-agreement">{t('upload.rental')}</SelectItem>
              <SelectItem value="employment-contract">{t('upload.employment')}</SelectItem>
              <SelectItem value="service-agreement">{t('upload.nda')}</SelectItem>
              <SelectItem value="purchase-agreement">{t('upload.terms')}</SelectItem>
              <SelectItem value="other">{t('upload.other')}</SelectItem>
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
            {t('upload.analyzing')}
          </>
        ) : (
          t('upload.analyze')
        )}
      </Button>
    </div>
  );
}
