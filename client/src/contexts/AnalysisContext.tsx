import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface AnalysisContextType {
  analysisResult: DocumentAnalysis | null;
  setAnalysisResult: (result: DocumentAnalysis | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  clearAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const clearAnalysis = () => {
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysisResult,
        setAnalysisResult,
        isAnalyzing,
        setIsAnalyzing,
        clearAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
