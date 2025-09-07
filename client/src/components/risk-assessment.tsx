import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

interface RiskItem {
  level: "high" | "medium" | "low";
  title: string;
  description: string;
  section?: string;
}

interface RiskAssessmentProps {
  riskItems: RiskItem[];
  riskLevel: "high" | "medium" | "low";
}

export default function RiskAssessment({ riskItems, riskLevel }: RiskAssessmentProps) {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="w-3 h-3" />;
      case "medium":
        return <AlertCircle className="w-3 h-3" />;
      case "low":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getRiskColors = (level: string) => {
    switch (level) {
      case "high":
        return {
          bg: "bg-danger/15",
          border: "border-danger/30", 
          indicator: "bg-danger",
          text: "text-danger-foreground"
        };
      case "medium":
        return {
          bg: "bg-warning/15",
          border: "border-warning/30",
          indicator: "bg-warning", 
          text: "text-warning-foreground"
        };
      case "low":
        return {
          bg: "bg-success/15",
          border: "border-success/30",
          indicator: "bg-success",
          text: "text-success-foreground"
        };
      default:
        return {
          bg: "bg-muted/15",
          border: "border-muted/30",
          indicator: "bg-muted",
          text: "text-muted-foreground"
        };
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case "high":
        return "High Risk";
      case "medium": 
        return "Caution";
      case "low":
        return "Advantage";
      default:
        return "Note";
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 analysis-card" data-testid="card-risk-assessment">
      <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-risk-assessment-title">
        Risk Assessment
      </h3>
      <div className="space-y-4">
        {riskItems && riskItems.length > 0 ? (
          riskItems.map((item: RiskItem, index: number) => {
            const colors = getRiskColors(item.level);
            const riskLabel = getRiskLabel(item.level);
            
            return (
              <div 
                key={index} 
                className={`flex items-start space-x-3 p-4 ${colors.bg} border ${colors.border} rounded-lg risk-indicator`}
                data-testid={`risk-item-${index}`}
              >
                <div className={`w-3 h-3 ${colors.indicator} rounded-full mt-1.5 flex-shrink-0`}></div>
                <div className="flex-1">
                  <h4 className={`font-medium ${colors.text} mb-2`} data-testid={`text-risk-title-${index}`}>
                    {riskLabel}: {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2" data-testid={`text-risk-description-${index}`}>
                    {item.description}
                  </p>
                  {item.section && (
                    <p className="text-xs text-muted-foreground" data-testid={`text-risk-section-${index}`}>
                      Section: {item.section}
                    </p>
                  )}
                  <button className={`text-xs ${colors.text} hover:underline mt-2`} data-testid={`button-risk-details-${index}`}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8" data-testid="section-no-risks">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2" data-testid="text-no-risks-title">
              No Significant Risks Identified
            </h4>
            <p className="text-sm text-muted-foreground" data-testid="text-no-risks-description">
              Our analysis didn't identify any major risk factors in this document.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}