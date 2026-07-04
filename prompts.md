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

## Prompt 12 — Streamline Request Form

**User Request:**
i want to work on the ticket form itself. get rid of the place to add a collaborator on the first page. on the second page, if other is selected, give a text box to enter what the other type of media is on the following page. where it says event details on the third page, make it just details - sometimes tickets are for merch or stickers. automatically make the date of the ticket the date it was submitted, so only allow the user to enter the due date (and call it due date rather than date of event). where you ask for reference urls, just make that a textbox rather than the weird popups, make sure its clickable through the ticket page itself later. make a custom popup for when the request is submitted rather than the default browser one, and bring us back to all tickets when its submitted.

**Result:**
- Removed collaboration checkbox and collaborator management from step 1
- Added conditional "otherGraphicType" text input when "Other" is selected in step 2
- Renamed "Event Details" to "Details" in step 3 with generic fields
- Removed event date field, auto-set deadline to today's date on form load
- Renamed "Posting Deadline" to "Due Date" with helper text
- Replaced prompt() popups with inline text input for reference URLs
- Added custom success modal with checkmark animation on submission
- Auto-redirect to /requests after 2 seconds
- Updated NewTicketForm type to remove collaboration fields and add otherGraphicType

## Prompt 13 — Redesign Ticket Detail View

**User Request:**
i want to work on the expanded view of the ticket itself. Please emphasize the graphic types that need to be made in a central card near the top, and then have the event details underneath it. Remove anything that isnt expliclty stated in the request form from this extended view.

**Result:**
- Created prominent "What Needs to be Made" card with gradient background at top
- Graphic types displayed as large white badges with accent-500 background
- Moved "Details" card below with Name/Title, Time, Location, Due Date
- Removed sidebar with Created By, Collaborators, and Activity feed
- Removed all fields not in request form (no REQ-001 IDs, no comments)
- Simplified to single-column layout focusing on deliverable information

## Prompt 14 — Simplify References Section

**User Request:**
in the References & Inspiration section of the request form, please remove the big drag and drop section and only have the text box where you submit the link

**Result:**
- Removed drag-and-drop upload area with Upload icon
- Kept only text input field with "Add" button for URLs
- Updated subtitle to "Share URLs that inspire the design"
- Cleaner, more focused interface for adding reference links

## Prompt 15 — Remove Empty Header

**User Request:**
get rid of the header rectangle / There is an extra header section in the big panel on the right, please get rid of that rectangle / its where there used to be a logo. it's <header class="h-12 glass flex items-center justify-between px-4 shrink-0"></header>

**Result:**
- Removed empty Topbar component from layout
- Deleted src/components/layout/topbar.tsx file
- Removed Topbar import from app/layout.tsx
- Removed Topbar element from layout structure

## Prompt 16 — Update Default Team Members

**User Request:**
make the default team members ella yolanda claire amber and rosie

**Result:**
- Updated initialMembers array in src/lib/team-context.tsx
- Changed from 8 members (Sarah Chen, Marcus Johnson, Priya Patel, David Kim, Maya Rodriguez, James Liu, Olivia Martinez, Emily Watson) to 5 members (Ella, Yolanda, Claire, Amber, Rosie)
- These now appear as default columns on the kanban board

## Prompt 17 — Complete CRUD Operations with Archive/Delete

**User Request:**
does this follow CRUD? make sure all data does / i want a soft delete too, i want to be able to archive/mark off as done and move to the archive, as well as delte. i want to be careful with the delete, so there's an are you sure to it as well

**Result:**
- Added `archiveTicket(id)` function to ticket context (soft delete - changes status to "Archived")
- Added `deleteTicket(id)` function to ticket context (hard delete - permanent removal)
- Created ConfirmDialog component for confirmation prompts
- Added Archive and Delete buttons to ticket detail page header
- Delete button triggers confirmation dialog with "Are you sure?" warning
- Archive button immediately changes status to "Archived"
- Completed full CRUD for both tickets and team members

## Prompt 18 — Add Archive Tab

**User Request:**
i want there to be an archive tab bellow all tickets, where you can visit the archived posts

