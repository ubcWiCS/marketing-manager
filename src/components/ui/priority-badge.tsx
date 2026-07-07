import { Priority } from "@/types";
import { ArrowUp } from "lucide-react";

const priorityLevels: Record<Priority, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
};

export function PriorityBadge({ priority }: { priority: Priority; className?: string }) {
  const level = priorityLevels[priority];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 font-black text-[10px] uppercase border-2 border-black shadow-brutal-sm`}
    >
      <ArrowUp className={`w-3 h-3 stroke-[3px] ${level >= 3 ? "" : ""}`} />
      {priority}
    </span>
  );
}