import { Link, useLocation } from "wouter";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const handleGetStarted = () => setLocation("/dashboard");
  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground leading-tight">nyayasetu.ai</span>
            <span className="text-xs text-muted-foreground -mt-1">Legal Document Intelligence</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/">
            <span className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Home</span>
          </Link>
          <Link href="/dashboard">
            <span className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
