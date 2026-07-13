import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { TicketProvider } from "@/lib/ticket-context";
import { TeamProvider } from "@/lib/team-context";

export const metadata: Metadata = {
  title: "WiCS Marketing Manager",
  description: "Brutalist ticket management for student organizations",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-gold-200">
      <TicketProvider>
        <TeamProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gold-200 pt-12 md:pt-0">
            {children}
          </main>
        </TeamProvider>
      </TicketProvider>
    </div>
  );
}