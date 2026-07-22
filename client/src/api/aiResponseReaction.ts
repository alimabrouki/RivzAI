import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function aiResponseReaction(messageId: number, reaction: string | null) {
  const response = await fetch(`${API_BASE}messages/${messageId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ reaction }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: responseData.error,
    };
  }

  return responseData;
}

export default aiResponseReaction;
