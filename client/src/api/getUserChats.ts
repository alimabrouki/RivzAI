import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function getUserChats() {
  try {
    const response = await fetch(`${API_BASE}chats`, {
      method: "GET",
      headers: getAuthHeaders(),
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

export default getUserChats;
