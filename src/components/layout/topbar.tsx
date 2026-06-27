"use client";

import { Search, PlusCircle, ListTodo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="h-12 glass flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        {pathname !== "/requests" && (
          <Link
            href="/requests"
            className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-accent-600 transition-colors"
          >
            <ListTodo className="w-3.5 h-3.5" />
            All Tickets
          </Link>
        )}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-3 py-1.5 bg-surface-100 border-none rounded-md text-xs text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-1 focus:ring-accent-500/30 focus:bg-white transition-all"
          />
        </div>
      </div>
      <Link href="/requests/new" className="btn-primary text-xs py-1.5 px-3">
        <PlusCircle className="w-3.5 h-3.5" />
        New
      </Link>
    </header>
  );
}
