# Portfolio Manager — Development Prompts

## Prompt 1 — Initial Design & Build

**User Request:**
I want to build the frontend of a modern ticket management system before implementing any backend. Do not write any backend code, API routes, database schemas, or authentication yet. First, help me design the application's overall layout, information architecture, and user experience. Based on the following description of a google form, propose a polished interface inspired by Linear, Notion, and Jira that is intuitive for student organizations. Explain the layout, navigation, pages, components, and user flow before writing code.

Our current Google Form request system should be used as the basis for the new request form. The current form asks users to select which portfolio the request belongs to (Events, Presidential, Marketing, Internal, External, Tech, youCode, or Data), enter the point of contact, indicate whether the request is a collaboration and list collaborators if applicable, select the type(s) of graphic needed (Instagram Post, Instagram Story, Instagram Reel/TikTok, LinkedIn Post, Award Certificate, Thank You Card, or Other), provide the event or activity name, specify the event date, time, and location, write a short summary of the event or content, indicate the desired posting deadline (with a note that requests should ideally be submitted at least two weeks before an event), describe the creative vision in detail (including desired colors, style, required text, branding, references, and inspiration), upload inspiration or reference files, and provide any additional design requests not covered elsewhere. The current Google Form is very linear and utilitarian; I want the new application to preserve all of these fields while presenting them in a much more polished, modern, intuitive, and visually appealing multi-step experience that feels more like Notion, Linear, or Typeform than a standard Google Form.

**Result:**
- Built a full Next.js 14 frontend with TypeScript, Tailwind CSS, and Lucide icons
- 4 pages: Dashboard, All Requests (list + board views), New Request (6-step wizard), Request Detail
- Custom design system with accent (indigo), surface (neutral), and status color tokens
- 8 mock tickets across all portfolios with realistic data
- All Google Form fields preserved across the wizard steps

## Prompt 2 — Debloat & Kanban Redesign

**User Request:**
Lets do two things. The first is that I want you to write my prompts into a .md file called prompts.md and add it to the repo. Next I want you to debloat the UI. You added way too many details. I want the sidebar to have the tickets and for it to be more kanbam style, where I can drag and drop the tasks into columns per team member.

**Result:**
- Simplified sidebar (removed portfolio list, moved New Request to topbar)
- Dashboard replaced with full-screen kanban board grouped by team member
- HTML5 drag and drop for moving tickets between member columns
- Minimal ticket cards (ID, title, portfolio dot, priority indicator)
- Removed stat cards, activity feed, and list/table view complexity

## Prompt 3 — Sidebar Drag-to-Remove

**User Request:**
when we drag from the side bar on the left, the objects need to get removed from that bar

**Result:**
- Added `isOnBoard` flag to Ticket type
- Tickets dragged from sidebar to board get marked as "on board"
- Sidebar filters to show only unassigned tickets (`!ticket.isOnBoard`)
- Board uses team members context for columns instead of deriving from ticket data

## Prompt 4 — Fix View State Error

**User Request:**
the all tickets button is currently giving me this error: Unhandled Runtime Error ReferenceError: view is not defined

**Result:**
- Added missing `view` state variable with `useState<"list" | "board">("list")`
- Fixed imports to include `List` and `Columns` icons from lucide-react
- Build passes successfully

## Prompt 5 — Fix PlusCircle Import Error

**User Request:**
i am now getting Unhandled Runtime Error ReferenceError: PlusCircle is not defined

**Result:**
- Added `PlusCircle` to the lucide-react imports in requests/page.tsx
- Fixed build error

## Prompt 6 — Team Member Management

**User Request:**
we need a way to manage the members on the team. i want to be add or remove team memebers, and give them names

**Result:**
- Created TeamContext for managing team members
- Added ManageMembersDialog component with add/remove/rename functionality
- Added "Manage Team" button in sidebar footer
- Wrapped app with TeamProvider
- Board shows all team members as columns (even empty ones)

## Prompt 7 — Remove Redundant UI Elements

**User Request:**
get rid of the following redundant items: where it says ellie lan at the bottom, the top most search bar and the top most new button. it's repeating features that are not needed.

**Result:**
- Removed user avatar/name block from sidebar footer
- Removed search bar from topbar
- Removed "New" button from topbar (kept board page button)
- Cleaned up unused imports (Avatar, mockUser, Search, PlusCircle)

## Prompt 8 — Fix Member Deletion & Update Sidebar Label

**User Request:**
when i remove a team member, it's now deleting their tickets. make sure they get added back to the drag and drop sidebar when a member is deleted. where it currently says tickets (number) make it say unassigned tickets

**Result:**
- Added `unassignMember()` function to ticket context
- When member is deleted, their tickets are unassigned (pointOfContact cleared, isOnBoard set to false)
- Tickets reappear in sidebar drag pool
- Changed sidebar header from "Tickets (count)" to "Unassigned Tickets"

## Prompt 9 — Remove Top Navigation & Logo

**User Request:**
get rid of the all tickets toggle in the top banner and the place where it says PM with the icon.

**Result:**
- Removed "All Tickets" link from topbar
- Topbar reduced to empty header element
- Removed PM logo block (Layers icon + "PM" text) from sidebar
- Removed unused Layers icon import

## Prompt 10 — Redesign Ticket Detail Page

**User Request:**
I want to work on the request tickets. We need to make the details that are important easy to understand upon first glance. Get rid of any reference to a request number, like REQ-001, across the whole application. When the ticket is expanded so we can see the details, make sure the type of content that needs to be made, like if it's a post or a Tiktok, is highlighted with more emphasis at the top of the ticket. Get rid of the comments. Allow the details of the tickets to be editable from inside of the ticket itself.

**Result:**
- Removed all REQ-001 ID displays from board, sidebar, and requests list
- Redesigned ticket detail page with graphic types as prominent toggle buttons at top
- Removed entire comments section
- Made all fields inline-editable (title, event details, summary, creative vision, deadline, status, priority)
- Added EditableField and EditableSection components
- Removed ID column from requests table
- Updated search to exclude ID field
- IDs kept internally for routing but never displayed

## Prompt 11 — Add Edit Button with Full Workflow

**User Request:**
i want the edit button to come back. to edit the ticket, let me go through the entire workflow of the survey sheet again

**Result:**
- Restored Edit button to ticket detail page header
- Edit button links to `/requests/new?edit=${ticket.id}`
- New request page detects edit mode via URL parameter
- Pre-populates entire 6-step form with existing ticket data
- Submit button changes to "Update Request" when editing
- Calls `updateTicket()` to save changes
- Form title changes to "Edit Request" in edit mode
