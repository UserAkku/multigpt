import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { messages, context = "" } = await request.json();
  const latest = messages?.at(-1)?.content ?? "";
  const key = process.env.MISTRAL_API_KEY;
  if (!key) return stream(`MultiGPT is running in local demo mode. Add a MISTRAL_API_KEY to receive live Mistral responses.\n\nFor this question — “${latest}” — review the project context, preserve the decision trail, and turn any confirmed outcome into knowledge, a decision, or a task.`, 18);

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json", "Accept": "text/event-stream" },
    body: JSON.stringify({ model: process.env.MISTRAL_MODEL || "mistral-small-latest", stream: true, messages: [{ role: "system", content: `You are the Project AI inside MultiGPT. Answer from the supplied project context; if evidence is missing, say so. Be concise and explain traceability.\n\nPROJECT CONTEXT:\n${context}` }, ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }))] })
  });
  if (!response.ok || !response.body) return stream("Mistral couldn’t respond right now. Please try again in a moment.", 18);
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body.getReader();
  let buffer = "";
  return new Response(new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) { controller.close(); return; }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n"); buffer = lines.pop() || "";
      for (const line of lines) if (line.startsWith("data: ") && line !== "data: [DONE]") {
        try { const part = JSON.parse(line.slice(6)).choices?.[0]?.delta?.content; if (part) controller.enqueue(encoder.encode(part)); } catch { /* Ignore non-content server-sent events. */ }
      }
    },
    cancel() { reader.cancel(); }
  }), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
}

function stream(text: string, delay: number) {
  const encoder = new TextEncoder(); let index = 0;
  return new Response(new ReadableStream({
    async pull(controller) {
      if (index >= text.length) { controller.close(); return; }
      const next = text.slice(index, index + 10); index += 10;
      controller.enqueue(encoder.encode(next)); await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
}
