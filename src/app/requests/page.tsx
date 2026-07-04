"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, List, Columns, PlusCircle, RotateCcw } from "lucide-react";
import { mockTickets } from "@/lib/mock-data";
import { useTickets } from "@/lib/ticket-context";
import { cn } from "@/lib/utils";
import { PortfolioDot } from "@/components/ui/portfolio-dot";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Portfolio, PORTFOLIOS, RequestStatus,
  REQUEST_STATUSES,
} from "@/types";

export default function RequestsPage() {
  const [search, setSearch] = useState("");
  const [filterPortfolio, setFilterPortfolio] = useState<Portfolio | "All">("All");
  const [filterStatus, setFilterStatus] = useState<RequestStatus | "All">("All");
  const [view, setView] = useState<"list" | "board">("list");
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [ticketToRestore, setTicketToRestore] = useState<string | null>(null);
  const { restoreTicket } = useTickets();

  const filtered = useMemo(() => {
    let items = [...mockTickets];
    
    // Filter by active/archived tab
    if (activeTab === "archived") {
      items = items.filter((t) => t.status === "Archived");
    } else {
      items = items.filter((t) => t.status !== "Archived");
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
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [search, filterPortfolio, filterStatus, activeTab]);

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-surface-900">All Tickets</h1>
          <p className="text-xs text-surface-400 mt-0.5">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-surface-200 rounded-lg p-0.5">
            <button onClick={() => setView("list")} className={cn("p-1.5 rounded-md transition-colors", view === "list" ? "bg-surface-100 text-surface-700" : "text-surface-400 hover:text-surface-600")}>
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => setView("board")} className={cn("p-1.5 rounded-md transition-colors", view === "board" ? "bg-surface-100 text-surface-700" : "text-surface-400 hover:text-surface-600")}>
              <Columns className="w-4 h-4" />
            </button>
          </div>
          <Link href="/requests/new" className="btn-primary text-xs">
            <PlusCircle className="w-3.5 h-3.5" />
            New Request
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 bg-white border border-surface-200 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("active")}
          className={cn(
            "px-4 py-1.5 rounded-md text-xs font-medium transition-colors",
            activeTab === "active"
              ? "bg-accent-500 text-white"
              : "text-surface-600 hover:text-surface-800"
          )}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("archived")}
          className={cn(
            "px-4 py-1.5 rounded-md text-xs font-medium transition-colors",
            activeTab === "archived"
              ? "bg-accent-500 text-white"
              : "text-surface-600 hover:text-surface-800"
          )}
        >
          Archived
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-400" />
          <input
            type="text"
            placeholder="Search by title or contact..."
            className="input-field pl-8 text-xs py-1.5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-field w-auto text-xs py-1.5"
          value={filterPortfolio}
          onChange={(e) => setFilterPortfolio(e.target.value as Portfolio | "All")}
        >
          <option value="All">All Portfolios</option>
          {PORTFOLIOS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          className="input-field w-auto text-xs py-1.5"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as RequestStatus | "All")}
        >
          <option value="All">All Statuses</option>
          {REQUEST_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <tbody className="divide-y divide-surface-100">
            {filtered.map((ticket) => (
              <tr key={ticket.id} className={cn("hover:bg-surface-50 transition-colors", ticket.status === "Archived" && "opacity-60 bg-surface-50")}>
                <td className="px-4 py-2.5">
                  <Link href={`/requests/${ticket.id}`} className="block group">
                    <div className="flex items-center gap-2">
                      <PortfolioDot portfolio={ticket.portfolio} />
                      <span className="text-xs font-medium text-surface-800 group-hover:text-accent-600 transition-colors">{ticket.title}</span>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-xs text-surface-600">{ticket.portfolio}</span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-xs text-surface-600">{ticket.pointOfContact}</span>
                </td>
                <td className="px-4 py-2.5">
                  <span className={cn("text-xs font-medium", ticket.priority === "Urgent" && "text-red-600", ticket.priority === "High" && "text-orange-600", ticket.priority === "Medium" && "text-yellow-600", ticket.priority === "Low" && "text-green-600")}>{ticket.priority}</span>
                </td>
                <td className="px-4 py-2.5">
                  <span className={cn("text-xs px-1.5 py-0.5 rounded-full", ticket.status === "Open" && "bg-green-50 text-green-700", ticket.status === "In Progress" && "bg-blue-50 text-blue-700", ticket.status === "In Review" && "bg-amber-50 text-amber-700", ticket.status === "Completed" && "bg-purple-50 text-purple-700", ticket.status === "Archived" && "bg-gray-50 text-gray-700")}>{ticket.status}</span>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs", new Date(ticket.deadline) < new Date() ? "text-red-500 font-medium" : "text-surface-500")}>
                      {new Date(ticket.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    {ticket.status === "Archived" && (
                      <button
                        onClick={() => {
                          setTicketToRestore(ticket.id);
                          setRestoreDialogOpen(true);
                        }}
                        className="p-1 hover:bg-surface-200 rounded transition-colors"
                        title="Restore ticket"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-surface-500 hover:text-accent-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
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
  );
}

