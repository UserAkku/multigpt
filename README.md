# MultiGPT

**A collaborative AI workspace that transforms team conversations into structured, searchable project memory.**

MultiGPT lets multiple teammates chat with an AI together inside a shared project. Every message, decision, task, and uploaded file stays connected to its source conversation — so the team always knows *why* something was decided and *who* said it.

---

## What It Does

Most AI chat tools are personal and ephemeral — the conversation disappears after the session ends. MultiGPT is built for teams and persistence:

- **Shared conversations** — Multiple team members participate in the same AI thread. Everyone sees who asked what, and can leave inline comments on any message.
- **Project AI with context** — The AI is aware of everything in your project: past decisions, saved knowledge, and prior conversations. It uses that context to give relevant, traceable answers rather than generic ones.
- **Knowledge base** — Distil important findings, research, requirements, and facts out of conversations and save them as permanent project knowledge.
- **Decision log** — Record every architectural or product decision with a reason, alternatives considered, and current status (Proposed → In Review → Confirmed / Rejected).
- **Task tracker** — Create tasks directly from conversations or decisions. Each task carries its source so you can always trace it back to the discussion that created it.
- **File storage** — Attach documents and assets to the project. Files are uploaded securely through the server and never expose credentials to the browser.
- **Activity feed** — A chronological audit trail of everything that happens across conversations, knowledge, decisions, and tasks.
- **Conversation branching** — Fork any conversation from a specific message to explore an alternative direction without losing the original thread.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI Provider | Mistral AI (streamed responses via Edge Runtime) |
| Database | PostgreSQL via Neon + Prisma ORM |
| File Storage | Cloudinary |
| Vector Search | pgvector (`vector(1024)` on `ConversationChunk`) |

---

## Project Structure

```
app/
  page.tsx              # Entry point — renders the Workspace
  layout.tsx            # Root layout
  api/
    ai/route.ts         # Edge route: streams Mistral responses with project context
    upload/route.ts     # Server route: signs and proxies Cloudinary uploads
components/
  workspace.tsx         # Entire client-side UI — sidebar, all pages, chat engine
lib/
  types.ts              # Shared TypeScript types (Project, Conversation, Message, …)
  context.ts            # Builds ranked project context to inject into AI prompts
  demo-data.ts          # Rich demo project ("QuickBite") for zero-config use
  db.ts                 # Prisma client singleton
  ai/
    mistral.ts          # AIProvider interface + MistralAdapter
prisma/
  schema.prisma         # Full relational schema with pgvector support
  seed.ts               # Database seed script
```

---

## How the AI Context Works

When a user sends a message, `buildProjectContext` scores every decision, knowledge item, and conversation message against the query by keyword overlap. The top 8 matches are injected into the system prompt sent to Mistral, so the AI responds with awareness of what the project has already decided and discovered — not just the current message.

In production this scoring is replaced by pgvector semantic search over `ConversationChunk` embeddings stored in Neon.

---

## Running Locally

```bash
npm install
npm run dev
```

The app starts in **demo mode** with a fully populated sample project ("QuickBite") persisted in browser `localStorage`. No credentials are required — you can explore every feature immediately.

---

## Enabling Production Integrations

Add the following variables to a `.env` file (see `.env.example`):

| Variable | What it enables |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection. Run `npm run prisma:push` then `npm run prisma:seed` once. |
| `MISTRAL_API_KEY` | Live streamed AI responses from Mistral. Without this, the app shows a local context-aware fallback. |
| `MISTRAL_MODEL` | Optional. Defaults to `mistral-small-latest`. |
| `CLOUDINARY_CLOUD_NAME` | File uploads. All three Cloudinary variables must be set together. |
| `CLOUDINARY_API_KEY` | |
| `CLOUDINARY_API_SECRET` | |

> **Note for Neon users:** Enable the `vector` extension in your Neon project before running `prisma db push`, as the schema includes a `vector(1024)` column for future semantic search.

---

## Available Scripts

```bash
npm run dev            # Start development server
npm run build          # Production build
npm run start          # Start production server
npm run lint           # Run ESLint

npm run prisma:generate  # Regenerate Prisma client after schema changes
npm run prisma:push      # Push schema to the database (no migration files)
npm run prisma:seed      # Seed the database with initial data
```
