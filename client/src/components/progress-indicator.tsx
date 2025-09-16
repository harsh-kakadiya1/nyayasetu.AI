import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, Zap } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  isProcessing?: boolean;
}

export function ProgressIndicator({ currentStep, isProcessing = false }: ProgressIndicatorProps) {
  const { t } = useTranslation();
  
  const steps = [
    {
      id: 1,
      title: "Upload Document",
      description: "Select or drag your legal document",
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "Our AI processes your document",
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Results",
      description: "Get insights and recommendations",
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress bar background */}
        <div className="absolute top-5 sm:top-6 left-8 right-8 h-0.5 bg-gray-200 -z-10">
          <div 
            className="h-full bg-primary transition-all duration-1000 ease-out animate-progress"
            style={{ 
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' 
            }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isCurrentProcessing = currentStep === step.id && isProcessing;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 flex-1 max-w-32">
              {/* Step circle */}
              <div
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 transform
                  ${isCompleted 
                    ? 'bg-green-500 text-white scale-110' 
                    : isActive 
                    ? 'bg-primary text-white animate-pulse-glow' 
                    : 'bg-gray-200 text-gray-400'
                  }
                  ${isCurrentProcessing ? 'animate-ai-processing' : ''}
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 animate-scale-in" />
                ) : isCurrentProcessing ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-4 h-4 sm:w-5 sm:h-5">{step.icon}</div>
                )}
              </div>

              {/* Step content */}
              <div className="mt-2 sm:mt-3 text-center">
                <h3 
                  className={`text-xs sm:text-sm font-semibold transition-colors duration-300 leading-tight ${
                    isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-tight hidden sm:block">
                  {step.description}
                </p>
              </div>

              {/* Processing indicator */}
              {isCurrentProcessing && (
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full text-xs animate-fade-in">
                    <Clock className="w-3 h-3 animate-spin" />
                    <span className="hidden sm:inline">Processing...</span>
                    <span className="sm:hidden">...</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current step description */}
      <div className="text-center mt-6 sm:mt-8">
        <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
          isProcessing 
            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
            : 'bg-gray-50 text-gray-600'
        }`}>
          {isProcessing && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
          <span className="text-xs sm:text-sm font-medium">
            {isProcessing 
              ? "AI is analyzing your document..." 
              : `Step ${currentStep} of ${steps.length}`
            }
          </span>
        </div>
      </div>
    </div>
  );
}
