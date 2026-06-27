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
