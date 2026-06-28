"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Ticket } from "@/types";
import { mockTickets } from "@/lib/mock-data";

interface TicketContextType {
  tickets: Ticket[];
  moveTicket: (id: string, targetMember: string) => void;
  addToBoard: (id: string) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const moveTicket = (id: string, targetMember: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, pointOfContact: targetMember } : t
      )
    );
  };
  const addToBoard = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isOnBoard: true } : t
      )
    );
  };
  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      )
    );
  };
  const unassignMember = (memberName: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.pointOfContact === memberName
          ? { ...t, pointOfContact: "", isOnBoard: false }
          : t
      )
    );
  };
  return (
    <TicketContext.Provider value={{ tickets, moveTicket, addToBoard, updateTicket, unassignMember }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used within TicketProvider");
  return ctx;
}
