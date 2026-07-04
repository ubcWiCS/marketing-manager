"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TeamMember } from "@/types";
import { supabase } from "@/lib/supabase/client";

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

  // Fetch team members from Supabase
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('name');

      if (error) throw error;

      if (data) {
        setMembers(data.map((m: any) => ({ id: m.id, name: m.name })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (name: string) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('team_members')
        .insert([{ name: name.trim() }])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setMembers((prev) => [...prev, { id: data.id, name: data.name }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add team member');
      throw err;
    }
  };

  const removeMember = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove team member');
      throw err;
    }
  };

  const renameMember = async (id: string, name: string) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('team_members')
        .update({ name: name.trim() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? { id: data.id, name: data.name } : m))
        );
      }
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
