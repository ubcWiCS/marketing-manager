import { Portfolio, PORTFOLIO_COLORS } from "@/types";

interface PortfolioBadgeProps {
  portfolio: Portfolio | string;
  className?: string;
}

const FALLBACK_COLOR = "#94a3b8";

export function PortfolioBadge({ portfolio, className }: PortfolioBadgeProps) {
  const color = PORTFOLIO_COLORS[portfolio as Portfolio] ?? FALLBACK_COLOR;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 font-black text-[10px] uppercase border-2 border-black shadow-brutal-sm text-white ${className || ""}`}
      style={{ backgroundColor: color }}
    >
      {portfolio}
    </span>
  );
}
