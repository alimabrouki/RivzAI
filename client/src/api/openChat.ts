import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function openChat(chatId: string) {
  const response = await fetch(`${API_BASE}chats/${chatId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const repsonseData = await response.json();

  if (!response.ok) {
    return {
      error: repsonseData.error,
    };
  }

  return repsonseData;
}

export default openChat;
