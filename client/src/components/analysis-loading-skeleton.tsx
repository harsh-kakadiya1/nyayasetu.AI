import { Skeleton } from "@/components/ui/skeleton";

export default function AnalysisLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Summary Section Skeleton */}
      <div className="bg-card rounded-lg border border-border p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Risk Assessment Skeleton */}
      <div className="bg-card rounded-lg border border-border p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Terms Skeleton */}
      <div className="bg-card rounded-lg border border-border p-6">
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-22 rounded-full" />
        </div>
      </div>

      {/* Clauses Skeleton */}
      <div className="bg-card rounded-lg border border-border p-6">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Skeleton */}
      <div className="bg-card rounded-lg border border-border p-6">
        <Skeleton className="h-6 w-44 mb-4" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-start space-x-3">
              <Skeleton className="h-5 w-5 rounded-full mt-1" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}