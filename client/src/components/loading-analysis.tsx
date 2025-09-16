import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FileText, Zap, Shield, CheckCircle } from "lucide-react";
import AnalysisLoadingSkeleton from "./analysis-loading-skeleton";

interface LoadingAnalysisProps {
  className?: string;
}

const loadingSteps = [
  {
    key: "parsing",
    icon: FileText,
    duration: 7000,
  },
  {
    key: "analyzing", 
    icon: Zap,
    duration: 7000,
  },
  {
    key: "evaluating",
    icon: Shield,
    duration: 7000,
  },
  {
    key: "finalizing",
    icon: CheckCircle,
    duration: 7000,
  }
];

export default function LoadingAnalysis({ className = "" }: LoadingAnalysisProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const totalDuration = loadingSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsedTime = 0;
    
    // Show skeleton after 7 seconds (after first step completes)
    const skeletonTimer = setTimeout(() => setShowSkeleton(true), 7000);
    
    const interval = setInterval(() => {
      elapsedTime += 100;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Calculate which step we should be on
      let stepTime = 0;
      for (let i = 0; i < loadingSteps.length; i++) {
        stepTime += loadingSteps[i].duration;
        if (elapsedTime <= stepTime) {
          setCurrentStep(i);
          break;
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(skeletonTimer);
    };
  }, []);

  const currentStepData = loadingSteps[currentStep];
  const CurrentIcon = currentStepData?.icon || FileText;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Loading Animation - Always Visible */}
      <div className="bg-card rounded-lg border border-border p-8 sm:p-12 text-center">
        {/* Main Loading Animation */}
        <div className="relative mb-8">
          <div className="loading-spinner-large"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CurrentIcon className="w-6 h-6 text-primary loading-pulse" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
            {t('loading.title')}
          </h3>
          <p className="text-base text-primary font-medium mb-2">
            {currentStepData && t(`loading.steps.${currentStepData.key}`)}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('loading.description')}
          </p>
        </div>

        {/* Loading Steps Indicator */}
        <div className="flex justify-center space-x-4">
          {loadingSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={step.key}
                className={`flex flex-col items-center transition-all duration-300 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : isActive
                      ? 'bg-primary/20 text-primary border-2 border-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-2 transition-colors duration-300 ${
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {t(`loading.stepNames.${step.key}`)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Animated Dots */}
        <div className="loading-dots mt-8">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      
      {/* Skeleton Loading - Shows after 7 seconds */}
      {showSkeleton && (
        <AnalysisLoadingSkeleton />
      )}
    </div>
  );
}