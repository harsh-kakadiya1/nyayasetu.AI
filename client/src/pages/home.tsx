import { useState } from "react";
import { Shield, CheckCircle, Lock, Zap, FileText, Users, Info, AlertTriangle } from "lucide-react";
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
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to NyayaSetu.AI</h1>
          <p className="text-lg text-muted-foreground mb-6">Your AI-powered legal document assistant for clarity, risk analysis, and actionable insights.</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" size="lg" onClick={handleGetStarted}>
            Get Started
          </Button>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Features & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-medium text-lg text-foreground mb-1">Instant Summaries</h3>
                  <p className="text-muted-foreground">Get plain-language summaries of complex legal documents in seconds.</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <Zap className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-medium text-lg text-foreground mb-1">AI-Powered Risk Analysis</h3>
                  <p className="text-muted-foreground">Identify potential risks, unusual terms, and key clauses automatically.</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-medium text-lg text-foreground mb-1">Clause Breakdown</h3>
                  <p className="text-muted-foreground">See original and simplified versions of important contract clauses.</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-medium text-lg text-foreground mb-1">Accessible for Everyone</h3>
                  <p className="text-muted-foreground">Designed for both legal professionals and everyday users.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Use Section */}
        <section className="mb-12">
          <div className="bg-card rounded-lg border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Why Use NyayaSetu.AI?</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-base">
              <li>Save time and money on legal reviews</li>
              <li>Understand your rights and obligations before signing</li>
              <li>Spot hidden risks and negotiate better terms</li>
              <li>Empower yourself with clear, actionable insights</li>
            </ul>
          </div>
        </section>

        {/* Security & Privacy Section */}
        <section className="mb-12">
          <div className="bg-card rounded-lg border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Security & Privacy</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Lock className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-medium text-lg text-foreground mb-1">Your Data is Safe</h3>
                  <p className="text-muted-foreground">We never store your documents. All analysis is performed securely and confidentially.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-success-foreground" />
                <div>
                  <h3 className="font-medium text-lg text-foreground mb-1">Privacy First</h3>
                  <p className="text-muted-foreground">Your privacy is our top priority. No data is shared with third parties.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Popup */}
        {showDisclaimer && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full relative shadow-lg animate-fade-in">
              <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground" onClick={handleCloseDisclaimer}>
                ×
              </button>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-warning-foreground mr-2" />
                <h3 className="text-lg font-semibold text-foreground">Disclaimer</h3>
              </div>
              <div className="text-muted-foreground mb-2 text-base leading-relaxed">
                <p className="mb-2">
                  <strong>Important:</strong> This tool is for <span className="font-medium">informational purposes only</span>.<br />
                  <span className="block mt-2">Do <span className="font-semibold text-warning-foreground">not rely solely</span> on its analysis for legal decisions.</span>
                </p>
                <p>
                  Always consult a <span className="font-medium">qualified advocate</span> or <span className="font-medium">legal professional</span> for advice specific to your situation.
                </p>
              </div>
              <Button className="mt-4 w-full" onClick={handleCloseDisclaimer}>
                I Understand & Continue
              </Button>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-card border-t border-border mt-16" data-testid="footer-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground" data-testid="text-footer-brand">nyayasetu.ai</span>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-footer-description">
            Making legal documents accessible through AI-powered analysis and plain-language explanations.
          </p>
          <Separator className="my-8" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © 2024 nyayasetu.ai. Built for hackathon demonstration.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
