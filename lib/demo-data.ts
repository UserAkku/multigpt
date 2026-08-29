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
  const onboarding = { id: "onboarding", title: "First order onboarding", preview: "Reducing friction before the first meal arrives.", createdById: "akhilesh", updatedAt: ago(164), participants: ["akhilesh", "neha", "rahul"], provider: "Mistral", model: "mistral-small-latest", messages: [
    { id: "on1", role: "user" as const, authorId: "akhilesh", createdAt: ago(210), content: "How can we make first order onboarding feel lightweight without hurting delivery accuracy?", comments: [] },
    { id: "on2", role: "assistant" as const, createdAt: ago(205), content: "Lead with location and meal intent, then earn the next step. A user should see a useful restaurant collection before completing an account. Ask for precise address only when it changes availability or ETA.", comments: [{ id: "on-c1", authorId: "neha", content: "I’ll map this as location → intent → collection → menu, with address confirmation at checkout.", createdAt: ago(192) }] },
    { id: "on3", role: "user" as const, authorId: "rahul", createdAt: ago(181), content: "Let’s keep sign-in optional until order confirmation.", comments: [] },
    { id: "on4", role: "assistant" as const, createdAt: ago(178), content: "That is compatible with the first-order principle. Preserve the cart locally and request a phone number only at checkout, where it is clearly connected to order updates and support.", comments: [], sources: [{ kind: "knowledge" as const, id: "k2", label: "First-order principle" }] }
  ] };
  const catalog = { id: "catalog-quality", title: "Restaurant catalog quality", preview: "Defining what makes the first 50 menus trustworthy.", createdById: "neha", updatedAt: ago(95), participants: ["neha", "akhilesh", "aman"], provider: "Mistral", model: "mistral-small-latest", messages: [
    { id: "cat1", role: "user" as const, authorId: "neha", createdAt: ago(142), content: "What should we validate before publishing the first 50 restaurant menus?", comments: [] },
    { id: "cat2", role: "assistant" as const, createdAt: ago(138), content: "Treat menu quality as an operational promise. Validate availability, item naming, dietary labels, price including taxes, preparation estimates, and one representative image per category. Flag any menu that cannot be fulfilled as displayed.", comments: [] },
    { id: "cat3", role: "user" as const, authorId: "akhilesh", createdAt: ago(102), content: "I’ll run a manual QA pass for the launch neighbourhoods and record exceptions.", comments: [] }
  ] };
  const support = { id: "support-recovery", title: "Support recovery playbook", preview: "Turning payment and delivery failures into clear next steps.", createdById: "aman", updatedAt: ago(38), participants: ["aman", "rahul", "neha"], provider: "Mistral", model: "mistral-small-latest", messages: [
    { id: "sup1", role: "user" as const, authorId: "aman", createdAt: ago(76), content: "What information does support need to resolve a payment or refund exception quickly?", comments: [] },
    { id: "sup2", role: "assistant" as const, createdAt: ago(72), content: "Show a single order timeline: checkout attempt, provider payment ID, provider refund ID when applicable, webhook events, internal state transitions, and customer-facing status. Give support an explicit next action for every non-terminal state.", comments: [{ id: "sup-c1", authorId: "rahul", content: "This becomes our launch support checklist.", createdAt: ago(63) }] },
    { id: "sup3", role: "user" as const, authorId: "neha", createdAt: ago(42), content: "We should keep the customer message plain-language even while the internal timeline stays detailed.", comments: [] }
  ] };
  return {
    id: "quickbite", name: "QuickBite", description: "A thoughtful, India-first food ordering experience for busy neighbourhoods.", createdAt: ago(60 * 24), members: people, conversations: [support, catalog, paymentConversation, onboarding],
    knowledge: [
      { id: "k1", title: "India payment research", content: "Razorpay supports the core payment methods needed for an India-first launch, including UPI and cards. Webhook events should be treated as the source of truth for eventual payment state.", type: "research", authorId: "aman", createdAt: ago(110), sourceConversationId: "payment-architecture", sourceMessageId: "m2" },
      { id: "k2", title: "First-order principle", content: "Ask for only the information that unlocks a useful first result. Account completion can follow demonstrated value.", type: "finding", authorId: "neha", createdAt: ago(180), sourceConversationId: "onboarding", sourceMessageId: "on2" },
      { id: "k3", title: "Menu quality gate", content: "A launch menu is publishable only when availability, prices, dietary labels, preparation estimates, and representative images are verified.", type: "requirement", authorId: "neha", createdAt: ago(91), sourceConversationId: "catalog-quality", sourceMessageId: "cat2" },
      { id: "k4", title: "Support timeline requirement", content: "Support needs checkout, payment, refund, webhook, and internal status events together in a single order timeline, with a next action for every non-terminal state.", type: "note", authorId: "aman", createdAt: ago(59), sourceConversationId: "support-recovery", sourceMessageId: "sup2" }
    ],
    decisions: [
      { id: "d1", title: "Use Razorpay for the India-first launch", description: "Use Razorpay as the payment provider for the initial QuickBite launch.", reason: "It covers the local payment methods we need and lets the team ship a focused, reliable integration.", alternatives: "Cashfree, Stripe", status: "confirmed", authorId: "rahul", createdAt: ago(65), sourceConversationId: "payment-architecture", sourceMessageId: "m2" },
      { id: "d2", title: "Keep account creation optional until checkout", description: "Do not force account creation before a customer can discover relevant restaurants and build a cart.", reason: "It reduces first-order friction while retaining the precise information we need at the moment it affects fulfilment.", alternatives: "Mandatory sign-in before browsing", status: "confirmed", authorId: "akhilesh", createdAt: ago(171), sourceConversationId: "onboarding", sourceMessageId: "on4" },
      { id: "d3", title: "Launch with a manual menu-quality gate", description: "Every launch-neighbourhood menu receives a human review before publishing.", reason: "A smaller accurate catalogue earns more trust than an incomplete large one.", alternatives: "Automated-only validation", status: "under_review", authorId: "neha", createdAt: ago(88), sourceConversationId: "catalog-quality", sourceMessageId: "cat2" }
    ],
    tasks: [
      { id: "t1", title: "Implement refund webhook", description: "Persist provider references and make webhook processing idempotent.", status: "in_progress", priority: "high", authorId: "aman", assigneeId: "aman", createdAt: ago(55), sourceConversationId: "payment-architecture", sourceDecisionId: "d1" },
      { id: "t2", title: "Map first-order states", description: "Write the minimum onboarding state flow for mobile and web.", status: "todo", priority: "medium", authorId: "neha", assigneeId: "neha", createdAt: ago(150), sourceConversationId: "onboarding", sourceDecisionId: "d2" },
      { id: "t3", title: "QA the first 50 restaurant menus", description: "Record missing availability, prices, dietary tags, and image exceptions.", status: "in_progress", priority: "high", authorId: "akhilesh", assigneeId: "akhilesh", createdAt: ago(86), sourceConversationId: "catalog-quality", sourceDecisionId: "d3" },
      { id: "t4", title: "Write launch support exception playbook", description: "Define the support handoff for payment, refund, and delivery exceptions.", status: "todo", priority: "medium", authorId: "aman", assigneeId: "rahul", createdAt: ago(57), sourceConversationId: "support-recovery" },
      { id: "t5", title: "Review release checklist", description: "Confirm payments, onboarding, menu QA, and support readiness before the pilot.", status: "done", priority: "low", authorId: "rahul", assigneeId: "rahul", createdAt: ago(28), sourceConversationId: "payment-architecture" }
    ],
    files: [
      { id: "f1", name: "QuickBite-launch-brief.md", type: "Markdown brief", size: 5_100, uploaderId: "akhilesh", createdAt: ago(200), url: "/demo/quickbite-launch-brief.md" },
      { id: "f2", name: "payment-webhook-contract.json", type: "JSON contract", size: 2_400, uploaderId: "aman", createdAt: ago(52), url: "/demo/payment-webhook-contract.json" },
      { id: "f3", name: "launch-readiness-checklist.csv", type: "CSV checklist", size: 1_700, uploaderId: "rahul", createdAt: ago(31), url: "/demo/launch-readiness-checklist.csv" }
    ],
    activity: []
  };
}

