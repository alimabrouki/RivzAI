import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function addMessage(chatId: number, message: string) {
  const response = await fetch(`${API_BASE}chats/${chatId}/messages`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ message }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      error: responseData.error,
    };
  }

  return responseData;
}

export default addMessage;
