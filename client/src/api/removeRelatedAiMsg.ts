import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function removeRelatedAiMsg(msgId: number) {
  try {
    const response = await fetch(`${API_BASE}messages/${msgId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
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
      error: "Updating response failed please try again.",
    };
  }
}

export default removeRelatedAiMsg;
