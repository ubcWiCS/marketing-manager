"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Ticket } from "@/types";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const ticketsRef = collection(db, "tickets");

// Firestore docs store the same camelCase shape as the Ticket type (minus id).
const toTicket = (id: string, d: DocumentData): Ticket => ({
  id,
  title: d.title,
  portfolio: d.portfolio,
  pointOfContact: d.pointOfContact,
  isCollaboration: false,
  collaborators: [],
  graphicTypes: d.graphicTypes || [],
  otherGraphicType: d.otherGraphicType || "",
  eventName: d.eventName,
  eventDate: d.eventDate || "",
  eventTime: d.eventTime || "",
  eventLocation: d.eventLocation || "",
  summary: d.summary,
  deadline: d.deadline,
  creativeVision: d.creativeVision,
  references: d.references || [],
  additionalRequests: d.additionalRequests || "",
  status: d.status,
  priority: d.priority,
  createdAt: d.createdAt,
  updatedAt: d.updatedAt,
  createdBy: d.createdBy,
  assignedTo: d.assignedTo || undefined,
  isOnBoard: !!d.isOnBoard,
});

interface TicketContextType {
  tickets: Ticket[];
  createTicket: (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "status" | "priority" | "isOnBoard">) => Promise<Ticket | null>;
  moveTicket: (id: string, targetMember: string) => Promise<void>;
  addToBoard: (id: string) => Promise<void>;
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>;
  completeTicket: (id: string) => Promise<void>;
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

  // Fetch tickets from Firestore
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(ticketsRef);
      const formattedTickets = snapshot.docs
        .map((d) => toTicket(d.id, d.data()))
        .sort((x, y) => (y.createdAt || "").localeCompare(x.createdAt || ""));
      setTickets(formattedTickets);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "status" | "priority" | "isOnBoard">): Promise<Ticket | null> => {
    try {
      setError(null);
      const now = new Date().toISOString();
      const data = {
        title: ticket.title,
        portfolio: ticket.portfolio,
        pointOfContact: ticket.pointOfContact,
        graphicTypes: ticket.graphicTypes,
        otherGraphicType: ticket.otherGraphicType || null,
        eventName: ticket.eventName,
        eventDate: ticket.eventDate || null,
        eventTime: ticket.eventTime || null,
        eventLocation: ticket.eventLocation || null,
        deadline: ticket.deadline,
        summary: ticket.summary,
        creativeVision: ticket.creativeVision,
        references: ticket.references || [],
        additionalRequests: ticket.additionalRequests || null,
        createdBy: ticket.pointOfContact,
        assignedTo: null,
        status: "Open",
        priority: "Medium",
        isOnBoard: false,
        createdAt: now,
        updatedAt: now,
      };
      const ref = await addDoc(ticketsRef, data);
      const newTicket = toTicket(ref.id, data);
      setTickets((prev) => [newTicket, ...prev]);
      return newTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
      throw err;
    }
  };

  const moveTicket = async (id: string, targetMember: string) => {
    try {
      setError(null);
      await updateDoc(doc(db, "tickets", id), { assignedTo: targetMember, updatedAt: new Date().toISOString() });
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, assignedTo: targetMember } : t
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
      await updateDoc(doc(db, "tickets", id), { isOnBoard: true, updatedAt: new Date().toISOString() });
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
      
      // Drop undefined values (Firestore rejects them) and never write the id
      const { id: _ignored, ...rest } = updates;
      const dbUpdates: Record<string, unknown> = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => v !== undefined)
      );
      await updateDoc(doc(db, "tickets", id), {
        ...dbUpdates,
        updatedAt: new Date().toISOString(),
      });
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
      const snapshot = await getDocs(query(ticketsRef, where("pointOfContact", "==", memberName)));
      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => batch.update(d.ref, { pointOfContact: "", isOnBoard: false }));
      await batch.commit();
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
      await updateDoc(doc(db, "tickets", id), { assignedTo: null, isOnBoard: false, updatedAt: new Date().toISOString() });
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, assignedTo: undefined, isOnBoard: false } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unassign ticket');
      throw err;
    }
  };

  const completeTicket = async (id: string) => {
    try {
      setError(null);
      await updateDoc(doc(db, "tickets", id), { status: 'Completed', isOnBoard: false, updatedAt: new Date().toISOString() });
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "Completed" as const, isOnBoard: false } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete ticket');
      throw err;
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      setError(null);
      await deleteDoc(doc(db, "tickets", id));
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete ticket');
      throw err;
    }
  };

  const restoreTicket = async (id: string) => {
    try {
      setError(null);
      await updateDoc(doc(db, "tickets", id), { status: 'Open', isOnBoard: false, updatedAt: new Date().toISOString() });
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "Open" as const, isOnBoard: false } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore ticket');
      throw err;
    }
  };

  return (
    <TicketContext.Provider value={{ tickets, createTicket, moveTicket, addToBoard, updateTicket, completeTicket, deleteTicket, restoreTicket, unassignMember, unassignFromBoard, loading, error }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used within TicketProvider");
  return ctx;
}
