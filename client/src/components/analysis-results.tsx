import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import RiskAssessment from "./risk-assessment";
import QAChat from "./qa-chat";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface AnalysisData {
  document: {
    id: string;
    filename?: string;
    content: string;
    documentType?: string;
  };
  analysis: {
    id: string;
    summary: any;
    riskLevel: "high" | "medium" | "low";
    keyTerms: any;
    riskItems: any[];
    clauses: any[];
    recommendations: any[];
    wordCount: number;
    processingTime: string;
  };
}

interface AnalysisResultsProps {
  analysisData: AnalysisData;
}

export default function AnalysisResults({ analysisData }: AnalysisResultsProps) {
  const { t } = useTranslation();
  const { document, analysis } = analysisData;
  const [expandedClauses, setExpandedClauses] = useState<Set<number>>(new Set());

  const toggleClause = (index: number) => {
    const newExpanded = new Set(expandedClauses);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedClauses(newExpanded);
  };

  // Handle both string and object summary formats
  const summaryText = typeof analysis.summary === 'object' ? analysis.summary.summary : analysis.summary;
  // Only use keyTerms from summary if available, otherwise fallback to analysis.keyTerms
  const summaryKeyTerms = (typeof analysis.summary === 'object' && analysis.summary.keyTerms)
    ? analysis.summary.keyTerms
    : analysis.keyTerms;
  const documentTypeDisplay = (typeof analysis.summary === 'object' ? analysis.summary.documentType : null) || 
                              document.documentType || "Legal Document";

  return (
    <div className="space-y-6">
      {/* Document Summary */}
      <div className="bg-card rounded-lg border border-border p-6 analysis-card" data-testid="card-document-summary">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground" data-testid="text-summary-title">Document Summary</h3>
          <Badge variant="secondary" data-testid="badge-document-type">
            {documentTypeDisplay}
          </Badge>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground mb-4" data-testid="text-summary-content">
            {summaryText}
          </p>
          {summaryKeyTerms && Object.keys(summaryKeyTerms).length > 0 && (
            <div className="bg-accent/50 p-4 rounded-md" data-testid="section-key-terms">
              <h4 className="font-medium text-foreground mb-2" data-testid="text-key-terms-title">Key Parties & Terms</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {Object.entries(summaryKeyTerms).map(([key, value]) => {
                  if (!value) return null;
                  return (
                    <li key={key} data-testid={`text-key-term-${key}`}>
                      • {key.charAt(0).toUpperCase() + key.slice(1)}: {String(value)}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Risk Assessment */}
      <RiskAssessment riskItems={analysis.riskItems} riskLevel={analysis.riskLevel} />

      {/* Key Clauses Analysis */}
      <div className="bg-card rounded-lg border border-border p-6 analysis-card" data-testid="card-clauses-analysis">
        <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-clauses-title">
          Key Clauses Breakdown
        </h3>
        <div className="space-y-4">
          {analysis.clauses && analysis.clauses.length > 0 ? (
            analysis.clauses.map((clause: any, index: number) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden" data-testid={`clause-item-${index}`}>
                <button
                  className="w-full p-4 text-left bg-muted hover:bg-muted/80 transition-colors flex justify-between items-center"
                  onClick={() => toggleClause(index)}
                  data-testid={`button-toggle-clause-${index}`}
                >
                  <span className="font-medium text-foreground" data-testid={`text-clause-title-${index}`}>
                    {clause.title}
                  </span>
                  {expandedClauses.has(index) ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {expandedClauses.has(index) && (
                  <div className="p-4 bg-card border-t border-border" data-testid={`clause-content-${index}`}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Original Text</h5>
                        <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded" data-testid={`text-clause-original-${index}`}>
                          {clause.originalText}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Plain Language</h5>
                        <p className="text-sm text-foreground" data-testid={`text-clause-simplified-${index}`}>
                          {clause.simplifiedText}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4" data-testid="text-no-clauses">
              No specific clauses identified for detailed breakdown.
            </p>
          )}
        </div>
      </div>

      {/* Q&A Section */}
      <QAChat analysisId={analysis.id} documentContent={document.content} />

      {/* Action Recommendations */}
      <div className="bg-card rounded-lg border border-border p-6 analysis-card" data-testid="card-recommendations">
        <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-recommendations-title">
          Recommended Actions
        </h3>
        <div className="space-y-4">
          {analysis.recommendations && analysis.recommendations.length > 0 ? (
            analysis.recommendations.map((rec: any, index: number) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 p-4 bg-accent/30 border border-accent rounded-lg"
                data-testid={`recommendation-item-${index}`}
              >
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-xs text-primary-foreground font-medium" data-testid={`text-rec-priority-${index}`}>
                    {rec.priority || index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-2" data-testid={`text-rec-title-${index}`}>
                    {rec.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3" data-testid={`text-rec-description-${index}`}>
                    {rec.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                      data-testid={`button-rec-learn-more-${index}`}
                    >
                      Learn More
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      data-testid={`button-rec-complete-${index}`}
                    >
                      Mark Complete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4" data-testid="text-no-recommendations">
              No specific recommendations available for this document.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}