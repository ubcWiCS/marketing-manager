"use client";

import { useState } from "react";
import { X, Plus, Pencil, Check, Trash2 } from "lucide-react";
import { useTeamMembers } from "@/lib/team-context";
import { useTickets } from "@/lib/ticket-context";

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
        className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-hand-xl shadow-lg w-full max-w-sm animate-slide-up" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200">
            <h2 className="text-sm font-medium text-navy-800">Manage Team</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-plum-50 rounded transition-colors"
            >
              <X className="w-4 h-4 text-surface-500" />
            </button>
          </div>

          {/* Members list */}
          <div className="max-h-64 overflow-y-auto px-4 py-2 space-y-1">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-plum-50 transition-colors"
              >
                {editingId === member.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleSaveEdit(member.id))}
                      className="flex-1 text-sm px-2 py-1 border border-surface-200 rounded focus:outline-none focus:ring-2 focus:ring-plum-200"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(member.id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full bg-plum-100 text-plum-700 flex items-center justify-center text-[10px] font-medium">
                      {member.name.charAt(0)}
                    </div>
                    <span className="flex-1 text-sm text-navy-800 truncate">{member.name}</span>
                    <button
                      onClick={() => handleStartEdit(member.id, member.name)}
                      className="p-1 text-surface-500 hover:text-navy-800 rounded transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { unassignMember(member.name); removeMember(member.id); }}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            ))}
            {members.length === 0 && (
              <p className="text-sm text-surface-500 text-center py-4">No team members yet.</p>
            )}
          </div>

          {/* Add member */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-surface-200">
            <input
              type="text"
              placeholder="Add a team member..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleAdd)}
              className="flex-1 text-sm px-3 py-1.5 border border-surface-200 rounded font-medium focus:outline-none focus:ring-2 focus:ring-plum-200"
            />
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className="p-2 rounded bg-plum-500 text-white hover:bg-plum-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}