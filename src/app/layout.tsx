import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { TicketProvider } from "@/lib/ticket-context";
import { TeamProvider } from "@/lib/team-context";

export const metadata: Metadata = {
  title: "Portfolio Manager",
  description: "Modern ticket management for student organizations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex h-screen overflow-hidden">
        <TicketProvider>
          <TeamProvider>
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </TeamProvider>
        </TicketProvider>
      </body>
    </html>
  );
}

