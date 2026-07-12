import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Request — Marketing Team",
  description: "Submit a graphic design or marketing request to the Marketing team.",
};

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}
