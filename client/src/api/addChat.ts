import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function addConversation(newPrompt: string) {
  try {
    const response = await fetch(`${API_BASE}chats`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ newPrompt }),
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

export default addConversation;