**Result:**
- Added tab navigation to requests page with "Active" and "Archived" tabs
- Active tab shows all non-archived tickets (default view)
- Archived tab shows only tickets with status "Archived"
- Implemented archive filtering logic in useMemo
- Added `restoreTicket(id)` function to restore archived tickets back to "Open" status
- Archived tickets styled distinctly with opacity-60 and gray background
- Gray status badge for archived tickets
- Restore button (RotateCcw icon) appears next to deadline for archived tickets
- Confirmation dialog for restore action
- Complete archive workflow: Archive → View in tab → Restore or Delete

## Prompt 19 — Connect to Supabase Database

**User Request:**
i want to connect this to a supabase database, how do i do it

**Result:**
- Installed Supabase dependencies (@supabase/supabase-js, @supabase/ssr)
- Created environment variable configuration (.env.local.example)
- Set up Supabase client in src/lib/supabase/client.ts
- Created complete database schema in src/lib/supabase/schema.sql
- Updated TeamContext to use Supabase for all team member operations
- Updated TicketContext to use Supabase for all ticket operations
- Added loading and error states to both contexts
- Created SUPABASE_SETUP.md guide with step-by-step instructions
- All CRUD operations now connected to Supabase database
- Proper field name mapping between frontend and database
- Note: User needs to run SQL schema in Supabase dashboard and configure .env.local with their credentials

## Prompt 20 — Fix Runtime Error & Install Supabase

**User Request:**
when i go to use it, im getting Unhandled Runtime Error TypeError: Cannot read properties of null (reading 'from')

**Result:**
- Installed @supabase/supabase-js (was missing, causing null client)
- Fixed supabase client.ts to use proper ESM import instead of fragile require()
- Fixed type error: added "Instagram Carousel" to GraphicType union
- Fixed build errors: added Suspense boundary around useSearchParams(), fixed duplicate imports
- Build passes successfully

## Prompt 21 — Fix Empty Sidebar (Mock Data Fallback)

**User Request:**
all the tickets are now not showing correctly in the unassigned panel on the side

**Result:**
- Identified root cause: Supabase database had no tickets, so fetchTickets() returned empty array
- Added mock data fallback in ticket-context.tsx when Supabase returns no data
- All 6 sample tickets display correctly in the Unassigned Tickets panel

## Prompt 22 — Seed Supabase & Remove Mock Data

**User Request:**
please add the mock data to supabase, and get rid of the mock data files

**Result:**
- Created scripts/seed-supabase.mjs to insert mock data into Supabase
- Ran seed script — successfully seeded 6 tickets
- Removed src/lib/mock-data.ts file
- Updated all pages to read from Supabase via useTickets() context instead of mockTickets
- Removed mock data fallback from ticket-context.tsx
- Build passes successfully

## Prompt 23 — Delete Fall Recruitment Ticket

**User Request:**
delete the fall recuitment ticket

**Result:**
- Queried Supabase to find the "Fall Recruitment Instagram Campaign" ticket (from original schema.sql sample data)
- Deleted it from the database via Supabase delete query
- Remaining: 6 seeded tickets

## Prompt 24 — Drag Ticket Back to Unassigned

**User Request:**
i want to be able to move a ticket back to being unassigned by dragging it to the left hand side

**Result:**
- Added `unassignFromBoard(id)` function to ticket context
  - Clears point_of_contact and sets is_on_board to false in Supabase
- Made sidebar unassigned tickets area a drop target
  - Shows dashed ring highlight when dragging over it
  - Drops call unassignFromBoard(id) to move ticket back to unassigned
- Build passes successfully

## Prompt 25 — Secure Credentials & Update Prompts

**User Request:**
update the prompts.md and the .gitignore to make sure the prompts are all tracked and no information is leajed

**Result:**
- Updated scripts/seed-supabase.mjs to read credentials from .env.local instead of hardcoding them
  - Added dotenv dependency for loading .env.local
  - Script now exits with error if credentials are missing
- Verified .gitignore already ignores .env.local and all .env.*.local files
- Added all missing prompt entries to prompts.md
- No sensitive information is tracked in the repository
