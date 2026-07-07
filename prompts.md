# Portfolio Manager — Development Prompts

*This design overhaul was inspired by principles from [Design Prompts](https://www.designprompts.dev/), a resource for systematic design guidance.*

## Prompt 1 — Initial Design & Build

**User Request:**
I want to build the frontend of a modern ticket management system before implementing any backend. Do not write any backend code, API routes, database schemas, or authentication yet. First, help me design the application's overall layout, information architecture, and user experience. Based on the following description of a Google Form, propose a polished interface inspired by Linear, Notion, and Jira that is intuitive for student organizations. Explain the layout, navigation, pages, components, and user flow before writing code.

Our current Google Form request system should be used as the basis for the new request form. The current form asks users to select which portfolio the request belongs to (Events, Presidential, Marketing, Internal, External, Tech, youCode, or Data), enter the point of contact, indicate whether the request is a collaboration and list collaborators if applicable, select the type(s) of graphic needed (Instagram Post, Instagram Story, Instagram Reel/TikTok, LinkedIn Post, Award Certificate, Thank You Card, or Other), provide the event or activity name, specify the event date, time, and location, write a short summary of the event or content, indicate the desired posting deadline (with a note that requests should ideally be submitted at least two weeks before an event), describe the creative vision in detail (including desired colors, style, required text, branding, references, and inspiration), upload inspiration or reference files, and provide any additional design requests not covered elsewhere. The current Google Form is very linear and utilitarian; I want the new application to preserve all of these fields while presenting them in a much more polished, modern, intuitive, and visually appealing multi-step experience that feels more like Notion, Linear, or Typeform than a standard Google Form.

**Result:**
- Built a full Next.js 14 frontend with TypeScript, Tailwind CSS, and Lucide icons
- 4 pages: Dashboard, All Requests (list + board views), New Request (6-step wizard), Request Detail
- Custom design system with accent (indigo), surface (neutral), and status color tokens
- 8 mock tickets across all portfolios with realistic data
- All Google Form fields preserved across the wizard steps

## Prompt 2 — Debloat & Kanban Redesign

**User Request:**
Let's do two things. The first is that I want you to write my prompts into a `.md` file called `prompts.md` and add it to the repo. Next I want you to debloat the UI. You added way too many details. I want the sidebar to have the tickets and for it to be more Kanban style, where I can drag and drop the tasks into columns per team member.

**Result:**
- Simplified sidebar (removed portfolio list, moved New Request to topbar)
- Dashboard replaced with full-screen Kanban board grouped by team member
- HTML5 drag and drop for moving tickets between member columns
- Minimal ticket cards (ID, title, portfolio dot, priority indicator)
- Removed stat cards, activity feed, and list/table view complexity

## Prompt 3 — Sidebar Drag-to-Remove

**User Request:**
When we drag from the sidebar on the left, the objects need to get removed from that bar.

**Result:**
- Added `isOnBoard` flag to Ticket type
- Tickets dragged from sidebar to board get marked as "on board"
- Sidebar filters to show only unassigned tickets (`!ticket.isOnBoard`)
- Board uses team members context for columns instead of deriving from ticket data

## Prompt 4 — Fix View State Error

**User Request:**
The "All Tickets" button is currently giving me this error: Unhandled Runtime Error ReferenceError: `view` is not defined.

**Result:**
- Added missing `view` state variable with `useState<"list" | "board">("list")`
- Fixed imports to include `List` and `Columns` icons from lucide-react
- Build passes successfully

## Prompt 5 — Fix PlusCircle Import Error

**User Request:**
I am now getting Unhandled Runtime Error ReferenceError: `PlusCircle` is not defined.

**Result:**
- Added `PlusCircle` to the lucide-react imports in requests/page.tsx
- Fixed build error

## Prompt 6 — Team Member Management

**User Request:**
We need a way to manage the members on the team. I want to be able to add or remove team members, and give them names.

**Result:**
- Created TeamContext for managing team members
- Added ManageMembersDialog component with add/remove/rename functionality
- Added "Manage Team" button in sidebar footer
- Wrapped app with TeamProvider
- Board shows all team members as columns (even empty ones)

## Prompt 7 — Remove Redundant UI Elements

**User Request:**
Get rid of the following redundant items: where it says "Ella Lan" at the bottom, the topmost search bar and the topmost "New" button. It's repeating features that are not needed.

**Result:**
- Removed user avatar/name block from sidebar footer
- Removed search bar from topbar
- Removed "New" button from topbar (kept board page button)
- Cleaned up unused imports (Avatar, mockUser, Search, PlusCircle)

## Prompt 8 — Fix Member Deletion & Update Sidebar Label

**User Request:**
When I remove a team member, it's now deleting their tickets. Make sure they get added back to the drag and drop sidebar when a member is deleted. Where it currently says "Tickets (number)", make it say "Unassigned Tickets".

**Result:**
- Added `unassignMember()` function to ticket context
- When member is deleted, their tickets are unassigned (pointOfContact cleared, isOnBoard set to false)
- Tickets reappear in sidebar drag pool
- Changed sidebar header from "Tickets (count)" to "Unassigned Tickets"

## Prompt 9 — Remove Top Navigation & Logo

**User Request:**
Get rid of the "All Tickets" toggle in the top banner and the place where it says "PM" with the icon.

**Result:**
- Removed "All Tickets" link from topbar
- Topbar reduced to empty header element
- Removed PM logo block (Layers icon + "PM" text) from sidebar
- Removed unused Layers icon import

## Prompt 10 — Redesign Ticket Detail Page

**User Request:**
I want to work on the request tickets. We need to make the details that are important easy to understand upon first glance. Get rid of any reference to a request number, like "REQ-001", across the whole application. When the ticket is expanded so we can see the details, make sure the type of content that needs to be made, like if it's a post or a TikTok, is highlighted with more emphasis at the top of the ticket. Get rid of the comments. Allow the details of the tickets to be editable from inside of the ticket itself.

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
I want the edit button to come back. To edit the ticket, let me go through the entire workflow of the survey sheet again.

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
I want to work on the ticket form itself. Get rid of the place to add a collaborator on the first page. On the second page, if "Other" is selected, give a textbox to enter what the other type of media is on the following page. Where it says "event details" on the third page, make it just "Details" - sometimes tickets are for merch or stickers. Automatically make the date of the ticket the date it was submitted, so only allow the user to enter the due date (and call it due date rather than date of event). Where you ask for reference URLs, just make that a textbox rather than the weird popups, make sure it's clickable through the ticket page itself later. Make a custom popup for when the request is submitted rather than the default browser one, and bring us back to all tickets when it's submitted.

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
I want to work on the expanded view of the ticket itself. Please emphasize the graphic types that need to be made in a central card near the top, and then have the event details underneath it. Remove anything that isn't explicitly stated in the request form from this extended view.

**Result:**
- Created prominent "What Needs to be Made" card with gradient background at top
- Graphic types displayed as large white badges with accent-500 background
- Moved "Details" card below with Name/Title, Time, Location, Due Date
- Removed sidebar with Created By, Collaborators, and Activity feed
- Removed all fields not in request form (no REQ-001 IDs, no comments)
- Simplified to single-column layout focusing on deliverable information

## Prompt 14 — Simplify References Section

**User Request:**
In the References & Inspiration section of the request form, please remove the big drag and drop section and only have the textbox where you submit the link.

**Result:**
- Removed drag-and-drop upload area with Upload icon
- Kept only text input field with "Add" button for URLs
- Updated subtitle to "Share URLs that inspire the design"
- Cleaner, more focused interface for adding reference links

## Prompt 15 — Remove Empty Header

**User Request:**
Get rid of the header rectangle. There is an extra header section in the big panel on the right, please get rid of that rectangle. It's where there used to be a logo. It's `<header class="h-12 glass flex items-center justify-between px-4 shrink-0"></header>`.

**Result:**
- Removed empty Topbar component from layout
- Deleted src/components/layout/topbar.tsx file
- Removed Topbar import from app/layout.tsx
- Removed Topbar element from layout structure

## Prompt 16 — Update Default Team Members

**User Request:**
Make the default team members Ella, Yolanda, Claire, Amber, and Rosie.

**Result:**
- Updated initialMembers array in src/lib/team-context.tsx
- Changed from 8 members (Sarah Chen, Marcus Johnson, Priya Patel, David Kim, Maya Rodriguez, James Liu, Olivia Martinez, Emily Watson) to 5 members (Ella, Yolanda, Claire, Amber, Rosie)
- These now appear as default columns on the Kanban board

## Prompt 17 — Complete CRUD Operations with Archive/Delete

**User Request:**
Does this follow CRUD? Make sure all data does. I want a soft delete too. I want to be able to archive/mark off as done and move to the archive, as well as delete. I want to be careful with the delete, so there's an "Are you sure?" prompt for it as well.

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
I want there to be an archive tab below "All Tickets", where you can visit the archived posts.

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
I want to connect this to a Supabase database. How do I do it?

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
When I go to use it, I'm getting Unhandled Runtime Error TypeError: Cannot read properties of null (reading 'from').

**Result:**
- Installed @supabase/supabase-js (was missing, causing null client)
- Fixed supabase client.ts to use proper ESM import instead of fragile require()
- Fixed type error: added "Instagram Carousel" to GraphicType union
- Fixed build errors: added Suspense boundary around useSearchParams(), fixed duplicate imports
- Build passes successfully

## Prompt 21 — Fix Empty Sidebar (Mock Data Fallback)

**User Request:**
All the tickets are now not showing correctly in the unassigned panel on the side.

**Result:**
- Identified root cause: Supabase database had no tickets, so fetchTickets() returned empty array
- Added mock data fallback in ticket-context.tsx when Supabase returns no data
- All 6 sample tickets display correctly in the Unassigned Tickets panel

## Prompt 22 — Seed Supabase & Remove Mock Data

**User Request:**
Please add the mock data to Supabase, and get rid of the mock data files.

**Result:**
- Created scripts/seed-supabase.mjs to insert mock data into Supabase
- Ran seed script — successfully seeded 6 tickets
- Removed src/lib/mock-data.ts file
- Updated all pages to read from Supabase via useTickets() context instead of mockTickets
- Removed mock data fallback from ticket-context.tsx
- Build passes successfully

## Prompt 23 — Delete Fall Recruitment Ticket

**User Request:**
Delete the Fall Recruitment ticket.

**Result:**
- Queried Supabase to find the "Fall Recruitment Instagram Campaign" ticket (from original schema.sql sample data)
- Deleted it from the database via Supabase delete query
- Remaining: 6 seeded tickets

## Prompt 24 — Drag Ticket Back to Unassigned

**User Request:**
I want to be able to move a ticket back to being unassigned by dragging it to the left hand side.

**Result:**
- Added `unassignFromBoard(id)` function to ticket context
  - Clears point_of_contact and sets is_on_board to false in Supabase
- Made sidebar unassigned tickets area a drop target
  - Shows dashed ring highlight when dragging over it
  - Drops call unassignFromBoard(id) to move ticket back to unassigned
- Build passes successfully

## Prompt 25 — Secure Credentials & Update Prompts

**User Request:**
Update the prompts.md and the .gitignore to make sure the prompts are all tracked and no information is leaked.

**Result:**
- Updated scripts/seed-supabase.mjs to read credentials from .env.local instead of hardcoding them
  - Added dotenv dependency for loading .env.local
  - Script now exits with error if credentials are missing
- Verified .gitignore already ignores .env.local and all .env.*.local files
- Added all missing prompt entries to prompts.md
- No sensitive information is tracked in the repository

## Prompt 26 — Add Basic Auth Password Protection

**User Request:**
I want to deploy this so other people can access it, and I gently want to be able to authenticate the users seeing it by password protecting this somehow. What do I do?

**Result:**
- Created src/middleware.ts with HTTP Basic Auth protection
- Added AUTH_USER and AUTH_PASS environment variables to .env.local.example and .env.local
- Default credentials: admin / password (change in .env.local before deployment)
- All routes protected except static assets and API routes
- Browser will show native login prompt on first visit

**To deploy:**
1. Push to GitHub
2. Connect to Vercel (vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

## Prompt 27 — Custom Login UI

**User Request:**
Create a custom UI for entering the password and username.

**Result:**
- Created src/app/login/page.tsx with custom login form
- Created src/app/api/auth/login/route.ts for credential validation
- Created src/app/api/auth/logout/route.ts for sign out
- Updated middleware to check auth cookie and redirect to /login
- Added Sign Out button to sidebar
- Login form uses navy + plum styling to match app theme
- Credentials stored in AUTH_USER and AUTH_PASS env vars

## Prompt 28 — Hide UI on Login Page

**User Request:**
When showing the password login UI, hide all the other elements.

**Result:**
- Created src/app/login/layout.tsx with standalone layout (no sidebar)
- Updated middleware to exclude /login from protection
- Login page now shows only the login form without sidebar or other UI elements

## Prompt 29 — Hide UI on Login Page (Alt)

**User Request:**
When showing the password login UI, hide all the other elements.

**Result:**
- Created src/app/login/layout.tsx with standalone layout (no sidebar)
- Updated middleware to exclude /login from protection
- Login page now shows only the login form without sidebar or other UI elements

## Prompt 30 — Fix Login Page Hydration

**User Request:**
Error: Hydration failed because the initial UI does not match what was rendered on the server.

**Result:**
- Simplified src/app/login/layout.tsx to just a wrapper div (no html/head/body)
- This allows the login page to inherit from the root layout without conflicts
- Build passes successfully

## Prompt 31 — Fix Login Page Layout (Hide Sidebar)

**User Request:**
When showing the password login UI, hide all the other elements.

**Result:**
- Created src/app/(protected)/ route group for all protected pages
- Moved page.tsx, requests/, and api/auth into (protected) group
- Created src/app/(protected)/layout.tsx with sidebar
- Login page now renders without sidebar (inherits from root layout)
- Build passes successfully

## Prompt 32 — Session-Based Auth & Auto-Login

**User Request:**
When I show up to the board, I want it to ask me to log in every time.

**Result:**
- Changed auth cookie from persistent 7-day session (maxAge) to session cookie
- Removed `maxAge` property from cookie options in login route
- Cookie now expires when browser is closed
- Users must log in on each new browser session

## Prompt 33 — Neo-Brutalism Design Overhaul

*This design direction was inspired by principles from [Design Prompts](https://www.designprompts.dev/), a resource for systematic design guidance.*

**User Request:**
Apply the neo-brutalism design system to transform the entire app.

**Result:**
- Changed font to Space Grotesk with heavy weights (900, 700)
- Added hard black borders (border-4) to all elements
- Implemented hard offset shadows (4px 4px 0px 0px #000)
- Changed background to cream (#FFFDF5) with grid pattern
- Added mechanical button interactions (push-down on click)
- Used high-saturation colors (Navy, Gold, Purple, Light Blue, Lavender)
- Removed all subtle grays and smooth transitions

## Prompt 34 — Fix Duplicate Tickets & Clear Database

**User Request:**
Get rid of duplicate tickets. Make sure unassigned tickets render correctly.

**Result:**
- Added deduplication logic in ticket-context.tsx to filter out duplicate tickets by ID when fetching
- Updated seed script to delete ALL existing tickets before re-seeding (fixed UUID syntax for delete query)
- Ran seed script successfully - database cleaned from 18 tickets to 6 clean tickets
- Fixed sidebar text contrast (changed to white text on dark navy background)
- Added bg-navy-800/50 background to unassigned tickets scroll area

## Prompt 35 — Softened Neo-Brutalism Design

**User Request:**
Get rid of the harsh shadows and borders. Find a way to soften the design slightly.

**Result:**
- Changed from harsh `border-4` to softer `border-2` or `border` for most elements
- Added subtle blur to shadows (2-8px blur instead of 0px)
- Restored rounded corners (`rounded-hand`, `rounded-hand-xl`)
- Used softer color application (plum-500 instead of harsh contrasts)
- Kept Space Grotesk font, cream background (#FDF4C8), and bold typography
- Removed aggressive rotation effects and harsh border thickness
- Maintains neo-brutal character with a more approachable feel

## Prompt 36 — Updated Prompts Documentation

**User Request:**
Edit the prompts.md file to make sure it's up to date. Then edit all prompts for grammar, spelling, and capitalization. Cite https://www.designprompts.dev/ for the design overhaul.

**Result:**
- Updated prompts.md with complete history of all prompts
- Fixed grammar, spelling, and capitalization throughout all entries
- Added Design Prompts citation at the top of the file
- Added missing prompts (34-35) for duplicate tickets fix and softened design

## Prompt 37 — Fix Login 405 Error & Persistent Login

**User Request:**
When I log in from the Vercel deployment, I get a 405 error. Make sure I always log in when I come to see the site first.

**Result:**
- Added `path: "/"` to auth cookie so it's sent to all routes (was scoped to /api/auth/ by default)
- Added `maxAge: 60 * 60 * 24 * 7` (7 days) for persistent login between visits
- Added GET handler to login API to prevent 405 errors from direct URL hits
- Fixed logout cookie deletion to use `path: "/"` with `maxAge: 0`
- Wrapped `useSearchParams()` in Suspense boundary on login page (pre-existing build error)

## Prompt 38 — Fix Create Ticket Not Working

**User Request:**
The create mode isn't working.

**Result:**
- Added `createTicket()` function to ticket context with Supabase insert
- Exposed createTicket through TicketContext provider
- Wired up form submit handler to call createTicket with all form data
- Added `is_on_board: true` to insert so tickets appear on board immediately
- Added user-visible error banner to show Supabase errors when creation fails

## Prompt 39 — Tickets Not Showing in Database

**User Request:**
Tickets are not showing when they are created, and they aren't making it to the database.

**Result:**
- Fixed silently swallowed errors — catch block now sets submitError state
- Added error banner component to display Supabase error messages to the user
- Set Supabase environment variables in Vercel dashboard for production

## Prompt 40 — Replace Archive with Complete Status

**User Request:**
Instead of archive, let's make it complete/completed tickets, so it's more clear.

**Result:**
- Renamed `archiveTicket` to `completeTicket` in ticket context
- completeTicket sets status to "Completed" and is_on_board to false
- Added status dropdown selector on ticket detail page (Open / In Progress / In Review / Completed)
- Changed detail page buttons: "Archive" → "Mark Complete", "Unarchive" → "Reopen"
- Changed All Tickets tab from "Archived" → "Completed"
- Status dropdown allows manual status changes at any time

## Prompt 41 — Remove Completed Tickets from Sidebar

**User Request:**
Make sure that when a ticket gets marked completed, it's moved to the archive, which means that it gets removed from the unassigned tickets, and vice versa.

**Result:**
- Updated sidebar filter to exclude completed tickets: `tickets.filter((t) => !t.isOnBoard && t.status !== "Completed")`
- Completed tickets disappear from "Unassigned Tickets" sidebar
- Reopened tickets reappear in sidebar since status is back to "Open"

## Prompt 42 — Change Contact to Team Member & Add Filter

**User Request:**
In the all tickets page, where it says contact, make it say team member and let me filter by team member.

**Result:**
- Changed table column header from "Contact" to "Team Member"
- Added `useTeamMembers()` import to load team members list
- Added `filterMember` state with "All Members" dropdown populated from team context
- Added member filter logic to useMemo to filter tickets by pointOfContact
