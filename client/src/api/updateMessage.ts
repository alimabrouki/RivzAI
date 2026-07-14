import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function updateMessage(msgId: number, newContent: string) {
  try {
    const response = await fetch(`${API_BASE}messages/${msgId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ newContent }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error,
      };
    }

    return responseData;
  } catch {
    return {
      success: false,
      error: "Network Error",
    };
  }
}

export default updateMessage;
