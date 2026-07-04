"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { TeamMember } from "@/types";

interface TeamContextType {
  members: TeamMember[];
  addMember: (name: string) => void;
  removeMember: (id: string) => void;
  renameMember: (id: string, name: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const initialMembers: TeamMember[] = [
  { id: "1", name: "Ella" },
  { id: "2", name: "Yolanda" },
  { id: "3", name: "Claire" },
  { id: "4", name: "Amber" },
  { id: "5", name: "Rosie" },
];

export function TeamProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  const addMember = (name: string) => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: name.trim(),
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const renameMember = (id: string, name: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name: name.trim() } : m))
    );
  };

  return (
    <TeamContext.Provider value={{ members, addMember, removeMember, renameMember }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeamMembers() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeamMembers must be used within TeamProvider");
  return ctx;
}
