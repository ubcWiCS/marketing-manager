"use client";

import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Edit3,
  LockKeyhole,
  PlusCircle,
  User,
} from "lucide-react";
import { PortfolioDot } from "@/components/ui/portfolio-dot";
import { SkeletonColumn } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTickets } from "@/lib/ticket-context";
import { Portfolio, RequestStatus, Ticket } from "@/types";

const priorityOrder: Record<Ticket["priority"], number> = {
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

const statusColumns: {
  status: RequestStatus;
  label: string;
  accent: string;
  dot: string;
}[] = [
  { status: "Open", label: "Open", accent: "text-navy-700", dot: "bg-navy-500" },
  { status: "In Progress", label: "In progress", accent: "text-amber-700", dot: "bg-amber-500" },
  { status: "In Review", label: "In review", accent: "text-blue-700", dot: "bg-blue-500" },
  { status: "Completed", label: "Completed", accent: "text-green-700", dot: "bg-green-500" },
  { status: "Archived", label: "Archived", accent: "text-surface-500", dot: "bg-surface-400" },
];

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value || "No date";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function EventsSubmissionsPage() {
  const { tickets, loading, error } = useTickets();

  const columns = statusColumns.map((column) => ({
    ...column,
    tickets: tickets
      .filter((ticket) => ticket.status === column.status)
      .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]),
  }));

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <section className="border-b border-surface-200 bg-white/55 px-4 py-5 md:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-plum-700">
              <Clock3 className="h-3.5 w-3.5" />
              Live workflow
            </div>
            <h1 className="text-2xl font-black tracking-tight text-navy-900 md:text-3xl">
              Your ticket board
            </h1>
            <p className="mt-1 max-w-xl text-sm text-surface-600">
              Follow every request from intake to completion. Status and workflow details are
              managed by the Marketing team.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-hand border border-surface-200 bg-white px-3 py-2 text-xs font-medium text-surface-500">
              <LockKeyhole className="h-3.5 w-3.5 text-plum-600" />
              Status is read-only
            </div>
            <Link href="/submit" className="btn-brutal-primary px-3 py-2 text-xs">
              <PlusCircle className="h-3.5 w-3.5" />
              New ticket
            </Link>
          </div>
        </div>
      </section>

      {error && (
        <div className="mx-4 mt-4 rounded-hand border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 md:mx-6">
          We could not load the ticket board. {error}
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 snap-x snap-mandatory gap-3 overflow-x-auto p-3 md:p-5">
        {loading ? (
          <>
            <SkeletonColumn />
            <SkeletonColumn />
            <SkeletonColumn />
            <SkeletonColumn />
          </>
        ) : (
          columns.map((column) => (
            <section
              key={column.status}
              className="flex w-[86vw] shrink-0 snap-start flex-col rounded-hand-xl border border-white/60 bg-surface-100/75 shadow-sm sm:w-[340px] xl:min-w-0 xl:flex-1"
            >
              <header className="flex items-center gap-2 border-b border-surface-200/80 px-3 py-3">
                <span className={cn("h-2.5 w-2.5 rounded-full", column.dot)} />
                <h2 className={cn("text-xs font-bold uppercase tracking-wide", column.accent)}>
                  {column.label}
                </h2>
                <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-surface-500">
                  {column.tickets.length}
                </span>
              </header>

              <div className="flex-1 space-y-2 p-2">
                {column.tickets.length === 0 ? (
                  <div className="flex min-h-28 items-center justify-center rounded-hand border border-dashed border-surface-300 bg-white/35 px-4 text-center text-xs text-surface-400">
                    No tickets in this stage
                  </div>
                ) : (
                  column.tickets.map((ticket) => (
                    <article
                      key={ticket.id}
                      className="group rounded-hand-xl border border-surface-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-plum-300 hover:shadow-sm"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold",
                            ticket.priority === "Urgent" && "bg-red-50 text-red-600",
                            ticket.priority === "High" && "bg-orange-50 text-orange-600",
                            ticket.priority === "Medium" && "bg-amber-50 text-amber-700",
                            ticket.priority === "Low" && "bg-emerald-50 text-emerald-700",
                          )}
                        >
                          {ticket.priority}
                        </span>
                        <span className="text-[10px] font-medium text-surface-400">
                          {ticket.pointOfContact}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold leading-snug text-navy-800">
                        {ticket.title}
                      </h3>
                      {ticket.summary && (
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-surface-500">
                          {ticket.summary}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-surface-100 pt-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-surface-500">
                          <PortfolioDot portfolio={ticket.portfolio as Portfolio} />
                          {ticket.portfolio}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-surface-500">
                          <CalendarDays className="h-3 w-3" />
                          Due {formatDate(ticket.deadline)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-surface-500">
                          <User className="h-3 w-3" />
                          {ticket.assignedTo || "Unassigned"}
                        </span>
                      </div>

                      <Link
                        href={`/submit?edit=${ticket.id}`}
                        className="mt-3 flex items-center justify-center gap-1.5 rounded-hand border border-surface-200 bg-surface-50 px-2 py-1.5 text-xs font-bold text-navy-700 transition-colors hover:border-plum-300 hover:bg-plum-50 hover:text-plum-700"
                      >
                        <Edit3 className="h-3 w-3" />
                        Edit submission
                      </Link>
                    </article>
                  ))
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
