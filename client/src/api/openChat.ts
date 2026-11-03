import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";
import type { Chat } from "../types/Chat";

async function openChat(chatId: number): Promise<Chat> {
  const response = await fetch(`${API_BASE}chats/${chatId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to load chat (${response.status})`);
  }

  return response.json();
}

export default openChat;
