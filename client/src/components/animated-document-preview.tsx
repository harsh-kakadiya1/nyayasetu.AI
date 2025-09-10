import { FileText, Upload, Zap } from 'lucide-react';

export function AnimatedDocumentPreview() {
  return (
    <div className="relative max-w-md mx-auto">
      {/* Main document container */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 border border-gray-200 animate-float">
        {/* Document header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-2 bg-gray-100 rounded w-3/4" />
          </div>
        </div>

        {/* Document content lines */}
        <div className="space-y-2 mb-6">
          {[100, 85, 95, 70, 90].map((width, index) => (
            <div
              key={index}
              className="h-2 bg-gray-100 rounded animate-fade-in"
              style={{ 
                width: `${width}%`,
                animationDelay: `${index * 200}ms`
              }}
            />
          ))}
        </div>

        {/* AI processing indicator */}
        <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Zap className="w-4 h-4 text-blue-600 animate-ai-processing" />
          <span className="text-sm text-blue-700 font-medium">AI Analysis in Progress</span>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center animate-pulse-glow">
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </div>

      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center animate-float [animation-delay:1s]">
        <Upload className="w-6 h-6 text-primary" />
      </div>

      {/* Processing waves */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-lg border-2 border-primary/20 animate-pulse-glow"
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
    </div>
  );
}
