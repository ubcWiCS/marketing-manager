import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-plum-100 via-plum-200/50 to-plum-100 bg-[length:200%_100%] animate-shimmer rounded-hand",
        className
      )}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-hand-xl border border-surface-200 p-3 space-y-2">
      <Skeleton className="h-3 w-12" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function SkeletonColumn() {
  return (
    <div className="flex flex-col w-64 shrink-0 rounded-hand-xl bg-surface-100/60 p-2 space-y-2">
      <div className="flex items-center gap-2 px-3 py-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-2 w-12" />
        </div>
      </div>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr className="animate-fade-in">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-2.5">
          <Skeleton className={cn("h-4", i === 1 ? "w-48" : i === 6 ? "w-16" : "w-20")} />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonDetail() {
  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in space-y-6">
      <Skeleton className="h-4 w-32" />
      <div className="bg-white rounded-hand-xl border border-surface-200 p-6 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="bg-white rounded-hand-xl border border-surface-200 p-6 space-y-3">
        <Skeleton className="h-5 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
      <div className="bg-white rounded-hand-xl border border-surface-200 p-5 space-y-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="bg-white rounded-hand-xl border border-surface-200 p-5 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}