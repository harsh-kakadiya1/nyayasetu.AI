import { useState } from "react";
import { Shield, CheckCircle, Lock, Zap, FileText, Users, Info, AlertTriangle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [location, setLocation] = useLocation();

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
        {/* Hero Section */}
        <section className="relative bg-background py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 mb-6 shadow-sm">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">AI-Powered Legal Assistant</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
                Welcome to
                <span className="block text-primary mt-2">NyayaSetu.AI</span>
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

        {/* Stats Section */}
        <section className="py-16 bg-card/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Documents Analyzed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">30s</div>
                <div className="text-sm text-muted-foreground">Average Analysis</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to understand and analyze legal documents with confidence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="group bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-foreground mb-3">Instant Summaries</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Get plain-language summaries of complex legal documents in seconds. No more struggling with legal jargon.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-foreground mb-3">AI-Powered Risk Analysis</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Identify potential risks, unusual terms, and key clauses automatically using advanced AI algorithms.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-foreground mb-3">Clause Breakdown</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      See original and simplified versions of important contract clauses with detailed explanations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-foreground mb-3">Accessible for Everyone</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Designed for both legal professionals and everyday users with intuitive, user-friendly interface.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Choose NyayaSetu.AI?</h2>
              <p className="text-xl text-muted-foreground">
                Empower yourself with intelligent legal document analysis
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Save Time and Money</h3>
                    <p className="text-muted-foreground">Reduce legal review costs and get instant analysis of your documents.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Understand Before Signing</h3>
                    <p className="text-muted-foreground">Know your rights and obligations clearly before making any commitments.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Spot Hidden Risks</h3>
                    <p className="text-muted-foreground">Identify potential issues and negotiate better terms with confidence.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Actionable Insights</h3>
                    <p className="text-muted-foreground">Get clear, practical recommendations you can act on immediately.</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of users who trust NyayaSetu.AI for their legal document analysis needs.
                  </p>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300" 
                    onClick={handleGetStarted}
                  >
                    Start Analyzing Documents
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Security & Privacy First</h2>
              <p className="text-xl text-muted-foreground">
                Your documents and privacy are protected with enterprise-grade security
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-3">Your Data is Safe</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We never store your documents. All analysis is performed securely and confidentially with end-to-end encryption.
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
                    <h3 className="font-semibold text-xl text-foreground mb-3">Privacy First</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Your privacy is our top priority. No data is shared with third parties, and all processing happens locally.
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
                <p>
                  <strong className="text-foreground">Important:</strong> This tool is for <span className="font-medium text-foreground">informational purposes only</span>.
                </p>
                <p>
                  Do <span className="font-semibold text-orange-600">not rely solely</span> on its analysis for legal decisions.
                </p>
                <p>
                  Always consult a <span className="font-medium text-foreground">qualified advocate</span> or <span className="font-medium text-foreground">legal professional</span> for advice specific to your situation.
                </p>
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
                <span className="font-bold text-xl text-foreground" data-testid="text-footer-brand">nyayasetu.ai</span>
              </div>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-footer-description">
                Making legal documents accessible through AI-powered analysis and plain-language explanations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Document Analysis</li>
                <li>Risk Assessment</li>
                <li>Plain Language Summary</li>
                <li>Clause Breakdown</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Security</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>No Data Storage</li>
                <li>End-to-End Encryption</li>
                <li>Privacy Protected</li>
                <li>Secure Processing</li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © 2024 nyayasetu.ai. Built for hackathon demonstration.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made with AI for everyone</span>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}