# MultiGPT

Collaborative AI workspace where conversations become shared project memory: knowledge, decisions, tasks, source trails, branches, and context-aware Project AI.

## Run locally

```bash
npm install
npm run dev
```

The app launches in a fully interactive demo mode, persisted in browser storage, so it is immediately usable without credentials. Add the variables in `.env.example` to enable the production integrations:

- `DATABASE_URL`: Neon PostgreSQL URL (run `npm run prisma:push` and `npm run prisma:seed` once configured)
- `MISTRAL_API_KEY`: enables streamed Mistral responses
- Cloudinary variables: enables secure server-side uploads through `/api/upload`

`prisma/schema.prisma` includes the complete relational model and pgvector-ready `ConversationChunk` field. For Neon, enable the `vector` extension before applying the schema.
