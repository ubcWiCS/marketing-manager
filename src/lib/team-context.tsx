"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TeamMember } from "@/types";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const membersRef = collection(db, "team_members");

interface TeamContextType {
  members: TeamMember[];
  addMember: (name: string) => Promise<void>;
  removeMember: (id: string) => Promise<void>;
  renameMember: (id: string, name: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team members from Firestore
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(membersRef);
      setMembers(
        snapshot.docs
          .map((d) => ({ id: d.id, name: d.data().name as string }))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (name: string) => {
    try {
      setError(null);
      const trimmed = name.trim();
      if (members.some((m) => m.name.toLowerCase() === trimmed.toLowerCase())) {
        throw new Error(`Team member "${trimmed}" already exists`);
      }
      const ref = await addDoc(membersRef, { name: trimmed, createdAt: new Date().toISOString() });
      setMembers((prev) => [...prev, { id: ref.id, name: trimmed }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add team member');
      throw err;
    }
  };

  const removeMember = async (id: string) => {
    try {
      setError(null);
      await deleteDoc(doc(db, "team_members", id));
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove team member');
      throw err;
    }
  };

  const renameMember = async (id: string, name: string) => {
    try {
      setError(null);
      const trimmed = name.trim();
      await updateDoc(doc(db, "team_members", id), { name: trimmed });
      setMembers((prev) => prev.map((m) => (m.id === id ? { id, name: trimmed } : m)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rename team member');
      throw err;
    }
  };

  return (
    <TeamContext.Provider value={{ members, addMember, removeMember, renameMember, loading, error }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeamMembers() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeamMembers must be used within TeamProvider");
  return ctx;
}
