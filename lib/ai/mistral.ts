/** Provider adapter: application code should depend on this shape, never Mistral directly. */
export interface AIProvider {
  streamResponse(input: { messages: { role: string; content: string }[]; context: string }): Promise<Response>;
  summarize(content: string): Promise<string>;
}

export class MistralAdapter implements AIProvider {
  async streamResponse(input: { messages: { role: string; content: string }[]; context: string }) {
    return fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  }
  async summarize(content: string) { return content.slice(0, 220); }
}
