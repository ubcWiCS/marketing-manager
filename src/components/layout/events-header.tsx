"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LogOut, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/submissions", label: "Ticket board", icon: ClipboardList },
  { href: "/submit", label: "New submission", icon: PlusCircle },
];

export function EventsHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-surface-200 bg-white/90 px-4 py-3 backdrop-blur-md md:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
        <Link href="/submissions" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-hand border-2 border-black bg-plum-400 shadow-brutal-sm">
            <span className="text-xs font-black text-navy-950">M</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-navy-800">Marketing Requests</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-surface-500">
              Events Team Portal
            </p>
          </div>
        </Link>

        <div className="order-3 flex w-full items-center gap-1 rounded-hand bg-surface-100 p-1 sm:order-2 sm:w-auto">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/submit"
              ? pathname === href
              : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded px-3 py-2 text-xs font-bold transition-colors sm:flex-none",
                  active
                    ? "bg-white text-plum-700 shadow-sm"
                    : "text-surface-500 hover:bg-white/70 hover:text-navy-700",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </div>

        <form action="/api/auth/logout" method="POST" className="order-2 sm:order-3">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium text-surface-500 transition-colors hover:bg-surface-100 hover:text-navy-700"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
