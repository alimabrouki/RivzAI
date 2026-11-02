import type { Message } from "../../prisma/generated/client";

export function toGeminiHistory(messages: Message[]) {
  return messages.map((message) => ({
    role: message.role === "user" ? "user" : "model",
    parts: [{ text: message.content }],
  }));
}
