import { Portfolio, PORTFOLIO_COLORS } from "@/types";

interface PortfolioBadgeProps {
  portfolio: Portfolio;
  className?: string;
}

export function PortfolioBadge({ portfolio, className }: PortfolioBadgeProps) {
  const color = PORTFOLIO_COLORS[portfolio];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${className || ""}`}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {portfolio}
    </span>
  );
}
