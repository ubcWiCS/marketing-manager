"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Check, Upload,
  X, ArrowLeft, Send, Image, CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Portfolio, PORTFOLIOS, PORTFOLIO_COLORS,
  GraphicType, GRAPHIC_TYPES,
  NewTicketForm, Ticket,
} from "@/types";
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
  return (
    <Suspense fallback={<div className="p-6 max-w-3xl mx-auto animate-fade-in"><div className="card p-8">Loading...</div></div>}>
      <NewRequestForm />
    </Suspense>
  );
}

function NewRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { tickets } = useTickets();
  const [step, setStep] = useState(1);
  const defaultFormValues: NewTicketForm = {
    portfolio: null,
    pointOfContact: "",
    graphicTypes: [],
    otherGraphicType: "",
    eventName: "",
    eventTime: "",
    eventLocation: "",
    summary: "",
    deadline: "",
    creativeVision: "",
    references: [],
    additionalRequests: "",
  };

  const [form, setForm] = useState<NewTicketForm>({ 
    ...defaultFormValues,
    deadline: new Date().toISOString().split('T')[0] // Auto-set to today's date
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Load ticket data if editing
  useEffect(() => {
    if (editId) {
      const ticket = tickets.find((t) => t.id === editId);
      if (ticket) {
        setIsEditing(true);
        setForm({
          portfolio: ticket.portfolio,
          pointOfContact: ticket.pointOfContact,
          graphicTypes: ticket.graphicTypes,
          otherGraphicType: "",
          eventName: ticket.eventName,
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

  const addReference = (url: string) => {
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
    setShowSuccessModal(true);
    setTimeout(() => {
      router.push("/requests");
    }, 2000);
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
    ? "bg-plum-500 text-white"
    : step === s.num
    ? "bg-plum-500 text-white ring-4 ring-plum-100"
    : "bg-surface-200 text-surface-500"
)}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={cn(
                "text-xs mt-1.5 font-medium",
                step >= s.num ? "text-navy-700" : "text-surface-400"
              )}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "w-16 h-0.5 mx-2 mt-[-1.5rem] transition-colors duration-300",
                step > s.num ? "bg-plum-500" : "bg-surface-200"
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
                        ? "border-plum-500 bg-plum-50"
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
                        ? "border-plum-500 bg-plum-50"
                        : "border-surface-200 bg-white hover:border-surface-300"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                      form.graphicTypes.includes(g)
                        ? "border-plum-500 bg-plum-500"
                        : "border-surface-300"
                    )}>
                      {form.graphicTypes.includes(g) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-surface-700">{g}</span>
                  </button>
                ))}
              </div>
              {form.graphicTypes.includes("Other") && (
                <div className="space-y-2">
                  <label className="label">Please specify the type of media</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Poster, Banner, Business Card, etc."
                    value={form.otherGraphicType}
                    onChange={(e) => setForm((prev) => ({ ...prev, otherGraphicType: e.target.value }))}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="space-y-5 animate-slide-up">
              <div>
                <h2 className="text-lg font-semibold text-surface-900">Details</h2>
                <p className="text-sm text-surface-400 mt-1">Tell us about your request</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="label">Name / Title</label>
                  <input type="text" className="input-field" placeholder="e.g. Fall Recruitment, Merch Design, Sticker Pack"
                    value={form.eventName} onChange={(e) => setForm((prev) => ({ ...prev, eventName: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="label">Time (Optional)</label>
                  <input type="text" className="input-field" placeholder="e.g. 10:00 AM"
                    value={form.eventTime} onChange={(e) => setForm((prev) => ({ ...prev, eventTime: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="label">Location (Optional)</label>
                  <input type="text" className="input-field" placeholder="e.g. Student Center, Online, N/A"
                    value={form.eventLocation} onChange={(e) => setForm((prev) => ({ ...prev, eventLocation: e.target.value }))} />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="label">
                    Due Date
                    <span className="text-surface-400 font-normal ml-1">(when do you need this by?)</span>
                  </label>
                  <input type="date" className="input-field"
                    value={form.deadline} onChange={(e) => setForm((prev) => ({ ...prev, deadline: e.target.value }))} />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="label">Summary</label>
                  <textarea className="input-field min-h-[80px] resize-none" placeholder="Brief description of what you need..."
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
                <p className="text-sm text-surface-400 mt-1">Share URLs that inspire the design</p>
              </div>
              <div className="space-y-2">
                <label className="label">Add Reference URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input-field flex-1"
                    placeholder="https://..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addReference((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addReference(input.value);
                      input.value = '';
                    }}
                    className="btn-primary text-xs"
                  >
                    Add
                  </button>
                </div>
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
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Name / Title</p>
                    <p className="text-sm font-medium text-surface-800 mt-1">{form.eventName}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{form.eventTime} | {form.eventLocation}</p>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <p className="text-xs text-surface-400 font-medium uppercase tracking-wide">Due Date</p>
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

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-sm w-full shadow-2xl animate-slide-up">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-plum-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-plum-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-2">Request Submitted!</h3>
                <p className="text-sm text-surface-500 mb-6">Your request has been successfully submitted. Redirecting to all requests...</p>
                <div className="w-full bg-surface-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-plum-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

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