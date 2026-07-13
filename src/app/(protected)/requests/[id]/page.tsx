"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Clock, Calendar, User, UserPlus, UserX,
  Edit3, Trash2,
} from "lucide-react";
import { useTickets } from "@/lib/ticket-context";
import { useTeamMembers } from "@/lib/team-context";
import { formatDate, formatDateTime, timeAgo } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";
import { RequestStatus, REQUEST_STATUSES, Priority, PRIORITIES } from "@/types";

export default function RequestDetailPage() {
  const params = useParams();
  const { tickets, updateTicket, deleteTicket } = useTickets();
  const { members } = useTeamMembers();
  const ticket = tickets.find((t) => t.id === params.id);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!ticket) {
    return (
      <div className="p-6 max-w-4xl mx-auto animate-fade-in">
        <Link href="/requests" className="text-sm font-medium text-navy-700 hover:text-plum-600 flex items-center gap-1 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to requests
        </Link>
        <div className="rounded-hand-xl p-12 text-center bg-white/60">
          <p className="text-navy-700 font-medium">Request not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      {/* Back */}
      <Link href="/requests" className="text-sm font-medium text-navy-700 hover:text-plum-600 flex items-center gap-1 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to requests
      </Link>

      {/* Header */}
      <div className="rounded-hand-xl bg-white/80 p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-medium text-navy-800">{ticket.title}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="text-sm font-medium text-navy-600 hover:text-red-600 rounded-hand px-3 py-1.5 hover:bg-red-50 transition-colors"
              title="Delete ticket"
            >
              <Trash2 className="w-4 h-4 inline" />
              Delete
            </button>
            <Link
              href={`/requests/new?edit=${ticket.id}`}
              className="btn-brutal-primary text-xs py-1 px-3"
            >
              <Edit3 className="w-4 h-4 inline" />
              Edit
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap text-sm">
          <div className="flex items-center gap-1.5">
            <select
              value={ticket.status}
              onChange={(e) => updateTicket(ticket.id, { status: e.target.value as RequestStatus })}
              className={cn(
                "text-sm font-medium px-2 py-1 rounded-hand border border-surface-200 bg-white",
                ticket.status === "Open" && "text-navy-700",
                ticket.status === "In Progress" && "text-amber-700",
                ticket.status === "In Review" && "text-blue-700",
                ticket.status === "Completed" && "text-green-700"
              )}
            >
              {REQUEST_STATUSES.filter((s) => s !== "Archived").map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <select
              value={ticket.priority}
              onChange={(e) => updateTicket(ticket.id, { priority: e.target.value as Priority })}
              className={cn(
                "text-sm font-medium px-2 py-1 rounded-hand border border-surface-200 bg-white",
                ticket.priority === "Urgent" && "text-red-600",
                ticket.priority === "High" && "text-orange-600",
                ticket.priority === "Medium" && "text-amber-600",
                ticket.priority === "Low" && "text-emerald-600"
              )}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5 text-navy-600">
            <User className="w-4 h-4" />
            <span>{ticket.pointOfContact}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <label className="flex items-center gap-1.5 text-sm text-navy-600">
              {ticket.assignedTo ? <UserPlus className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
              <span>Assigned to:</span>
            </label>
            <select
              value={ticket.assignedTo || ""}
              onChange={(e) => updateTicket(ticket.id, { assignedTo: e.target.value || undefined })}
              className={cn(
                "text-sm px-2 py-1 rounded-hand border border-surface-200 bg-white",
                ticket.assignedTo
                  ? "text-plum-700 font-medium"
                  : "text-surface-400"
              )}
            >
              <option value="">Unassigned</option>
              {members.map((m) => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap text-sm mt-3 pt-3 border-t border-surface-100">
          <div className="flex items-center gap-1.5 text-surface-500">
            <Calendar className="w-4 h-4" />
            <span>Created {formatDateTime(ticket.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-surface-500">
            <Clock className="w-4 h-4" />
            <span>Updated {timeAgo(ticket.updatedAt)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* Graphic Types */}
        <div className="rounded-hand-xl bg-plum-50/50 p-5 border border-plum-100">
          <h2 className="text-sm font-medium text-navy-700 mb-3 uppercase">What Needs to be Made</h2>
          <div className="flex flex-wrap gap-1.5">
            {ticket.graphicTypes.map((g, i) => (
              <span key={i} className="text-xs font-medium bg-plum-500 text-white px-2.5 py-1 rounded-full">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Details Card */}
        <div className="rounded-hand-xl bg-white/80 p-5 shadow-sm border border-surface-200">
          <h2 className="text-sm font-medium text-navy-700 mb-3 uppercase">Details</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-navy-500 uppercase">Name</p>
              <p className="text-sm text-navy-800">{ticket.eventName}</p>
            </div>
            {ticket.eventTime && (
              <div>
                <p className="text-xs text-navy-500 uppercase">Time</p>
                <p className="text-sm text-navy-800">{ticket.eventTime}</p>
              </div>
            )}
            {ticket.eventLocation && (
              <div>
                <p className="text-xs text-navy-500 uppercase">Location</p>
                <p className="text-sm text-navy-800">{ticket.eventLocation}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-navy-500 uppercase">Due Date</p>
              <p className={`text-sm font-medium ${new Date(ticket.deadline) < new Date() ? "text-red-600" : "text-navy-800"}`}>
                {formatDate(ticket.deadline)}
                {new Date(ticket.deadline) < new Date() && " (OVERDUE)"}
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-hand-xl bg-white/80 p-5 shadow-sm border border-surface-200">
          <h2 className="text-sm font-medium text-navy-700 mb-2 uppercase">Summary</h2>
          <p className="text-sm text-navy-800 leading-relaxed">{ticket.summary}</p>
        </div>

        {/* Creative Vision */}
        <div className="rounded-hand-xl bg-white/80 p-5 shadow-sm border border-surface-200">
          <h2 className="text-sm font-medium text-navy-700 mb-2 uppercase">Creative Vision</h2>
          <p className="text-sm text-navy-800 leading-relaxed whitespace-pre-wrap">{ticket.creativeVision}</p>
        </div>

        {/* References */}
        {ticket.references.length > 0 && (
          <div className="rounded-hand-xl bg-white/80 p-5 shadow-sm border border-surface-200">
            <h2 className="text-sm font-medium text-navy-700 mb-2 uppercase">References</h2>
            <div className="space-y-1.5">
              {ticket.references.map((ref, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded border border-surface-200 bg-plum-50/30">
                  <span className="text-sm text-navy-700 truncate flex-1">{ref}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Requests */}
        {ticket.additionalRequests && (
          <div className="rounded-hand-xl bg-white/80 p-5 shadow-sm border border-surface-200">
            <h2 className="text-sm font-medium text-navy-700 mb-2 uppercase">Additional Requests</h2>
            <p className="text-sm text-navy-800 leading-relaxed">{ticket.additionalRequests}</p>
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