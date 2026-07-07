import { Portfolio, PORTFOLIO_COLORS } from "@/types";

interface PortfolioBadgeProps {
  portfolio: Portfolio;
  className?: string;
}

export function PortfolioBadge({ portfolio, className }: PortfolioBadgeProps) {
  const color = PORTFOLIO_COLORS[portfolio];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 font-black text-[10px] uppercase border-2 border-black shadow-brutal-sm ${className || ""}`}
      style={{ backgroundColor: color, color: 'white' }}
    >
      {portfolio}
    </span>
  );
}