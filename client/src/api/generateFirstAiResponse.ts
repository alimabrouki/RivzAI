import { getAuthHeaders } from "../utils/getAuthheaders";

async function generateFirstAiResponse(
  chatId: number,
  onchunk: (chunk: string) => void,
) {
  const response = await fetch(`/.netlify/functions/stream-first-ai-response`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ chatId }),
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
