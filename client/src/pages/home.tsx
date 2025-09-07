import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { 
  Shield, CheckCircle, Lock, Zap, FileText, Users, 
  Info, AlertTriangle, ArrowRight, Star 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DocumentUpload from "@/components/document-upload";
import AnalysisResults from "@/components/analysis-results";
import LanguageSelector from "@/components/language-selector";

interface DocumentAnalysis {
  document: {
    id: string;
    filename?: string;
    content: string;
    documentType?: string;
  };
  analysis: {
    id: string;
    summary: string;
    riskLevel: "high" | "medium" | "low";
    keyTerms: any;
    riskItems: any[];
    clauses: any[];
    recommendations: any[];
    wordCount: number;
    processingTime: string;
  };
}

export default function Home() {
  const { t } = useTranslation();
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [, setLocation] = useLocation();

  // Handlers
  const handleGetStarted = () => setShowDisclaimer(true);
  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    setLocation("/dashboard");
  };

  const handleAnalysisStart = () => setIsAnalyzing(true);
  const handleAnalysisComplete = (result: DocumentAnalysis) => {
    setIsAnalyzing(false);
    setAnalysisResult(result);
  };
  const handleAnalysisError = () => setIsAnalyzing(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-background py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 mb-6 shadow-sm">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                AI-Powered Legal Assistant
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Welcome to <span className="block text-primary mt-2">NyayaSetu.AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform complex legal documents into clear, actionable insights with our advanced AI technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                size="lg" 
                onClick={handleGetStarted}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="text-sm text-muted-foreground">
                No registration required • Instant analysis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload + Analysis Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <DocumentUpload
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
              isAnalyzing={isAnalyzing}
            />
          </div>
          <div className="lg:col-span-2">
            {isAnalyzing ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <div className="loading-spinner mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('analyzing.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('analyzing.description')}
                </p>
              </div>
            ) : analysisResult ? (
              <AnalysisResults analysisData={analysisResult} />
            ) : (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('welcome.title')}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {t('welcome.description')}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-8 max-w-lg w-full relative shadow-2xl animate-fade-in">
            <button 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors text-2xl font-light" 
              onClick={handleCloseDisclaimer}
            >
              ×
            </button>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Important Disclaimer</h3>
            </div>
            <div className="text-muted-foreground mb-6 text-base leading-relaxed space-y-3">
              <p><strong className="text-foreground">Important:</strong> This tool is for <span className="font-medium text-foreground">informational purposes only</span>.</p>
              <p>Do <span className="font-semibold text-orange-600">not rely solely</span> on its analysis for legal decisions.</p>
              <p>Always consult a <span className="font-medium text-foreground">qualified advocate</span> or <span className="font-medium text-foreground">legal professional</span>.</p>
            </div>
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300" 
              onClick={handleCloseDisclaimer}
            >
              I Understand & Continue
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
