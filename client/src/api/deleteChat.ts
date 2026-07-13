import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function deleteChat(chatId: number) {
  const response = await fetch(`${API_BASE}chats/${chatId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      error: responseData.error,
    };
  }

  return responseData;
}

export default deleteChat;
