import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function addMessage(
  chatId: number,
  message: string,
  onchunk: (chunk: string) => void,
): Promise<void> {
  const response = await fetch(`${API_BASE}chats/${chatId}/messages`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  if (!response.body) {
    throw new Error("response body is missing");
  }

  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    const decoder = new TextDecoder();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onchunk(chunk);
  }
}

export default addMessage;
