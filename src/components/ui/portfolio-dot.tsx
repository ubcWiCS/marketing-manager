import { Portfolio, PORTFOLIO_COLORS } from "@/types";

export function PortfolioDot({ portfolio }: { portfolio: Portfolio; className?: string }) {
  return (
    <span
      className="inline-block w-2.5 h-2.5 border-2 border-black shrink-0 shadow-brutal-sm"
      style={{ backgroundColor: PORTFOLIO_COLORS[portfolio] }}
      title={portfolio}
    />
  );
}