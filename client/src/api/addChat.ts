import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function addChat(newChatPrompt: string) {
  try {
    const response = await fetch(`${API_BASE}chats`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ newChatPrompt }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      return { error: responseData.error };
    }
    return responseData;
  } catch {
    return { error: "Network error" };
  }
}

export default addChat;
