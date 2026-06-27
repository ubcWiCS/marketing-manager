"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Ticket } from "@/types";
import { mockTickets } from "@/lib/mock-data";

interface TicketContextType {
  tickets: Ticket[];
  moveTicket: (id: string, targetMember: string) => void;
  addToBoard: (id: string) => void;
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
  return (
    <TicketContext.Provider value={{ tickets, moveTicket, addToBoard }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used within TicketProvider");
  return ctx;
}