export const initialData = (): AppData => ({ projects: [demoProject()], currentUserId: undefined });

/** Adds newly shipped QuickBite demo material without overwriting a visitor's own work. */
export function upgradeDemoData(data: AppData): AppData {
  const seed = demoProject();
  const saved = data.projects.find((project) => project.id === seed.id);
  if (!saved) return data;
  const mergeById = <T extends { id: string }>(existing: T[], additions: T[]) => [...existing, ...additions.filter((item) => !existing.some((current) => current.id === item.id))];
  const upgraded: Project = {
    ...saved,
    members: mergeById(saved.members, seed.members),
    conversations: mergeById(saved.conversations, seed.conversations),
    knowledge: mergeById(saved.knowledge, seed.knowledge),
    decisions: mergeById(saved.decisions, seed.decisions),
    tasks: mergeById(saved.tasks, seed.tasks),
    files: mergeById(saved.files, seed.files),
    activity: mergeById(saved.activity.filter(a => !a.id.startsWith("seed-a")), seed.activity).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()),
  };
  return { ...data, projects: data.projects.map((project) => project.id === saved.id ? upgraded : project) };
}

export function fallbackAnswer(question: string, project: Project) {
  const q = question.toLowerCase();
  const decision = project.decisions.find((d) => q.includes("why") || q.includes("decide") || q.includes("payment") || q.includes("razorpay"));
  if (decision) return `Based on the project record, the team chose **${decision.title.replace(/^Use /, "")}** because ${decision.reason.toLowerCase()}\n\nThe linked discussion also calls out idempotent webhook handling and explicit refund records as the operational safeguards. I’ve attached the decision and its supporting research as sources.`;
  const knowledge = project.knowledge[0];
  return `I found the most relevant project context in **${knowledge?.title ?? "your saved workspace"}**. ${knowledge?.content ?? "There is not enough confirmed project context yet—start a conversation and save the useful outcomes."}`;
}
