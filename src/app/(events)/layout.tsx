import type { Metadata } from "next";

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
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}
