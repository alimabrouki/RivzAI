export const API_BASE = "api/";

async function signupUser(data: {
  email: string;
  password: string;
  username?: string;
}) {
  try {
    const response = await fetch(`${API_BASE}auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

export default signupUser;
