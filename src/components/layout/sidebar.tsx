"use client";

import { LayoutDashboard, ListTodo, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ManageMembersDialog } from "./manage-members-dialog";

export function Sidebar() {
  const pathname = usePathname();
  const [manageOpen, setManageOpen] = useState(false);

  return (
    <>
      <aside className="w-56 h-screen flex flex-col bg-navy-900 border-r border-navy-700 shrink-0">
        <nav className="px-2 pt-3 pb-2 space-y-1">
          <NavItem href="/" icon={LayoutDashboard} label="Board" isActive={pathname === "/"} />
          <NavItem href="/requests" icon={ListTodo} label="All Tickets" isActive={pathname === "/requests"} />
        </nav>

        <div className="flex-1" />

        <div className="px-3 py-3 border-t border-navy-700 space-y-2">
          <button
            onClick={() => setManageOpen(true)}
            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-hand text-xs text-surface-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            Manage Team
          </button>
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-hand text-xs text-surface-400 hover:text-red-400 hover:bg-navy-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>

      </aside>
      <ManageMembersDialog open={manageOpen} onClose={() => setManageOpen(false)} />
    </>
  );
}

function NavItem({ href, icon: Icon, label, isActive }: { href: string; icon: any; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-2.5 py-1.5 rounded-hand text-sm font-medium uppercase transition-all duration-200",
        isActive
          ? "bg-plum-600/30 text-plum-300"
          : "text-surface-400 hover:bg-navy-800 hover:text-white"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}