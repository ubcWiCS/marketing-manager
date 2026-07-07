"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const buttonStyles = {
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-navy-900",
    info: "bg-plum-500 hover:bg-plum-600 text-white",
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-hand-xl shadow-lg max-w-sm w-full animate-slide-up">
        <div className="flex items-start justify-between mb-4 p-4 border-b border-surface-200">
          <h3 className="text-lg font-bold text-navy-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-surface-400 hover:text-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-surface-600 mb-6 px-4">{message}</p>
        <div className="flex gap-2 justify-end p-4 pt-0">
          <button
            onClick={onClose}
            className="btn-brutal-secondary text-xs"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn("btn-brutal-primary text-xs", buttonStyles[variant])}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}