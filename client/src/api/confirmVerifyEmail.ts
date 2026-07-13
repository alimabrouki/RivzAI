import { API_BASE } from "./signupUser";

async function confirmVerifyEmail(token: string) {
  try {
    const response = await fetch(`${API_BASE}auth/verify-email/${token}`, {
      method: "GET",
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { error: responseData.message };
    }

    return responseData;
  } catch {
    return { error: "Network error" };
  }
}

export default confirmVerifyEmail;
