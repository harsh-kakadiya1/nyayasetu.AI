import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Menu, FileText, History, Settings, ChevronRight } from "lucide-react";
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
      {/* Navigation Header */}
      <header className="bg-card border-b border-border" data-testid="header-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground" data-testid="text-brand-name">{t('brand.name')}</h1>
                <p className="text-sm text-muted-foreground" data-testid="text-brand-tagline">{t('brand.tagline')}</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-dashboard">{t('navigation.dashboard')}</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-history">{t('navigation.history')}</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-settings">{t('navigation.settings')}</a>
            </nav>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-get-started">
                {t('navigation.getStarted')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12" data-testid="section-hero">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-hero-title">
            {t('hero.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-description">
            {t('hero.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Upload Section */}
          <div className="lg:col-span-1">
            <DocumentUpload
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
              isAnalyzing={isAnalyzing}
            />

            {/* Quick Stats Card */}
            {analysisResult && (
              <div className="bg-card rounded-lg border border-border p-6 mt-6" data-testid="card-quick-stats">
                <h4 className="text-sm font-semibold text-foreground mb-4" data-testid="text-stats-title">{t('analysis.overview')}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('analysis.documentLength')}</span>
                    <span className="text-sm font-medium" data-testid="text-word-count">
                      {analysisResult.analysis.wordCount.toLocaleString()} {t('analysis.words')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('analysis.keyClauses')}</span>
                    <span className="text-sm font-medium" data-testid="text-clause-count">
                      {analysisResult.analysis.clauses.length} {t('analysis.identified')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('analysis.riskLevel')}</span>
                    <span 
                      className={`text-sm font-medium ${
                        analysisResult.analysis.riskLevel === 'high' 
                          ? 'text-danger-foreground' 
                          : analysisResult.analysis.riskLevel === 'medium'
                          ? 'text-warning-foreground'
                          : 'text-success-foreground'
                      }`}
                      data-testid="text-risk-level"
                    >
                      {t(`analysis.${analysisResult.analysis.riskLevel}`)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('analysis.processingTime')}</span>
                    <span className="text-sm font-medium" data-testid="text-processing-time">
                      {analysisResult.analysis.processingTime}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results Section */}
          <div className="lg:col-span-2">
            {isAnalyzing ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center analysis-card" data-testid="card-analyzing">
                <div className="loading-spinner mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t('analyzing.title')}</h3>
                <p className="text-muted-foreground">
                  {t('analyzing.description')}
                </p>
              </div>
            ) : analysisResult ? (
              <AnalysisResults analysisData={analysisResult} />
            ) : (
              <div className="bg-card rounded-lg border border-border p-12 text-center analysis-card" data-testid="card-welcome">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-welcome-title">
                  {t('welcome.title')}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto" data-testid="text-welcome-description">
                  {t('welcome.description')}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16" data-testid="footer-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground" data-testid="text-footer-brand">{t('brand.name')}</span>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-footer-description">
                {t('brand.description')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3" data-testid="text-footer-product">{t('footer.product')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-features">{t('footer.features')}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-pricing">{t('footer.pricing')}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-api">{t('footer.api')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3" data-testid="text-footer-resources">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-docs">{t('footer.documentation')}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-guides">{t('footer.guides')}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-support">{t('footer.support')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3" data-testid="text-footer-company">{t('footer.company')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-about">{t('footer.about')}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">{t('footer.terms')}</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
