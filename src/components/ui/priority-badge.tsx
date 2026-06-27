import { Priority } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig: Record<Priority, { color: string; bg: string; label: string }> = {
  Urgent: { color: "text-red-700", bg: "bg-red-50 border-red-200", label: "Urgent" },
  High: { color: "text-orange-700", bg: "bg-orange-50 border-orange-200", label: "High" },
  Medium: { color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", label: "Medium" },
  Low: { color: "text-green-700", bg: "bg-green-50 border-green-200", label: "Low" },
};

const priorityLevels: Record<Priority, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  const level = priorityLevels[priority];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        config.bg,
        config.color,
        className
      )}
    >
      <ArrowUp className={`w-3 h-3 ${level >= 3 ? "opacity-100" : "opacity-40"}`} />
      {config.label}
    </span>
  );
}
