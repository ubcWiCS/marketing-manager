// ─── Portfolio Types ───
export type Portfolio =
  | "Events"
  | "Presidential"
  | "Marketing"
  | "Internal"
  | "External"
  | "Tech"
  | "youCode"
  | "Data"
  | "Community"
  | "Mentorship";

export const PORTFOLIOS: Portfolio[] = [
  "Events",
  "Presidential",
  "Marketing",
  "Internal",
  "External",
  "Tech",
  "youCode",
  "Data",
];

export const PORTFOLIO_COLORS: Record<Portfolio, string> = {
  Events: "#f97316",
  Presidential: "#8b5cf6",
  Marketing: "#ec4899",
  Internal: "#14b8a6",
  External: "#3b82f6",
  Tech: "#22c55e",
  youCode: "#eab308",
  Data: "#6366f1",
  Community: "#f43f5e",
  Mentorship: "#a855f7",
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
