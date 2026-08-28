import type { AppData, Project } from "@/lib/types";

export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
export const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

const people = [
  { id: "akhilesh", name: "Akhilesh", initials: "AK", tone: "coral" },
  { id: "rahul", name: "Rahul", initials: "RA", tone: "violet" },
  { id: "aman", name: "Aman", initials: "AM", tone: "ink" },
  { id: "neha", name: "Neha", initials: "NE", tone: "rose" },
];

export function demoProject(): Project {
  const paymentConversation = {
    id: "payment-architecture", title: "Payment architecture", preview: "Evaluating a dependable India-first checkout flow.", createdById: "rahul", updatedAt: ago(12), participants: ["rahul", "aman", "neha"], provider: "Mistral", model: "mistral-small-latest", messages: [
      { id: "m1", role: "user" as const, authorId: "rahul", createdAt: ago(92), content: "We need an India-first payment architecture for QuickBite. What should we optimize for?", comments: [] },
      { id: "m2", role: "assistant" as const, createdAt: ago(90), content: "For a marketplace launch, optimize for a clean checkout, dependable webhook handling, and refund traceability. Razorpay is a pragmatic starting point: it supports the local payment methods you need while keeping the integration surface relatively focused.\n\nI’d pair it with PostgreSQL for order and payment state, and treat every provider callback as an idempotent event.", comments: [{ id: "c1", authorId: "aman", content: "Let’s make refund reconciliation explicit in the design.", createdAt: ago(70) }], sources: [{ kind: "knowledge" as const, id: "k1", label: "India payment research" }] },
      { id: "m3", role: "user" as const, authorId: "neha", createdAt: ago(45), content: "What does the refund path need to guarantee?", comments: [] },
      { id: "m4", role: "assistant" as const, createdAt: ago(42), content: "The refund path should be asynchronous and observable: create a refund record before calling the provider, persist the provider reference, consume webhook updates idempotently, and surface a clear internal state to support. That gives customers a predictable experience even when settlement is delayed.", comments: [], sources: [{ kind: "decision" as const, id: "d1", label: "Use Razorpay" }] }
    ]
  };
  return {
    id: "quickbite", name: "QuickBite", description: "A thoughtful, India-first food ordering experience for busy neighbourhoods.", createdAt: ago(60 * 24), members: people, conversations: [paymentConversation, { id: "onboarding", title: "First order onboarding", preview: "Making the first meal feel effortless.", createdById: "akhilesh", updatedAt: ago(164), participants: ["akhilesh", "neha"], provider: "Mistral", model: "mistral-small-latest", messages: [{ id: "on1", role: "user", authorId: "akhilesh", createdAt: ago(210), content: "How can we make first order onboarding feel lightweight?", comments: [] }, { id: "on2", role: "assistant", createdAt: ago(205), content: "Lead with location and intent, then earn the next step. Avoid a full profile form before the user has seen something they want to order.", comments: [] }] }],
    knowledge: [{ id: "k1", title: "India payment research", content: "Razorpay supports the core payment methods needed for an India-first launch, including UPI and cards. Webhook events should be treated as the source of truth for eventual payment state.", type: "research", authorId: "aman", createdAt: ago(110), sourceConversationId: "payment-architecture", sourceMessageId: "m2" }, { id: "k2", title: "First-order principle", content: "Ask for only the information that unlocks a useful first result. Account completion can follow demonstrated value.", type: "finding", authorId: "neha", createdAt: ago(180), sourceConversationId: "onboarding" }],
    decisions: [{ id: "d1", title: "Use Razorpay for the India-first launch", description: "Use Razorpay as the payment provider for the initial QuickBite launch.", reason: "It covers the local payment methods we need and lets the team ship a focused, reliable integration.", alternatives: "Cashfree, Stripe", status: "confirmed", authorId: "rahul", createdAt: ago(65), sourceConversationId: "payment-architecture", sourceMessageId: "m2" }],
    tasks: [{ id: "t1", title: "Implement refund webhook", description: "Persist provider references and make webhook processing idempotent.", status: "in_progress", priority: "high", authorId: "aman", assigneeId: "aman", createdAt: ago(55), sourceConversationId: "payment-architecture", sourceDecisionId: "d1" }, { id: "t2", title: "Map first-order states", description: "Write the minimum onboarding state flow.", status: "todo", priority: "medium", authorId: "neha", assigneeId: "neha", createdAt: ago(150), sourceConversationId: "onboarding" }],
    files: [{ id: "f1", name: "payment-flow-v1.pdf", type: "PDF", size: 328_000, uploaderId: "rahul", createdAt: ago(51) }],
    activity: [{ id: "a1", actorId: "aman", action: "moved task to in progress", target: "Implement refund webhook", at: ago(22), kind: "task" }, { id: "a2", actorId: "rahul", action: "confirmed decision", target: "Use Razorpay for the India-first launch", at: ago(65), kind: "decision" }, { id: "a3", actorId: "aman", action: "saved research", target: "India payment research", at: ago(110), kind: "knowledge" }, { id: "a4", actorId: "neha", action: "asked a follow-up in", target: "Payment architecture", at: ago(45), kind: "chat" }]
  };
}

export const initialData = (): AppData => ({ projects: [demoProject()], currentUserId: undefined });

export function fallbackAnswer(question: string, project: Project) {
  const q = question.toLowerCase();
  const decision = project.decisions.find((d) => q.includes("why") || q.includes("decide") || q.includes("payment") || q.includes("razorpay"));
  if (decision) return `Based on the project record, the team chose **${decision.title.replace(/^Use /, "")}** because ${decision.reason.toLowerCase()}\n\nThe linked discussion also calls out idempotent webhook handling and explicit refund records as the operational safeguards. I’ve attached the decision and its supporting research as sources.`;
  const knowledge = project.knowledge[0];
  return `I found the most relevant project context in **${knowledge?.title ?? "your saved workspace"}**. ${knowledge?.content ?? "There is not enough confirmed project context yet—start a conversation and save the useful outcomes."}`;
}
