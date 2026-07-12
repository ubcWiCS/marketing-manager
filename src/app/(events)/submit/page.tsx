"use client";

import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Check,
  X, Send, CheckCircle, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Portfolio, PORTFOLIO_COLORS,
  GraphicType, GRAPHIC_TYPES,
  NewTicketForm,
} from "@/types";
import { useTickets } from "@/lib/ticket-context";
import { TicketProvider } from "@/lib/ticket-context";

const EVENT_PORTFOLIOS: Portfolio[] = ["Community", "Mentorship", "External"];


const STEPS = [
  { num: 1, label: "Portfolio", desc: "Select portfolio & contact" },
  { num: 2, label: "Type", desc: "What do you need?" },
  { num: 3, label: "Event", desc: "Event details" },
  { num: 4, label: "Creative", desc: "Creative vision" },
  { num: 5, label: "References", desc: "Add inspiration" },
  { num: 6, label: "Review", desc: "Review & submit" },
];

const defaultFormValues: NewTicketForm = {
  portfolio: null,
  pointOfContact: "",
  graphicTypes: [],
  otherGraphicType: "",
  eventName: "",
  eventDate: "",
  eventTime: "",
  eventLocation: "",
  summary: "",
  deadline: "",
  creativeVision: "",
  references: [],
  additionalRequests: "",
};

function SubmitForm() {
  const { createTicket } = useTickets();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<NewTicketForm>({
    ...defaultFormValues,
    deadline: new Date().toISOString().split("T")[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    try {
      setSubmitError(null);
      await createTicket({
        title: form.eventName,
        portfolio: form.portfolio!,
        pointOfContact: form.pointOfContact,
        isCollaboration: false,
        collaborators: [],
        graphicTypes: form.graphicTypes,
        otherGraphicType: form.otherGraphicType,
        eventName: form.eventName,
        eventDate: form.eventDate,
        eventTime: form.eventTime,
        eventLocation: form.eventLocation,
        summary: form.summary,
        deadline: form.deadline,
        creativeVision: form.creativeVision,
        references: form.references,
        additionalRequests: form.additionalRequests,
        createdBy: form.pointOfContact,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit request");
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setStep(1);
    setForm({
      ...defaultFormValues,
      deadline: new Date().toISOString().split("T")[0],
    });
    setSubmitError(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-surface-200 bg-white/80 shrink-0 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-plum-400 flex items-center justify-center">
            <span className="text-navy-950 text-xs font-black">M</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-navy-800 leading-none">Marketing Requests</h1>
            <p className="text-[10px] text-surface-500 leading-none mt-0.5">Events Team Portal</p>
          </div>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-1.5 text-xs font-medium text-surface-500 hover:text-navy-700 transition-colors px-2 py-1.5 rounded hover:bg-white/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </form>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center p-6">
        <div className="w-full max-w-2xl">

          {/* Success state */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-plum-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-plum-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-800 mb-2">Request Submitted!</h2>
              <p className="text-surface-600 mb-6 max-w-sm">
                Your request has been sent to the Marketing team. You will hear from them with updates.
              </p>
              <button
                onClick={handleSubmitAnother}
                className="btn-brutal-primary text-sm"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <>
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
                    <div className="grid grid-cols-3 gap-3">
                      {EVENT_PORTFOLIOS.map((p) => (
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
                        <label className="label-brutal">Event Date</label>
                        <input
                          type="date"
                          className="input-brutal"
                          value={form.eventDate}
                          onChange={(e) => setForm((prev) => ({ ...prev, eventDate: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="label-brutal">Event Time (Optional)</label>
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
                      <div className="space-y-1">
                        <label className="label-brutal">Marketing Due Date</label>
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
                          id="ref-input"
                          type="text"
                          className="input-brutal flex-1 text-sm py-1.5"
                          placeholder="https://..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addReference((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = "";
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById("ref-input") as HTMLInputElement;
                            addReference(input.value);
                            input.value = "";
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
                        <p className="text-xs text-navy-600 font-medium uppercase">Event Date</p>
                        <p className="font-medium text-navy-800">{form.eventDate || "—"}</p>
                      </div>
                      <div className="p-3 bg-plum-50/50 rounded-hand">
                        <p className="text-xs text-navy-600 font-medium uppercase">Marketing Due Date</p>
                        <p className="font-medium text-navy-800">{form.deadline}</p>
                      </div>
                      <div className="col-span-2 p-3 bg-plum-50/50 rounded-hand">
                        <p className="text-xs text-navy-600 font-medium uppercase">Event / Title</p>
                        <p className="font-medium text-navy-800">{form.eventName}</p>
                      </div>
                      {form.summary && (
                        <div className="col-span-2 p-3 bg-plum-50/50 rounded-hand">
                          <p className="text-xs text-navy-600 font-medium uppercase">Summary</p>
                          <p className="font-medium text-navy-800">{form.summary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Error banner */}
                {submitError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-hand">
                    <p className="text-sm font-medium text-red-700">Failed to submit request</p>
                    <p className="text-xs text-red-600 mt-1">{submitError}</p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-200">
                  <button
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className="text-sm font-medium text-navy-600 hover:text-plum-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4 inline" />
                    Back
                  </button>
                  <span className="text-xs text-surface-500">Step {step} of 6</span>
                  {step < 6 ? (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canProceed()}
                      className="btn-brutal-primary text-sm py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SubmitPage() {
  return (
    <TicketProvider>
      <SubmitForm />
    </TicketProvider>
  );
}
