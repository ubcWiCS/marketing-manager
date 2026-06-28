"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Clock, Calendar, MapPin, User,
  Paperclip, Edit3,
} from "lucide-react";
import { mockTickets } from "@/lib/mock-data";
import { cn, formatDate, formatDateTime, timeAgo, getDeadlineColor, isOverdue } from "@/lib/utils";
import { PortfolioBadge } from "@/components/ui/portfolio-badge";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { RequestStatus, REQUEST_STATUSES, Priority, PRIORITIES, PORTFOLIO_COLORS } from "@/types";

export default function RequestDetailPage() {
  const params = useParams();
  const ticket = mockTickets.find((t) => t.id === params.id);

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
      <div className="card p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-surface-900">{ticket.title}</h1>
          </div>
          <Link 
            href={`/requests/new?edit=${ticket.id}`}
            className="btn-secondary text-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </Link>
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

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Event Details */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-surface-900 mb-4">Event Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-surface-400 font-medium">Event Name</p>
                <p className="text-sm text-surface-800 mt-0.5">{ticket.eventName}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">Date & Time</p>
                <p className="text-sm text-surface-800 mt-0.5">{ticket.eventDate} at {ticket.eventTime}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">Location</p>
                <p className="text-sm text-surface-800 mt-0.5">{ticket.eventLocation}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">Deadline</p>
                <p className={cn("text-sm mt-0.5 font-medium", getDeadlineColor(ticket.deadline))}>
                  {formatDate(ticket.deadline)}
                  {isOverdue(ticket.deadline) && " (Overdue)"}
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-surface-900 mb-3">Summary</h2>
            <p className="text-sm text-surface-600 leading-relaxed">{ticket.summary}</p>
          </div>

          {/* Creative Vision */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-surface-900 mb-3">Creative Vision</h2>
            <p className="text-sm text-surface-600 leading-relaxed whitespace-pre-wrap">{ticket.creativeVision}</p>
          </div>

          {/* References */}
          {ticket.references.length > 0 && (
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-surface-900 mb-3">References</h2>
              <div className="space-y-2">
                {ticket.references.map((ref, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-surface-50 rounded-lg">
                    <Paperclip className="w-4 h-4 text-surface-400" />
                    <span className="text-sm text-surface-600">{ref}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Requests */}
          {ticket.additionalRequests && (
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-surface-900 mb-3">Additional Requests</h2>
              <p className="text-sm text-surface-600 leading-relaxed">{ticket.additionalRequests}</p>
            </div>
          )}


        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-surface-900 mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-surface-400 font-medium">Created By</p>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar name={ticket.createdBy} size="sm" />
                  <span className="text-sm text-surface-800">{ticket.createdBy}</span>
                </div>
              </div>
              {ticket.isCollaboration && (
                <div>
                  <p className="text-xs text-surface-400 font-medium">Collaborators</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {ticket.collaborators.map((c, i) => (
                      <span key={i} className="chip bg-surface-100 text-surface-600">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-surface-400 font-medium">Graphic Types</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {ticket.graphicTypes.map((g, i) => (
                    <span key={i} className="chip bg-accent-50 text-accent-600">{g}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-surface-900 mb-4">Activity</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs text-surface-600">Status changed to <span className="font-medium">In Progress</span></p>
                  <p className="text-[10px] text-surface-400 mt-0.5">{timeAgo(ticket.updatedAt)}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs text-surface-600">Request created</p>
                  <p className="text-[10px] text-surface-400 mt-0.5">{timeAgo(ticket.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
