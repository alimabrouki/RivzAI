import type { ActionResult } from "../types/ActionResult";
import type { Message } from "../types/Chat";
import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function addMessage(
  chatId: number,
  message: string,
): Promise<ActionResult<Message>> {
  try {
    const response = await fetch(`${API_BASE}chats/${chatId}/messages`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ message }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, error: responseData.error };
    }

    return responseData;
  } catch {
    return { success: false, error: "Network error" };
  }
}

export default addMessage;
