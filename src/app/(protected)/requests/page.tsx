"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, List, Columns, PlusCircle, RotateCcw } from "lucide-react";
import { useTickets } from "@/lib/ticket-context";
import { useTeamMembers } from "@/lib/team-context";
import { cn } from "@/lib/utils";
import { PortfolioDot } from "@/components/ui/portfolio-dot";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Portfolio, PORTFOLIOS, RequestStatus,
  REQUEST_STATUSES,
} from "@/types";
import { SkeletonTableRow } from "@/components/ui/skeleton";

export default function RequestsPage() {
  const { tickets, restoreTicket, loading } = useTickets();
  const { members } = useTeamMembers();
  const [search, setSearch] = useState("");
  const [filterPortfolio, setFilterPortfolio] = useState<Portfolio | "All">("All");
  const [filterStatus, setFilterStatus] = useState<RequestStatus | "All">("All");
  const [filterMember, setFilterMember] = useState<string>("All");
  const [view, setView] = useState<"list" | "board">("list");
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [ticketToRestore, setTicketToRestore] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = [...tickets];

    // Filter by active/completed tab
    if (activeTab === "completed") {
      items = items.filter((t) => t.status === "Completed");
    } else {
      items = items.filter((t) => t.status !== "Completed");
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.pointOfContact.toLowerCase().includes(q)
      );
    }
    if (filterPortfolio !== "All") items = items.filter((t) => t.portfolio === filterPortfolio);
    if (filterStatus !== "All") items = items.filter((t) => t.status === filterStatus);
    if (filterMember !== "All") items = items.filter((t) => t.pointOfContact === filterMember);
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [search, filterPortfolio, filterStatus, filterMember, activeTab, tickets]);

  return (
    <div className="h-full flex flex-col">
      {/* Page Header (same Y-level and styling as Board header) */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-surface-200 bg-white/80 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-navy-800">All Tickets</h1>
          <p className="text-xs text-surface-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/60 rounded-lg p-0.5">
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-1.5 rounded font-medium text-xs transition-all",
                view === "list" ? "bg-plum-100 text-plum-700" : "text-surface-500 hover:bg-plum-50"
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("board")}
              className={cn(
                "p-1.5 rounded font-medium text-xs transition-all",
                view === "board" ? "bg-plum-100 text-plum-700" : "text-surface-500 hover:bg-plum-50"
              )}
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>
          <Link href="/requests/new" className="btn-brutal-primary text-xs py-1.5 px-3">
            <PlusCircle className="w-3.5 h-3.5" />
            New Ticket
          </Link>
        </div>
      </div>

      {/* Main Content (with standard padding) */}
      <div className="flex-1 p-6 max-w-5xl w-full mx-auto animate-fade-in overflow-y-auto">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 bg-white/60 rounded-hand p-1 w-fit">
        <button
          onClick={() => setActiveTab("active")}
          className={cn(
            "px-3 py-1 font-medium text-xs rounded transition-all",
            activeTab === "active"
              ? "bg-plum-500 text-white"
              : "text-navy-700 bg-transparent hover:bg-plum-50"
          )}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={cn(
            "px-3 py-1 font-medium text-xs rounded transition-all",
            activeTab === "completed"
              ? "bg-plum-500 text-white"
              : "text-navy-700 bg-transparent hover:bg-plum-50"
          )}
        >
          Completed
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search by title or contact..."
            className="input-brutal pl-8 text-sm py-1.5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-brutal w-auto text-sm py-1.5"
          value={filterPortfolio}
          onChange={(e) => setFilterPortfolio(e.target.value as Portfolio | "All")}
        >
          <option value="All">All Portfolios</option>
          {PORTFOLIOS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          className="input-brutal w-auto text-sm py-1.5"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as RequestStatus | "All")}
        >
          <option value="All">All Statuses</option>
          {REQUEST_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="input-brutal w-auto text-sm py-1.5"
          value={filterMember}
          onChange={(e) => setFilterMember(e.target.value)}
        >
          <option value="All">All Members</option>
          {members.map((m) => (
            <option key={m.id} value={m.name}>{m.name}</option>
          ))}
        </select>
      </div>

      <div className="border border-surface-200 rounded-hand-xl bg-white/80 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-200 bg-plum-50/50">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-navy-700 uppercase">Title</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-navy-700 uppercase">Portfolio</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-navy-700 uppercase">Team Member</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-navy-700 uppercase">Priority</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-navy-700 uppercase">Status</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-navy-700 uppercase">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200">
            {loading ? (
              <>
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
              </>
            ) : (
              filtered.map((ticket) => (
                <tr
                  key={ticket.id}
                  className={cn(
                    "hover:bg-plum-50/30 transition-all",
                    ticket.status === "Archived" && "opacity-60"
                  )}
                >
                  <td className="px-4 py-2.5">
                    <Link href={`/requests/${ticket.id}`} className="block group">
                      <div className="flex items-center gap-2">
                        <PortfolioDot portfolio={ticket.portfolio} />
                        <span className="text-sm font-medium text-navy-800 group-hover:text-plum-600 transition-colors">
                          {ticket.title}
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-sm text-navy-700">{ticket.portfolio}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-sm text-navy-700">{ticket.pointOfContact}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      ticket.priority === "Urgent" && "bg-red-50 text-red-600",
                      ticket.priority === "High" && "bg-orange-50 text-orange-600",
                      ticket.priority === "Medium" && "bg-amber-50 text-amber-600",
                      ticket.priority === "Low" && "bg-emerald-50 text-emerald-600"
                    )}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      ticket.status === "Open" && "bg-status-open text-navy-800",
                      ticket.status === "In Progress" && "bg-status-in_progress text-navy-800",
                      ticket.status === "In Review" && "bg-status-review text-navy-800",
                      ticket.status === "Completed" && "bg-status-completed text-navy-800",
                      ticket.status === "Archived" && "bg-status-archived text-navy-800"
                    )}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-sm",
                        new Date(ticket.deadline) < new Date() ? "text-red-600" : "text-surface-500"
                      )}>
                        {new Date(ticket.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      {ticket.status === "Archived" && (
                        <button
                          onClick={() => {
                            setTicketToRestore(ticket.id);
                            setRestoreDialogOpen(true);
                          }}
                          className="p-0.5 hover:text-plum-600 transition-colors"
                          title="Restore ticket"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Restore Confirmation Dialog */}
      <ConfirmDialog
        isOpen={restoreDialogOpen}
        onClose={() => {
          setRestoreDialogOpen(false);
          setTicketToRestore(null);
        }}
        onConfirm={() => {
          if (ticketToRestore) {
            restoreTicket(ticketToRestore);
          }
        }}
        title="Restore Ticket"
        message="Are you sure you want to restore this ticket? It will be moved back to active status."
        confirmText="Restore"
        cancelText="Cancel"
        variant="info"
      />
      </div>
    </div>
  );
}