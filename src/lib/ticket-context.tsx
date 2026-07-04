"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Ticket } from "@/types";
import { supabase } from "@/lib/supabase/client";

interface TicketContextType {
  tickets: Ticket[];
  moveTicket: (id: string, targetMember: string) => Promise<void>;
  addToBoard: (id: string) => Promise<void>;
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>;
  archiveTicket: (id: string) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  restoreTicket: (id: string) => Promise<void>;
  unassignMember: (memberName: string) => Promise<void>;
  unassignFromBoard: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tickets from Supabase
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedTickets: Ticket[] = data.map((t: any) => ({
          id: t.id,
          title: t.title,
          portfolio: t.portfolio,
          pointOfContact: t.point_of_contact,
          isCollaboration: false,
          collaborators: [],
          graphicTypes: t.graphic_types,
          otherGraphicType: t.other_graphic_type || "",
          eventName: t.event_name,
          eventTime: t.event_time || "",
          eventLocation: t.event_location || "",
          summary: t.summary,
          deadline: t.deadline,
          creativeVision: t.creative_vision,
          references: t.reference_urls || [],
          additionalRequests: t.additional_requests || "",
          status: t.status,
          priority: t.priority,
          createdAt: t.created_at,
          updatedAt: t.updated_at,
          createdBy: t.created_by,
          isOnBoard: t.is_on_board,
        }));
        setTickets(formattedTickets);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };
  const moveTicket = async (id: string, targetMember: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('tickets')
        .update({ point_of_contact: targetMember })
        .eq('id', id);

      if (error) throw error;
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, pointOfContact: targetMember } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move ticket');
      throw err;
    }
  };

  const addToBoard = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('tickets')
        .update({ is_on_board: true })
        .eq('id', id);

      if (error) throw error;
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, isOnBoard: true } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add ticket to board');
      throw err;
    }
  };

  const updateTicket = async (id: string, updates: Partial<Ticket>) => {
    try {
      setError(null);
      
      // Map frontend field names to database column names
      const dbUpdates: any = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.portfolio !== undefined) dbUpdates.portfolio = updates.portfolio;
      if (updates.pointOfContact !== undefined) dbUpdates.point_of_contact = updates.pointOfContact;
      if (updates.graphicTypes !== undefined) dbUpdates.graphic_types = updates.graphicTypes;
      if (updates.otherGraphicType !== undefined) dbUpdates.other_graphic_type = updates.otherGraphicType;
      if (updates.eventName !== undefined) dbUpdates.event_name = updates.eventName;
      if (updates.eventTime !== undefined) dbUpdates.event_time = updates.eventTime;
      if (updates.eventLocation !== undefined) dbUpdates.event_location = updates.eventLocation;
      if (updates.deadline !== undefined) dbUpdates.deadline = updates.deadline;
      if (updates.summary !== undefined) dbUpdates.summary = updates.summary;
      if (updates.creativeVision !== undefined) dbUpdates.creative_vision = updates.creativeVision;
      if (updates.references !== undefined) dbUpdates.reference_urls = updates.references;
      if (updates.additionalRequests !== undefined) dbUpdates.additional_requests = updates.additionalRequests;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.isOnBoard !== undefined) dbUpdates.is_on_board = updates.isOnBoard;

      const { error } = await supabase
        .from('tickets')
        .update(dbUpdates)
        .eq('id', id);

      if (error) throw error;
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket');
      throw err;
    }
  };

  const unassignMember = async (memberName: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('tickets')
        .update({ point_of_contact: '', is_on_board: false })
        .eq('point_of_contact', memberName);

      if (error) throw error;
      setTickets((prev) =>
        prev.map((t) =>
          t.pointOfContact === memberName
            ? { ...t, pointOfContact: "", isOnBoard: false }
            : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unassign member');
      throw err;
    }
  };

  const unassignFromBoard = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('tickets')
        .update({ point_of_contact: '', is_on_board: false })
        .eq('id', id);

      if (error) throw error;
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, pointOfContact: "", isOnBoard: false } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unassign ticket');
      throw err;
    }
  };

  const archiveTicket = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('tickets')
        .update({ status: 'Archived' })
        .eq('id', id);

      if (error) throw error;
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "Archived" as const } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to archive ticket');
      throw err;
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete ticket');
      throw err;
    }
  };

  const restoreTicket = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('tickets')
        .update({ status: 'Open' })
        .eq('id', id);

      if (error) throw error;
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "Open" as const } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore ticket');
      throw err;
    }
  };

  return (
    <TicketContext.Provider value={{ tickets, moveTicket, addToBoard, updateTicket, archiveTicket, deleteTicket, restoreTicket, unassignMember, unassignFromBoard, loading, error }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used within TicketProvider");
  return ctx;
}
