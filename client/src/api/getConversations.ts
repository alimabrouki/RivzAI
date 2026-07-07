import { getAuthHeaders } from "../utils/getAuthheaders";
import { API_BASE } from "./signupUser";

async function getConversations() {
  const response = await fetch(`${API_BASE}conversations`, {
    method: "GET",
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

export default getConversations;
