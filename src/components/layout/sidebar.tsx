"use client";

import { LayoutDashboard, ListTodo, Users, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ManageMembersDialog } from "./manage-members-dialog";

export function Sidebar() {
  const pathname = usePathname();
  const [manageOpen, setManageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-3 z-50 md:hidden flex items-center justify-center w-9 h-9 rounded-hand bg-navy-900 text-white shadow-brutal-sm"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-56 h-screen flex flex-col bg-navy-900 border-r border-navy-700 shrink-0 transition-transform duration-300",
          // Mobile: slide in/out
          "fixed md:sticky top-0 left-0 z-50",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-hand text-surface-400 hover:text-white hover:bg-navy-800 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>

        <nav className="px-2 pt-3 pb-2 space-y-1 mt-12 md:mt-0">
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