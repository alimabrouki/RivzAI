import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";
import type { Message } from "../types/Chat";

async function updateAiResponse(
  chatId: number,
  msgId: number,
  updatedMsg: string,
  chatHistory: Message[],
  onchunck: (chunk: string) => void,
): Promise<void> {
  const response = await fetch(`${API_BASE}messages/${msgId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ updatedMsg, chatId, chatHistory }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  if (!response.body) {
    throw new Error("Response body is missing");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onchunck(chunk);
  }
}

export default updateAiResponse;
