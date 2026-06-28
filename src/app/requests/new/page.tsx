"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft, ChevronRight, Check, Upload,
  X, ArrowLeft, Send, Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Portfolio, PORTFOLIOS, PORTFOLIO_COLORS,
  GraphicType, GRAPHIC_TYPES,
  NewTicketForm, Ticket,
} from "@/types";
import { defaultFormValues, mockTickets } from "@/lib/mock-data";
import { useTickets } from "@/lib/ticket-context";

const STEPS = [
  { num: 1, label: "Portfolio", desc: "Select portfolio & contact" },
  { num: 2, label: "Type", desc: "What do you need?" },
  { num: 3, label: "Event", desc: "Event details" },
  { num: 4, label: "Creative", desc: "Creative vision" },
  { num: 5, label: "References", desc: "Upload inspiration" },
  { num: 6, label: "Review", desc: "Review & submit" },
];

export default function NewRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<NewTicketForm>({ ...defaultFormValues });
  const [isEditing, setIsEditing] = useState(false);

  // Load ticket data if editing
  useEffect(() => {
    if (editId) {
      const ticket = mockTickets.find((t) => t.id === editId);
      if (ticket) {
        setIsEditing(true);
        setForm({
          portfolio: ticket.portfolio,
          pointOfContact: ticket.pointOfContact,
          isCollaboration: ticket.isCollaboration,
          collaborators: ticket.collaborators,
          graphicTypes: ticket.graphicTypes,
          eventName: ticket.eventName,
          eventDate: ticket.eventDate,
          eventTime: ticket.eventTime,
          eventLocation: ticket.eventLocation,
          summary: ticket.summary,
          deadline: ticket.deadline,
          creativeVision: ticket.creativeVision,
          references: ticket.references,
          additionalRequests: ticket.additionalRequests,
        });
      }
    }
  }, [editId]);

  const update = (partial: Partial<NewTicketForm>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  };

  const toggleGraphicType = (g: GraphicType) => {
    setForm((prev) => ({
      ...prev,
      graphicTypes: prev.graphicTypes.includes(g)
        ? prev.graphicTypes.filter((t) => t !== g)
        : [...prev.graphicTypes, g],
    }));
  };

  const addCollaborator = () => {
    const name = prompt("Enter collaborator name:");
    if (name && name.trim()) {
      setForm((prev) => ({
        ...prev,
        collaborators: [...prev.collaborators, name.trim()],
      }));
    }
  };

  const removeCollaborator = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((_, i) => i !== idx),
    }));
  };

  const addReference = () => {
    const url = prompt("Enter reference URL:");
    if (url && url.trim()) {
      setForm((prev) => ({
        ...prev,
        references: [...prev.references, url.trim()],
      }));
    }
  };

  const removeReference = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== idx),
    }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return form.portfolio !== null && form.pointOfContact.trim().length > 0;
      case 2: return form.graphicTypes.length > 0;
      case 3: return form.eventName.trim().length > 0 && form.deadline.trim().length > 0;
      case 4: return form.creativeVision.trim().length > 0;
      default: return true;
    }
  };

  const handleSubmit = () => {
    // Mock submission — in real app, would POST to API
    alert("Request submitted successfully! (Mock)");
    router.push("/requests");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade-in">
      {/* Back button */}
      <Link href="/requests" className="btn-ghost text-xs mb-4">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to requests
      </Link>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                step > s.num
                  ? "bg-accent-500 text-white"
                  : step === s.num
                  ? "bg-accent-500 text-white ring-4 ring-accent-100"
                  : "bg-surface-200 text-surface-500"
              )}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={cn(
                "text-xs mt-1.5 font-medium",
                step >= s.num ? "text-surface-700" : "text-surface-400"
              )}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "w-16 h-0.5 mx-2 mt-[-1.5rem] transition-colors duration-300",
                step > s.num ? "bg-accent-500" : "bg-surface-200"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Card container */}
      <div className="card p-8">
        <div className="min-h-[300px]">
          {/* Step 1: Portfolio & Contact */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h2 className="text-lg font-semibold text-surface-900">Select Portfolio</h2>
                <p className="text-sm text-surface-400 mt-1">Which portfolio does this request belong to?</p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {PORTFOLIOS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setForm((prev) => ({ ...prev, portfolio: p }))}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                      form.portfolio === p
                        ? "border-accent-500 bg-accent-50"
                        : "border-surface-200 bg-white hover:border-surface-300 hover:shadow-sm"
                    )}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${PORTFOLIO_COLORS[p]}20` }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: PORTFOLIO_COLORS[p] }}
                      />
                    </div>
                    <span className="text-xs font-medium text-surface-700">{p}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-1">
                <label className="label">Point of Contact</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Your name"
                  value={form.pointOfContact}
                  onChange={(e) => setForm((prev) => ({ ...prev, pointOfContact: e.target.value }))}
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-surface-300 text-accent-500 focus:ring-accent-500"
                    checked={form.isCollaboration}
                    onChange={(e) => setForm((prev) => ({ ...prev, isCollaboration: e.target.checked }))}
                  />
                  <span className="text-sm text-surface-700">This is a collaboration</span>
                </label>
              </div>
              {form.isCollaboration && (
                <div className="space-y-2">
                  <label className="label">Collaborators</label>
                  <div className="flex flex-wrap gap-2">
                    {form.collaborators.map((c, i) => (
                      <span key={i} className="chip bg-surface-100 text-surface-600">
                        {c}
                        <button onClick={() => removeCollaborator(i)} className="hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <button onClick={addCollaborator} className="chip border border-dashed border-surface-300 text-surface-400 hover:border-accent-500 hover:text-accent-500">
                      + Add collaborator
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Graphic Type */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h2 className="text-lg font-semibold text-surface-900">What do you need?</h2>
                <p className="text-sm text-surface-400 mt-1">Select all that apply</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GRAPHIC_TYPES.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGraphicType(g)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                      form.graphicTypes.includes(g)
                        ? "border-accent-500 bg-accent-50"
                        : "border-surface-200 bg-white hover:border-surface-300"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                      form.graphicTypes.includes(g)
                        ? "border-accent-500 bg-accent-500"
                        : "border-surface-300"
                    )}>
                      {form.graphicTypes.includes(g) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-surface-700">{g}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Event Details */}
          {step === 3 && (
            <div className="space-y-5 animate-slide-up">
              <div>
                <h2 className="text-lg font-semibold text-surface-900">Event Details</h2>
                <p className="text-sm text-surface-400 mt-1">Tell us about the event or content</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="label">Event / Activity Name</label>
                  <input type="text" className="input-field" placeholder="e.g. Fall Recruitment"
                    value={form.eventName} onChange={(e) => setForm((prev) => ({ ...prev, eventName: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="label">Date</label>
                  <input type="date" className="input-field"
                    value={form.eventDate} onChange={(e) => setForm((prev) => ({ ...prev, eventDate: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="label">Time</label>
                  <input type="text" className="input-field" placeholder="e.g. 10:00 AM"
                    value={form.eventTime} onChange={(e) => setForm((prev) => ({ ...prev, eventTime: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="label">Location</label>
                  <input type="text" className="input-field" placeholder="e.g. Student Center"
                    value={form.eventLocation} onChange={(e) => setForm((prev) => ({ ...prev, eventLocation: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="label">
                    Posting Deadline
                    <span className="text-surface-400 font-normal ml-1">(ideally 2+ weeks before)</span>
                  </label>
                  <input type="date" className="input-field"
                    value={form.deadline} onChange={(e) => setForm((prev) => ({ ...prev, deadline: e.target.value }))} />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="label">Summary</label>
                  <textarea className="input-field min-h-[80px] resize-none" placeholder="Brief description of the event/content..."
                    value={form.summary} onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))} />
                </div>
              </div>
            </div>
          )}
          {/* Step 4: Creative Vision */}
          {step === 4 && (
            <div className="space-y-5 animate-slide-up">
              <div>
                <h2 className="text-lg font-semibold text-surface-900">Creative Vision</h2>
                <p className="text-sm text-surface-400 mt-1">Describe your vision in detail</p>
              </div>
              <div className="space-y-1">
                <label className="label">Describe your creative vision</label>
                <textarea
                  className="input-field min-h-[160px] resize-none"
                  placeholder="Include desired colors, style, required text, branding guidelines, references, inspiration..."
                  value={form.creativeVision}
                  onChange={(e) => setForm((prev) => ({ ...prev, creativeVision: e.target.value }))}
                />
                <p className="text-xs text-surface-400 mt-1">Be as detailed as possible to help the designer.</p>
              </div>
              <div className="space-y-1">
                <label className="label">Additional Requests (Optional)</label>
                <textarea
                  className="input-field min-h-[80px] resize-none"
                  placeholder="Anything else we should know?"
                  value={form.additionalRequests}
                  onChange={(e) => setForm((prev) => ({ ...prev, additionalRequests: e.target.value }))}
                />
              </div>
            </div>
          )}

          {/* Step 5: References */}
          {step === 5 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h2 className="text-lg font-semibold text-surface-900">References & Inspiration</h2>
                <p className="text-sm text-surface-400 mt-1">Share URLs or files that inspire the design</p>
              </div>
              <div className="border-2 border-dashed border-surface-200 rounded-xl p-8 text-center hover:border-accent-300 transition-colors cursor-pointer" onClick={addReference}>
                <Upload className="w-8 h-8 text-surface-300 mx-auto mb-3" />
                <p className="text-sm text-surface-500">Click to add a reference URL</p>
                <p className="text-xs text-surface-400 mt-1">Dribbble, Pinterest, Figma links, etc.</p>
              </div>
              {form.references.length > 0 && (
                <div className="space-y-2">
                  <label className="label">Added References ({form.references.length})</label>
                  {form.references.map((ref, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                      <div className="flex items-center gap-2 min-w-0">
                        <Image className="w-4 h-4 text-surface-400 shrink-0" />
                        <span className="text-sm text-surface-600 truncate">{ref}</span>
                      </div>
                      <button onClick={() => removeReference(i)} className="text-surface-400 hover:text-red-500 shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 6: Review */}
          {step === 6 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h2 className="text-lg font-semibold text-surface-900">Review & Submit</h2>
                <p className="text-sm text-surface-400 mt-1">Please review all the details before submitting</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Portfolio</p>
                    <p className="text-sm font-medium text-surface-800 mt-1">{form.portfolio}</p>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Point of Contact</p>
                    <p className="text-sm font-medium text-surface-800 mt-1">{form.pointOfContact}</p>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Graphic Types</p>
                    <p className="text-sm font-medium text-surface-800 mt-1">{form.graphicTypes.join(", ")}</p>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Collaboration</p>
                    <p className="text-sm font-medium text-surface-800 mt-1">{form.isCollaboration ? `Yes - ${form.collaborators.join(", ")}` : "No"}</p>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Event</p>
                    <p className="text-sm font-medium text-surface-800 mt-1">{form.eventName}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{form.eventDate} {form.eventTime} | {form.eventLocation}</p>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Deadline</p>
                    <p className="text-sm font-medium text-surface-800 mt-1">{form.deadline}</p>
                  </div>
                </div>
                <div className="p-4 bg-surface-50 rounded-xl">
                  <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Summary</p>
                  <p className="text-sm text-surface-700 mt-1">{form.summary || "-"}</p>
                </div>
                <div className="p-4 bg-surface-50 rounded-xl">
                  <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Creative Vision</p>
                  <p className="text-sm text-surface-700 mt-1 whitespace-pre-wrap">{form.creativeVision}</p>
                </div>
                {form.references.length > 0 && (
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">References ({form.references.length})</p>
                    <ul className="text-sm text-surface-700 mt-1 list-disc list-inside">
                      {form.references.map((r, i) => (<li key={i}>{r}</li>))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-100">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="btn-secondary text-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-400">Step {step} of 6</span>
          </div>
          {step < 6 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="btn-primary text-xs"
            >
              Continue
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
