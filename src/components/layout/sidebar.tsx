"use client";

import { LayoutDashboard, ListTodo, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PortfolioDot } from "@/components/ui/portfolio-dot";
import { Skeleton } from "@/components/ui/skeleton";
import { useTickets } from "@/lib/ticket-context";
import { Portfolio } from "@/types";
import { ManageMembersDialog } from "./manage-members-dialog";

export function Sidebar() {
  const pathname = usePathname();
  const { tickets, unassignFromBoard, loading } = useTickets();
  const sidebarTickets = tickets.filter((t) => !t.isOnBoard);
  const [manageOpen, setManageOpen] = useState(false);
  const [draggingOver, setDraggingOver] = useState(false);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setData("source", "sidebar");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDraggingOver(true);
  };

  const handleDragLeave = () => {
    setDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    unassignFromBoard(id);
  };

  return (
    <>
    <aside className="w-56 h-screen flex flex-col bg-navy-900 border-r border-navy-700 shrink-0">
      <nav className="px-2 pt-3 pb-2 space-y-1">
        <NavItem href="/" icon={LayoutDashboard} label="Board" isActive={pathname === "/"} />
        <NavItem href="/requests" icon={ListTodo} label="All Tickets" isActive={pathname === "/requests"} />
      </nav>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 py-2 text-[10px] font-bold text-plum-300 uppercase tracking-wider">
          Unassigned Tickets
        </div>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex-1 overflow-y-auto px-2 pb-2 space-y-1 transition-all duration-200 bg-navy-800/50",
            draggingOver && "ring-2 ring-plum-400"
          )}
        >
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-3 flex-1" />
                </div>
              ))}
            </>
          ) : (
            sidebarTickets.map((ticket) => (
              <div
                key={ticket.id}
                draggable
                onDragStart={(e) => handleDragStart(e, ticket.id)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-hand hover:bg-navy-800 cursor-grab active:cursor-grabbing font-medium text-xs transition-colors"
              >
                <PortfolioDot portfolio={ticket.portfolio as Portfolio} />
                <Link
                  href={`/requests/${ticket.id}`}
                  className="truncate text-white hover:text-plum-300 transition-colors flex-1 min-w-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {ticket.title}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

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