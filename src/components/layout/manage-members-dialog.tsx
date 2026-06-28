"use client";

import { useState } from "react";
import { X, Plus, Pencil, Check, Trash2 } from "lucide-react";
import { useTeamMembers } from "@/lib/team-context";
import { useTickets } from "@/lib/ticket-context";
import { cn } from "@/lib/utils";

interface ManageMembersDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ManageMembersDialog({ open, onClose }: ManageMembersDialogProps) {
  const { members, addMember, removeMember, renameMember } = useTeamMembers();
  const { unassignMember } = useTickets();
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  if (!open) return null;

  const handleAdd = () => {
    if (newName.trim()) {
      addMember(newName);
      setNewName("");
    }
  };

  const handleStartEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleSaveEdit = (id: string) => {
    if (editName.trim()) {
      renameMember(id, editName);
    }
    setEditingId(null);
    setEditName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") action();
    if (e.key === "Escape") {
      setEditingId(null);
      setEditName("");
      setNewName("");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 animate-fade-in"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-100">
            <h2 className="text-sm font-semibold text-surface-900">Manage Team</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Members list */}
          <div className="max-h-64 overflow-y-auto px-4 py-2 space-y-1">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-50 group transition-colors"
              >
                {editingId === member.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleSaveEdit(member.id))}
                      className="flex-1 text-xs px-2 py-1 border border-accent-300 rounded-md outline-none focus:ring-1 focus:ring-accent-300"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(member.id)}
                      className="p-1 rounded text-green-600 hover:bg-green-50 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-[10px] font-semibold shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <span className="flex-1 text-xs text-surface-700 truncate">{member.name}</span>
                    <button
                      onClick={() => handleStartEdit(member.id, member.name)}
                      className="p-1 rounded text-surface-400 opacity-0 group-hover:opacity-100 hover:text-accent-600 hover:bg-accent-50 transition-all"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { unassignMember(member.name); removeMember(member.id); }}
                      className="p-1 rounded text-surface-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            ))}
            {members.length === 0 && (
              <p className="text-xs text-surface-400 text-center py-4">No team members yet.</p>
            )}
          </div>

          {/* Add member */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-surface-100">
            <input
              type="text"
              placeholder="Add a team member..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleAdd)}
              className="flex-1 text-xs px-3 py-1.5 border border-surface-200 rounded-md outline-none focus:border-accent-300 focus:ring-1 focus:ring-accent-300"
            />
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                newName.trim()
                  ? "bg-accent-500 text-white hover:bg-accent-600"
                  : "bg-surface-100 text-surface-400 cursor-not-allowed"
              )}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
