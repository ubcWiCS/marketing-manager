// ─── Portfolio Types ───
export type Portfolio =
  | "Internal team"
  | "External"
  | "First-year"
  | "youCode"
  | "Grad"
  | "Developer"
  | "IR (Internal Relations)";

export const PORTFOLIOS: Portfolio[] = [
  "Internal team",
  "External",
  "First-year",
  "youCode",
  "Grad",
  "Developer",
  "IR (Internal Relations)",
];

// Mid-saturation colors: readable as dots, still soft with the pink/plum UI
export const PORTFOLIO_COLORS: Record<Portfolio, string> = {
  "Internal team": "#8B7BC8", // richer plum
  External: "#6BA3D9", // clearer blue
  "First-year": "#E88AAD", // stronger pink
  youCode: "#E0B06A", // warmer gold/peach
  Grad: "#8B8AD4", // deeper periwinkle
  Developer: "#6BAF9A", // clearer sage
  "IR (Internal Relations)": "#C48BB8", // richer orchid
};

// ─── Graphic Types ───
export type GraphicType =
  | "Instagram Post"
  | "Instagram Story"
  | "Instagram Carousel"
  | "Instagram Reel/TikTok"
  | "LinkedIn Post"
  | "Award Certificate"
  | "Thank You Card"
  | "Other";

export const GRAPHIC_TYPES: GraphicType[] = [
  "Instagram Post",
  "Instagram Story",
  "Instagram Carousel",
  "Instagram Reel/TikTok",
  "LinkedIn Post",
  "Award Certificate",
  "Thank You Card",
  "Other",
];

// ─── Request Status ───
export type RequestStatus =
  | "Open"
  | "In Progress"
  | "In Review"
  | "Completed"
  | "Archived";

export const REQUEST_STATUSES: RequestStatus[] = [
  "Open",
  "In Progress",
  "In Review",
  "Completed",
  "Archived",
];

// ─── Priority ───
export type Priority = "Low" | "Medium" | "High" | "Urgent";

export const PRIORITIES: Priority[] = ["Low", "Medium", "High", "Urgent"];

// ─── Request / Ticket ───
export interface Ticket {
  id: string; // internal use only, not displayed
  title: string;
  portfolio: Portfolio;
  pointOfContact: string;
  isCollaboration: boolean;
  collaborators: string[];
  graphicTypes: GraphicType[];
  otherGraphicType: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  summary: string;
  deadline: string;
  creativeVision: string;
  references: string[];
  additionalRequests: string;
  status: RequestStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  assignedTo?: string;
  isOnBoard?: boolean;
}

// ─── Form Types ───
export interface NewTicketForm {
  portfolio: Portfolio | null;
  pointOfContact: string;
  graphicTypes: GraphicType[];
  otherGraphicType: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  summary: string;
  deadline: string;
  creativeVision: string;
  references: string[];
  additionalRequests: string;
}

// ─── Team Member ───
export interface TeamMember {
  id: string;
  name: string;
}

// ─── Dashboard Stats ───
export interface DashboardStats {
  total: number;
  open: number;
  inProgress: number;
  inReview: number;
  completed: number;
  urgent: number;
}

// ─── Activity ───
export interface Activity {
  id: string;
  type: "completed" | "created" | "status_change" | "comment" | "priority_change";
  ticketId: string;
  ticketTitle: string;
  description: string;
  timestamp: string;
  user: string;
}
