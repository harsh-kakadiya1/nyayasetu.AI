import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/language-selector"; 

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleGetStarted = () => setLocation("/dashboard");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between py-3 min-h-[64px]">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg font-semibold text-foreground leading-tight whitespace-nowrap">nyayasetu.ai</span>
              <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">Legal Document Intelligence</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-shrink-0 h-full">
            <div className="flex items-center space-x-4 lg:space-x-6 h-full">
              <Link href="/">
                <div className="flex items-center h-10 px-2">
                  <span className="text-sm lg:text-base font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                    Home
                  </span>
                </div>
              </Link>
              <Link href="/dashboard">
                <div className="flex items-center h-10 px-2">
                  <span className="text-sm lg:text-base font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                    Dashboard
                  </span>
                </div>
              </Link>
              <div className="flex items-center h-10">
                <LanguageSelector />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 flex-shrink-0">
            <div className="flex-shrink-0">
              <LanguageSelector />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 flex-shrink-0"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="py-4 space-y-3">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <div className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                  Home
                </div>
              </Link>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <div className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                  Dashboard
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
