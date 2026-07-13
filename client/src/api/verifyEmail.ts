import { API_BASE } from "./signupUser";

async function verifyEmail(email: string) {
  try {
    const response = await fetch(`${API_BASE}auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
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

export default verifyEmail;
