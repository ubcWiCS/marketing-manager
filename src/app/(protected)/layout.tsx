import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { TicketProvider } from "@/lib/ticket-context";
import { TeamProvider } from "@/lib/team-context";

export const metadata: Metadata = {
  title: "Portfolio Manager",
  description: "Modern ticket management for student organizations",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <TicketProvider>
        <TeamProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </TeamProvider>
      </TicketProvider>
    </div>
  );
}