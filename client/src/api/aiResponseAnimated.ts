import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function aiResponseAnimated(messageId: number, animated: boolean) {
  const response = await fetch(`${API_BASE}messages/${messageId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ animated }),
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

export default aiResponseAnimated;
