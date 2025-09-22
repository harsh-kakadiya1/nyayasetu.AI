import { useState } from "react";
import { Shield, CheckCircle, Lock, Zap, FileText, Users, Info, AlertTriangle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { SocialProofIndicators } from "@/components/social-proof";
import { ProgressIndicator } from "@/components/progress-indicator";
import { AnimatedDocumentPreview } from "@/components/animated-document-preview";
import { useAnalysis } from "@/contexts/AnalysisContext";
import AnalysisResults from "@/components/analysis-results";

export default function Home() {
  const { t } = useTranslation();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [location, setLocation] = useLocation();
  const { analysisResult } = useAnalysis();

  const handleGetStarted = () => {
    setShowDisclaimer(true);
  };

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        {/* Analysis Results Section - Show if analysis exists */}
        {analysisResult && (
          <section className="py-8 px-4 sm:px-6 lg:px-8 bg-card/30 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Your Document Analysis</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setLocation("/dashboard")}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  View Full Analysis
                </Button>
              </div>
              <AnalysisResults analysisData={analysisResult} />
            </div>
          </section>
        )}

        {/* Hero Section */}
        <section className="relative bg-background py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 shadow-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm text-muted-foreground">{t('home.hero.badge')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground tracking-tight px-2">
                {t('home.hero.title')}
                <span className="block text-primary mt-1 sm:mt-2">{t('home.hero.subtitle')}</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
                <Button 
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                  size="lg" 
                  onClick={handleGetStarted}
                >
                  {t('home.hero.getStartedButton')}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <div className="text-xs sm:text-sm text-muted-foreground text-center">
                  {t('home.hero.noRegistration')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Indicators */}
        <SocialProofIndicators />

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-card/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
              <div className="space-y-1 sm:space-y-2 animate-counter-up">
                <div className="text-2xl sm:text-3xl font-bold text-primary">500+</div>
                <div className="text-xs sm:text-sm text-muted-foreground px-1">{t('home.stats.documentsAnalyzed')}</div>
              </div>
              <div className="space-y-1 sm:space-y-2 animate-counter-up [animation-delay:200ms]">
                <div className="text-2xl sm:text-3xl font-bold text-primary">95%</div>
                <div className="text-xs sm:text-sm text-muted-foreground px-1">{t('home.stats.accuracyRate')}</div>
              </div>
              <div className="space-y-1 sm:space-y-2 animate-counter-up [animation-delay:400ms]">
                <div className="text-2xl sm:text-3xl font-bold text-primary">30s</div>
                <div className="text-xs sm:text-sm text-muted-foreground px-1">{t('home.stats.averageAnalysis')}</div>
              </div>
              <div className="space-y-1 sm:space-y-2 animate-counter-up [animation-delay:600ms]">
                <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
                <div className="text-xs sm:text-sm text-muted-foreground px-1">{t('home.stats.available')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground px-2">{t('home.features.title')}</h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                {t('home.features.subtitle')}
              </p>
            </div>

            {/* Interactive Demo Section */}
            <div className="mb-12 sm:mb-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">See How It Works</h3>
                <p className="text-muted-foreground">Experience our AI-powered document analysis process</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <ProgressIndicator currentStep={2} isProcessing={true} />
                </div>
                <div className="order-1 lg:order-2">
                  <AnimatedDocumentPreview />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="group bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-glow">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-2 sm:mb-3">{t('home.features.instantSummaries.title')}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t('home.features.instantSummaries.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in [animation-delay:200ms]">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-glow">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-2 sm:mb-3">{t('home.features.riskAnalysis.title')}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t('home.features.riskAnalysis.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in [animation-delay:400ms]">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-glow">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-2 sm:mb-3">{t('home.features.clauseBreakdown.title')}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t('home.features.clauseBreakdown.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in [animation-delay:600ms]">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-glow">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-2 sm:mb-3">{t('home.features.accessible.title')}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t('home.features.accessible.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-card/30 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t('home.benefits.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('home.benefits.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{t('home.benefits.saveTime.title')}</h3>
                    <p className="text-muted-foreground">{t('home.benefits.saveTime.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{t('home.benefits.understandSigning.title')}</h3>
                    <p className="text-muted-foreground">{t('home.benefits.understandSigning.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{t('home.benefits.spotRisks.title')}</h3>
                    <p className="text-muted-foreground">{t('home.benefits.spotRisks.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{t('home.benefits.actionableInsights.title')}</h3>
                    <p className="text-muted-foreground">{t('home.benefits.actionableInsights.description')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{t('home.benefits.readyToStart.title')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t('home.benefits.readyToStart.description')}
                  </p>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300" 
                    onClick={handleGetStarted}
                  >
                    {t('home.benefits.readyToStart.button')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Privacy Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t('home.security.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('home.security.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-3">{t('home.security.dataSafe.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('home.security.dataSafe.description')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-3">{t('home.security.privacyFirst.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('home.security.privacyFirst.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Popup */}
        {showDisclaimer && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fade-in">
              <button 
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors text-xl sm:text-2xl font-light" 
                onClick={handleCloseDisclaimer}
              >
                ×
              </button>
              <div className="flex items-start sm:items-center mb-4 sm:mb-6 pr-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1 sm:mt-0">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-tight">{t('home.disclaimer.title')}</h3>
              </div>
              <div className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  <strong className="text-foreground">{t('home.disclaimer.important')}</strong> {t('home.disclaimer.informational')}
                </p>
                <p>
                  {t('home.disclaimer.notRely')}
                </p>
                <p>
                  {t('home.disclaimer.consultAdvocate')}
                </p>
              </div>
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base sm:text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300" 
                onClick={handleCloseDisclaimer}
              >
                {t('home.disclaimer.button')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-card/50 border-t border-border mt-0" data-testid="footer-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-foreground" data-testid="text-footer-brand">{t('home.footer.brand.name')}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-footer-description">
                {t('home.footer.brand.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('home.footer.features.title')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('home.footer.features.documentAnalysis')}</li>
                <li>{t('home.footer.features.riskAssessment')}</li>
                <li>{t('home.footer.features.plainLanguage')}</li>
                <li>{t('home.footer.features.clauseBreakdown')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('home.footer.security.title')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('home.footer.security.noDataStorage')}</li>
                <li>{t('home.footer.security.endToEnd')}</li>
                <li>{t('home.footer.security.privacyProtected')}</li>
                <li>{t('home.footer.security.secureProcessing')}</li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              {t('home.footer.copyright')}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{t('home.footer.madeWith')}</span>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>{t('home.footer.securePrivate')}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}