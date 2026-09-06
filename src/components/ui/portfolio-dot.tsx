import { Portfolio, PORTFOLIO_COLORS } from "@/types";

const FALLBACK_COLOR = "#94a3b8";

export function PortfolioDot({ portfolio }: { portfolio: Portfolio | string; className?: string }) {
  const color = PORTFOLIO_COLORS[portfolio as Portfolio] ?? FALLBACK_COLOR;
  return (
    <span
      className="inline-block w-2.5 h-2.5 border-2 border-black shrink-0 shadow-brutal-sm"
      style={{ backgroundColor: color }}
      title={portfolio}
    />
  );
}
