import { API_BASE } from "./signupUser";

async function resetPassword(data: { token: string; newPassword: string }) {
  try {
    const response = await fetch(`${API_BASE}auth/reset-password`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
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

export default resetPassword;
