"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Clock, Calendar, MapPin, User,
  Paperclip, Edit3, Archive, Trash2,
} from "lucide-react";
import { useTickets } from "@/lib/ticket-context";
import { cn, formatDate, formatDateTime, timeAgo, isOverdue, getDeadlineColor } from "@/lib/utils";
import { SkeletonDetail } from "@/components/ui/skeleton";
import { PortfolioBadge } from "@/components/ui/portfolio-badge";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { RequestStatus, REQUEST_STATUSES, Priority, PRIORITIES, PORTFOLIO_COLORS } from "@/types";

export default function RequestDetailPage() {
  const params = useParams();
  const { tickets, archiveTicket, deleteTicket } = useTickets();
  const ticket = tickets.find((t) => t.id === params.id);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!ticket) {
    return (
      <div className="p-6 max-w-4xl mx-auto animate-fade-in">
        <Link href="/requests" className="btn-ghost text-xs mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to requests
        </Link>
        <div className="card p-12 text-center">
          <p className="text-surface-400">Request not found</p>
        </div>
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    Open: "bg-green-500",
    "In Progress": "bg-blue-500",
    "In Review": "bg-amber-500",
    Completed: "bg-purple-500",
    Archived: "bg-gray-500",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      {/* Back */}
      <Link href="/requests" className="btn-ghost text-xs mb-4">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to requests
      </Link>

      {/* Header */}
      <div className="card-hand p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-navy-800">{ticket.title}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => archiveTicket(ticket.id)}
              className="btn-secondary text-xs"
              title="Archive ticket"
            >
              <Archive className="w-3.5 h-3.5" />
              Archive
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="btn-secondary text-xs text-red-600 hover:text-red-700 hover:border-red-300"
              title="Delete ticket"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
            <Link 
              href={`/requests/new?edit=${ticket.id}`}
              className="btn-secondary text-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className={cn("w-2.5 h-2.5 rounded-full", statusColor[ticket.status])} />
            <select
              className="text-sm font-medium text-surface-700 bg-transparent border-none focus:outline-none cursor-pointer"
              value={ticket.status}
              onChange={() => {}}
            >
              {REQUEST_STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 text-surface-400 text-sm">
            <User className="w-4 h-4" />
            <span>{ticket.pointOfContact}</span>
          </div>
          <div className="flex items-center gap-2 text-surface-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Created {formatDateTime(ticket.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-surface-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>Updated {timeAgo(ticket.updatedAt)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Graphic Types - Prominent Central Card */}
        <div className="card-hand p-6 bg-plum-50/30 border-plum-200">
          <h2 className="text-sm font-semibold text-surface-900 mb-4">What Needs to be Made</h2>
          <div className="flex flex-wrap gap-2">
            {ticket.graphicTypes.map((g, i) => (
              <span key={i} className="chip bg-plum-500 text-white text-sm px-4 py-2 font-medium">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Details Card */}
        <div className="card-hand p-5">
          <h2 className="text-sm font-semibold text-navy-800 mb-4">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <p className="text-xs text-surface-400 font-medium">Name / Title</p>
              <p className="text-sm text-surface-800 mt-0.5">{ticket.eventName}</p>
            </div>
            {ticket.eventTime && (
              <div>
                <p className="text-xs text-surface-400 font-medium">Time</p>
                <p className="text-sm text-surface-800 mt-0.5">{ticket.eventTime}</p>
              </div>
            )}
            {ticket.eventLocation && (
              <div>
                <p className="text-xs text-surface-400 font-medium">Location</p>
                <p className="text-sm text-surface-800 mt-0.5">{ticket.eventLocation}</p>
              </div>
            )}
            <div className="col-span-2">
              <p className="text-xs text-surface-400 font-medium">Due Date</p>
              <p className={cn("text-sm mt-0.5 font-medium", getDeadlineColor(ticket.deadline))}>
                {formatDate(ticket.deadline)}
                {isOverdue(ticket.deadline) && " (Overdue)"}
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card-hand p-5">
          <h2 className="text-sm font-semibold text-navy-800 mb-3">Summary</h2>
          <p className="text-sm text-navy-600 leading-relaxed">{ticket.summary}</p>
        </div>

        {/* Creative Vision */}
        <div className="card-hand p-5">
          <h2 className="text-sm font-semibold text-navy-800 mb-3">Creative Vision</h2>
          <p className="text-sm text-navy-600 leading-relaxed whitespace-pre-wrap">{ticket.creativeVision}</p>
        </div>

        {/* References */}
        {ticket.references.length > 0 && (
          <div className="card-hand p-5">
            <h2 className="text-sm font-semibold text-navy-800 mb-3">References</h2>
            <div className="space-y-2">
              {ticket.references.map((ref, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-surface-50 rounded-hand">
                  <Paperclip className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-navy-600">{ref}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Requests */}
        {ticket.additionalRequests && (
          <div className="card-hand p-5">
            <h2 className="text-sm font-semibold text-navy-800 mb-3">Additional Requests</h2>
            <p className="text-sm text-navy-600 leading-relaxed">{ticket.additionalRequests}</p>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={() => deleteTicket(ticket.id)}
          title="Delete Ticket"
          message="Are you sure you want to delete this ticket? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </div>
  );
}
