import type { Project } from "@/lib/types";

/** Deterministic local retrieval mirrors the production pgvector retrieval contract. */
export function buildProjectContext(project: Project, query: string) {
  const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
  const score = (text: string) => terms.reduce((n, term) => n + (text.toLowerCase().includes(term) ? 1 : 0), 0);
  const items = [
    ...project.decisions.map((x) => ({ label: `Decision: ${x.title}`, text: `${x.description} Why: ${x.reason}`, score: score(`${x.title} ${x.description} ${x.reason}`) })),
    ...project.knowledge.map((x) => ({ label: `Knowledge: ${x.title}`, text: x.content, score: score(`${x.title} ${x.content}`) })),
    ...project.conversations.flatMap((c) => c.messages.map((m) => ({ label: `Conversation ${c.title}`, text: m.content, score: score(m.content) })))
  ].sort((a, b) => b.score - a.score).slice(0, 8);
  return items.map((x) => `[${x.label}]\n${x.text}`).join("\n\n");
}
