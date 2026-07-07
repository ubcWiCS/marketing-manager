"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Check, Upload,
  X, ArrowLeft, Send, CheckCircle,
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
  { num: 5, label: "References", desc: "Add inspiration" },
  { num: 6, label: "Review", desc: "Review & submit" },
];

export default function NewRequestPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NewRequestForm />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade-in">
      <div className="rounded-hand-xl p-8">
        Loading...
      </div>
    </div>
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
    deadline: new Date().toISOString().split('T')[0]
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    setShowSuccessModal(true);
    setTimeout(() => {
      router.push("/requests");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade-in">
      <Link href="/requests" className="text-sm font-medium text-navy-700 hover:text-plum-600 flex items-center gap-1 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to requests
      </Link>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6 bg-white/60 rounded-hand-xl p-3">
        {STEPS.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-9 h-9 rounded-full font-medium text-xs flex items-center justify-center transition-all duration-200 bg-white border border-surface-200",
                step > s.num
                  ? "bg-plum-500 text-white border-plum-500"
                  : step === s.num
                  ? "bg-plum-100 text-plum-700 border-plum-300"
                  : "text-surface-500"
              )}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={cn(
                "text-[10px] font-medium mt-1",
                step >= s.num ? "text-navy-700" : "text-surface-400"
              )}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "w-16 h-0.5 mx-1 border-b border-border transition-all duration-200",
                step > s.num ? "border-plum-300" : "border-surface-200"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Card container */}
      <div className="rounded-hand-xl bg-white/80 p-6 shadow-sm">
        {/* Step 1: Portfolio & Contact */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-medium text-navy-800">Select Portfolio</h2>
              <p className="text-sm text-surface-500">Which portfolio does this request belong to?</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PORTFOLIOS.map((p) => (
                <button
                  key={p}
                  onClick={() => setForm((prev) => ({ ...prev, portfolio: p }))}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-hand border transition-all duration-200",
                    form.portfolio === p
                      ? "border-plum-400 bg-plum-50"
                      : "border-surface-200 hover:bg-plum-50/50"
                  )}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${PORTFOLIO_COLORS[p]}` }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <span className="text-xs font-medium text-navy-700">{p}</span>
                </button>
              ))}
            </div>
            <div className="space-y-1">
              <label className="label-brutal">Point of Contact</label>
              <input
                type="text"
                className="input-brutal"
                placeholder="Your name"
                value={form.pointOfContact}
                onChange={(e) => setForm((prev) => ({ ...prev, pointOfContact: e.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Step 2: Graphic Type */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-medium text-navy-800">What do you need?</h2>
              <p className="text-sm text-surface-500">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {GRAPHIC_TYPES.map((g) => (
                <button
                  key={g}
                  onClick={() => toggleGraphicType(g)}
                  className={cn(
                    "flex items-center gap-2 p-2.5 rounded-hand border transition-all duration-200 text-left",
                    form.graphicTypes.includes(g)
                      ? "border-plum-400 bg-plum-50"
                      : "border-surface-200 hover:bg-plum-50/50"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                    form.graphicTypes.includes(g)
                      ? "border-plum-500 bg-plum-500"
                      : "border-surface-300"
                  )}>
                    {form.graphicTypes.includes(g) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-navy-700">{g}</span>
                </button>
              ))}
            </div>
            {form.graphicTypes.includes("Other") && (
              <div className="space-y-1">
                <label className="label-brutal">Please specify</label>
                <input
                  type="text"
                  className="input-brutal"
                  placeholder="Type of media needed..."
                  value={form.otherGraphicType}
                  onChange={(e) => setForm((prev) => ({ ...prev, otherGraphicType: e.target.value }))}
                />
              </div>
            )}
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-medium text-navy-800">Details</h2>
              <p className="text-sm text-surface-500">Tell us about your request</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="label-brutal">Name / Title</label>
                <input 
                  type="text" 
                  className="input-brutal" 
                  placeholder="e.g. Fall Recruitment, Merch Design"
                  value={form.eventName} 
                  onChange={(e) => setForm((prev) => ({ ...prev, eventName: e.target.value }))} 
                />
              </div>
              <div className="space-y-1">
                <label className="label-brutal">Time (Optional)</label>
                <input 
                  type="text" 
                  className="input-brutal" 
                  placeholder="e.g. 10:00 AM"
                  value={form.eventTime} 
                  onChange={(e) => setForm((prev) => ({ ...prev, eventTime: e.target.value }))} 
                />
              </div>
              <div className="space-y-1">
                <label className="label-brutal">Location (Optional)</label>
                <input 
                  type="text" 
                  className="input-brutal" 
                  placeholder="e.g. Student Center"
                  value={form.eventLocation} 
                  onChange={(e) => setForm((prev) => ({ ...prev, eventLocation: e.target.value }))} 
                />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="label-brutal">Due Date</label>
                <input 
                  type="date" 
                  className="input-brutal"
                  value={form.deadline} 
                  onChange={(e) => setForm((prev) => ({ ...prev, deadline: e.target.value }))} 
                />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="label-brutal">Summary</label>
                <textarea 
                  className="input-brutal min-h-[60px] resize-none" 
                  placeholder="Brief description..."
                  value={form.summary} 
                  onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Creative Vision */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-medium text-navy-800">Creative Vision</h2>
              <p className="text-sm text-surface-500">Describe your vision in detail</p>
            </div>
            <div className="space-y-2">
              <label className="label-brutal">Creative vision</label>
              <textarea
                className="input-brutal min-h-[120px] resize-none"
                placeholder="Include desired colors, style, required text, branding guidelines..."
                value={form.creativeVision}
                onChange={(e) => setForm((prev) => ({ ...prev, creativeVision: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="label-brutal">Additional Requests (Optional)</label>
              <textarea
                className="input-brutal min-h-[60px] resize-none"
                placeholder="Anything else we should know?"
                value={form.additionalRequests}
                onChange={(e) => setForm((prev) => ({ ...prev, additionalRequests: e.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Step 5: References */}
        {step === 5 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-medium text-navy-800">References & Inspiration</h2>
              <p className="text-sm text-surface-500">Share URLs that inspire the design</p>
            </div>
            <div className="space-y-2">
              <label className="label-brutal">Add Reference URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input-brutal flex-1 text-sm py-1.5"
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
                  className="btn-brutal-secondary text-sm py-1.5"
                >
                  Add
                </button>
              </div>
            </div>
            {form.references.length > 0 && (
              <div className="space-y-1">
                <label className="label-brutal">Added References ({form.references.length})</label>
                {form.references.map((ref, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded border border-surface-200 bg-plum-50/30">
                    <span className="text-xs text-navy-700 truncate flex-1">{ref}</span>
                    <button 
                      onClick={() => removeReference(i)} 
                      className="text-surface-500 hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 6: Review */}
        {step === 6 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-medium text-navy-800">Review & Submit</h2>
              <p className="text-sm text-surface-500">Please review all details before submitting</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-plum-50/50 rounded-hand">
                <p className="text-xs text-navy-600 font-medium uppercase">Portfolio</p>
                <p className="font-medium text-navy-800">{form.portfolio}</p>
              </div>
              <div className="p-3 bg-plum-50/50 rounded-hand">
                <p className="text-xs text-navy-600 font-medium uppercase">Contact</p>
                <p className="font-medium text-navy-800">{form.pointOfContact}</p>
              </div>
              <div className="p-3 bg-plum-50/50 rounded-hand">
                <p className="text-xs text-navy-600 font-medium uppercase">Types</p>
                <p className="font-medium text-navy-800">{form.graphicTypes.join(", ")}</p>
              </div>
              <div className="p-3 bg-plum-50/50 rounded-hand">
                <p className="text-xs text-navy-600 font-medium uppercase">Due</p>
                <p className="font-medium text-navy-800">{form.deadline}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-hand-xl shadow-lg max-w-sm w-full p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-plum-100 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-plum-600" />
              </div>
              <h3 className="text-lg font-medium text-navy-800 mb-2">Request Submitted!</h3>
              <p className="text-sm text-surface-600 mb-4">Your request has been successfully submitted.</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-200">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="text-sm font-medium text-navy-600 hover:text-plum-600"
          >
            <ChevronLeft className="w-4 h-4 inline" />
            Back
          </button>
          <span className="text-xs text-surface-500">Step {step} of 6</span>
          {step < 6 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="btn-brutal-primary text-sm py-1.5"
            >
              Continue
              <ChevronRight className="w-4 h-4 inline" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-brutal-primary text-sm py-1.5">
              <Send className="w-4 h-4 inline" />
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}