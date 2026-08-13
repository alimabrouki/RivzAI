import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function generateFirstAiResponse(
  chatId: number,
  onchunk: (chunk: string) => void,
) {
  const response = await fetch(`${API_BASE}chats/${chatId}/generate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({}),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  if (!response.body) {
    throw new Error("response body is missing");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onchunk(chunk);
  }
}

export default generateFirstAiResponse;
