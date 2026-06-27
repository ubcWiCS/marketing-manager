import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "open" | "in-progress" | "in-review" | "completed" | "archived" | "default";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    open: "badge-open",
    "in-progress": "badge-in-progress",
    "in-review": "badge-in-review",
    completed: "badge-completed",
    archived: "badge-archived",
    default: "badge bg-surface-100 text-surface-600",
  };

  return (
    <span className={cn(variantStyles[variant], className)}>
      {children}
    </span>
  );
}
