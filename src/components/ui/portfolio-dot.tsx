import { Portfolio, PORTFOLIO_COLORS } from "@/types";
import { cn } from "@/lib/utils";

export function PortfolioDot({ portfolio, className }: { portfolio: Portfolio; className?: string }) {
  return (
    <span
      className={cn("inline-block w-2 h-2 rounded-full shrink-0", className)}
      style={{ backgroundColor: PORTFOLIO_COLORS[portfolio] }}
      title={portfolio}
    />
  );
}
