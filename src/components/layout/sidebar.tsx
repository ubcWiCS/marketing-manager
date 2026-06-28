"use client";

import { LayoutDashboard, ListTodo, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PortfolioDot } from "@/components/ui/portfolio-dot";
import { useTickets } from "@/lib/ticket-context";
import { Portfolio } from "@/types";
import { ManageMembersDialog } from "./manage-members-dialog";

export function Sidebar() {
  const pathname = usePathname();
  const { tickets } = useTickets();
  const sidebarTickets = tickets.filter((t) => !t.isOnBoard);
  const [manageOpen, setManageOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setData("source", "sidebar");
  };

  return (
    <>
    <aside className="w-56 h-screen flex flex-col bg-white border-r border-surface-200 shrink-0">
      <nav className="px-2 pt-3 pb-2 space-y-0.5 border-b border-surface-100">
        <NavItem href="/" icon={LayoutDashboard} label="Board" isActive={pathname === "/"} />
        <NavItem href="/requests" icon={ListTodo} label="All Tickets" isActive={pathname === "/requests"} />
      </nav>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 py-2 text-[10px] font-semibold text-surface-400 uppercase tracking-wider">
          Unassigned Tickets
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
          {sidebarTickets.map((ticket) => (
            <div
              key={ticket.id}
              draggable
              onDragStart={(e) => handleDragStart(e, ticket.id)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-100 cursor-grab active:cursor-grabbing transition-colors text-xs group"
            >
              <PortfolioDot portfolio={ticket.portfolio as Portfolio} />
              <Link
                href={`/requests/${ticket.id}`}
                className="text-surface-600 truncate hover:text-accent-600 transition-colors flex-1 min-w-0"
                onClick={(e) => e.stopPropagation()}
              >
                {ticket.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 py-3 border-t border-surface-100">
        <button
          onClick={() => setManageOpen(true)}
          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs text-surface-500 hover:text-surface-700 hover:bg-surface-50 transition-colors"
        >
          <Users className="w-3.5 h-3.5" />
          Manage Team
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
        "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors",
        isActive ? "bg-accent-50 text-accent-600 font-medium" : "text-surface-500 hover:bg-surface-50 hover:text-surface-700"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}


