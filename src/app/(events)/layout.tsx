import type { Metadata } from "next";
import { EventsHeader } from "@/components/layout/events-header";
import { TicketProvider } from "@/lib/ticket-context";

export const metadata: Metadata = {
  title: "WiCS Marketing Manager",
  description: "Submit a graphic design or marketing request to the WiCS Marketing team.",
};

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TicketProvider>
      <div className="flex min-h-screen flex-col">
        <EventsHeader />
        {children}
      </div>
    </TicketProvider>
  );
}
