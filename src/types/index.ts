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

// Soft pastels aligned with the app's plum / pink / lavender palette
export const PORTFOLIO_COLORS: Record<Portfolio, string> = {
  "Internal team": "#B2A1EC", // brand plum
  External: "#A1C6F3", // soft blue
  "First-year": "#F8BAD1", // soft pink
  youCode: "#F0D5B0", // warm peach (not neon yellow)
  Grad: "#C8C0F0", // light periwinkle
  Developer: "#B8D9CC", // sage
  "IR (Internal Relations)": "#E0C4E0", // dusty orchid
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
