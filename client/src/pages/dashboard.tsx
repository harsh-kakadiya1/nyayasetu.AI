import { useState } from "react";
import DocumentUpload from "@/components/document-upload";
import AnalysisResults from "@/components/analysis-results";
import LoadingAnalysis from "@/components/loading-analysis";
import { FileText } from "lucide-react";

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

export default function Dashboard() {
	const [analysisResult, setAnalysisResult] = useState<DocumentAnalysis | null>(null);
	const [isAnalyzing, setIsAnalyzing] = useState(false);

	const handleAnalysisComplete = (result: DocumentAnalysis) => {
		setAnalysisResult(result);
		setIsAnalyzing(false);
	};

	const handleAnalysisStart = () => {
		setIsAnalyzing(true);
		setAnalysisResult(null);
	};

	const handleAnalysisError = () => {
		setIsAnalyzing(false);
	};

	return (
		<div className="min-h-screen bg-background">
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
					{/* Document Upload Section */}
					<div className="xl:col-span-1 space-y-6">
						<DocumentUpload
							onAnalysisStart={handleAnalysisStart}
							onAnalysisComplete={handleAnalysisComplete}
							onAnalysisError={handleAnalysisError}
							isAnalyzing={isAnalyzing}
						/>

						{/* Quick Stats Card */}
						{analysisResult && (
							<div className="bg-card rounded-lg border border-border p-4 sm:p-6" data-testid="card-quick-stats">
								<h4 className="text-sm font-semibold text-foreground mb-3 sm:mb-4" data-testid="text-stats-title">Analysis Overview</h4>
								<div className="space-y-2 sm:space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-xs sm:text-sm text-muted-foreground">Document Length</span>
										<span className="text-xs sm:text-sm font-medium" data-testid="text-word-count">
											{analysisResult.analysis.wordCount.toLocaleString()} words
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-xs sm:text-sm text-muted-foreground">Key Clauses</span>
										<span className="text-xs sm:text-sm font-medium" data-testid="text-clause-count">
											{analysisResult.analysis.clauses.length} identified
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-xs sm:text-sm text-muted-foreground">Risk Level</span>
										<span 
											className={`text-xs sm:text-sm font-medium ${
												analysisResult.analysis.riskLevel === 'high' 
													? 'text-danger-foreground' 
													: analysisResult.analysis.riskLevel === 'medium'
													? 'text-warning-foreground'
													: 'text-success-foreground'
											}`}
											data-testid="text-risk-level"
										>
											{analysisResult.analysis.riskLevel.charAt(0).toUpperCase() + analysisResult.analysis.riskLevel.slice(1)}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-xs sm:text-sm text-muted-foreground">Processing Time</span>
										<span className="text-xs sm:text-sm font-medium" data-testid="text-processing-time">
											{analysisResult.analysis.processingTime}
										</span>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Analysis Results Section */}
					<div className="xl:col-span-2">
						{isAnalyzing ? (
							<LoadingAnalysis />
						) : analysisResult ? (
							<AnalysisResults analysisData={analysisResult} />
						) : (
							<div className="bg-card rounded-lg border border-border p-8 sm:p-12 text-center analysis-card" data-testid="card-welcome">
								<FileText className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-base sm:text-lg font-semibold text-foreground mb-2" data-testid="text-welcome-title">
									Upload a Document to Get Started
								</h3>
								<p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto" data-testid="text-welcome-description">
									Choose a legal document from your device or paste the text directly. Our AI will analyze it and provide you with clear, actionable insights.
								</p>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
