"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioDot } from "@/components/ui/portfolio-dot";
import { SkeletonColumn } from "@/components/ui/skeleton";
import { useTickets } from "@/lib/ticket-context";
import { Ticket, Portfolio, RequestStatus } from "@/types";

const priorityOrder: Record<string, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };

const STATUS_COLUMNS: { status: RequestStatus; label: string; color: string }[] = [
  { status: "Open", label: "Open", color: "text-navy-700" },
  { status: "In Progress", label: "In Progress", color: "text-amber-700" },
  { status: "In Review", label: "In Review", color: "text-blue-700" },
  { status: "Completed", label: "Completed", color: "text-green-700" },
];

export default function BoardPage() {
  const { tickets, loading, updateTicket } = useTickets();
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: RequestStatus) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("text/plain");
    if (!ticketId) return;
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket || ticket.status === targetStatus) return;
    await updateTicket(ticketId, { status: targetStatus });
    setDraggingId(null);
  };

  const columns = STATUS_COLUMNS.map(({ status, label, color }) => [
    label,
    tickets.filter((t) => t.status === status),
    color,
  ]) as [string, Ticket[], string][];

  return (
    <div className="h-full flex flex-col">
      {/* Board header */}
      <div className="flex items-center justify-between px-3 md:px-5 py-3 border-b border-surface-200 bg-white/80">
        <div className="flex items-center gap-3">
          <h1 className="text-lg md:text-xl font-bold text-navy-800">Board</h1>
          <span className="text-xs text-surface-500">{tickets.length} tickets</span>
        </div>
        <Link href="/requests/new" className="btn-brutal-primary text-xs py-1.5 px-2.5 md:px-3">
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden md:inline">New Ticket</span>
        </Link>
      </div>

      {/* Kanban columns */}
      <div className="flex-1 flex gap-3 p-2 md:p-4 overflow-x-auto snap-x snap-mandatory">
        {loading ? (
          <>
            <SkeletonColumn />
            <SkeletonColumn />
            <SkeletonColumn />
            <SkeletonColumn />
          </>
        ) : (
          columns.map(([label, columnTickets, color], statusIdx) => (
            <div
              key={label}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, STATUS_COLUMNS[statusIdx].status)}
              className={cn(
                "flex flex-col w-[85vw] sm:flex-1 sm:basis-0 sm:min-w-0 md:min-w-64 rounded-hand-xl bg-surface-100/60 transition-colors duration-200 snap-start",
                draggingId && "ring-2 ring-plum-300 ring-dashed"
              )}
            >
              {/* Column header */}
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-surface-200/50">
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate ${color}`}>{label}</p>
                  <p className="text-[10px] text-surface-400">{columnTickets.length} ticket{columnTickets.length !== 1 ? "s" : ""}</p>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-1.5 p-2 overflow-y-auto">
                {(columnTickets as Ticket[])
                  .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
                  .map((ticket) => (
                    <div
                      key={ticket.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, ticket.id)}
                      onDragEnd={() => setDraggingId(null)}
                      className={cn(
                        "bg-white rounded-hand-xl border border-surface-200 px-3 py-2.5 cursor-grab active:cursor-grabbing transition-all duration-200",
                        draggingId === ticket.id
                          ? "opacity-50 scale-95 shadow-sm"
                          : "hover:border-plum-300 hover:shadow-sm"
                      )}
                    >
                      <Link href={`/requests/${ticket.id}`} className="block cursor-pointer">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={cn(
                            "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                            ticket.priority === "Urgent" && "bg-red-50 text-red-600",
                            ticket.priority === "High" && "bg-orange-50 text-orange-600",
                            ticket.priority === "Medium" && "bg-amber-50 text-amber-600",
                            ticket.priority === "Low" && "bg-emerald-50 text-emerald-600",
                          )}>
                            {ticket.priority}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-navy-800 leading-snug line-clamp-2 hover:text-plum-600 transition-colors">
                          {ticket.title}
                        </p>
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5 border-t border-surface-100 pt-1.5">
                        <PortfolioDot portfolio={ticket.portfolio as Portfolio} />
                        <span className={cn(
                          "text-[10px]",
                          new Date(ticket.deadline) < new Date() ? "text-red-500" : "text-surface-400"
                        )}>
                          {new Date(ticket.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <span className={cn(
                          "ml-auto inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full truncate max-w-[90px]",
                          ticket.assignedTo
                            ? "bg-plum-50 text-plum-700"
                            : "bg-surface-100 text-surface-400"
                        )}>
                          <User className="w-2.5 h-2.5 shrink-0" />
                          {ticket.assignedTo || "Unassigned"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}