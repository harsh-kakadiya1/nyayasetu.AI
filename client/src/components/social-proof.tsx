import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, FileText, Clock, Star, Shield, CheckCircle } from 'lucide-react';

export function SocialProofIndicators() {
  const { t } = useTranslation();
  const [documentsCount, setDocumentsCount] = useState(500);
  const [recentActivity, setRecentActivity] = useState(0);

  // Simulate real-time document counter
  useEffect(() => {
    const interval = setInterval(() => {
      setDocumentsCount(prev => prev + Math.floor(Math.random() * 3));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate recent activity
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentActivity(Math.floor(Math.random() * 5) + 1);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
      <div className="max-w-6xl mx-auto px-4">
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm animate-fade-in">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Enterprise Grade Security</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm animate-fade-in [animation-delay:200ms]">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">GDPR Compliant</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm animate-fade-in [animation-delay:400ms]">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">4.8/5 User Rating</span>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-counter-up">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow"></div>
            <span className="font-medium text-foreground animate-counter-up">
              {documentsCount.toLocaleString()}+ {t('home.stats.documentsAnalyzed')}
            </span>
          </div>
          
          {recentActivity > 0 && (
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm animate-fade-in">
              <Users className="w-3 h-3" />
              <span>{recentActivity} users analyzing documents right now</span>
            </div>
          )}
        </div>

        {/* User Testimonials Carousel */}
        <div className="mt-8 max-w-2xl mx-auto">
          <TestimonialCarousel />
        </div>
      </div>
    </div>
  );
}

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      text: "NyayaSetu.AI helped me understand my employment contract in minutes. The risk analysis was spot-on!",
      author: "Priya S.",
      role: "Software Engineer",
      rating: 5
    },
    {
      text: "As a small business owner, this tool saved me hundreds in legal consultation fees.",
      author: "Rahul M.",
      role: "Entrepreneur",
      rating: 5
    },
    {
      text: "The plain language summaries made complex legal terms finally make sense to me.",
      author: "Anita K.",
      role: "Marketing Manager",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm">
      <div className="flex justify-center mb-2">
        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      <blockquote className="text-center">
        <p className="text-gray-700 italic mb-4 animate-fade-in key={currentIndex}">
          "{testimonials[currentIndex].text}"
        </p>
        <div className="text-sm">
          <div className="font-semibold text-gray-900">{testimonials[currentIndex].author}</div>
          <div className="text-gray-500">{testimonials[currentIndex].role}</div>
        </div>
      </blockquote>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary w-4' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
