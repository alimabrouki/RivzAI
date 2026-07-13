import { API_BASE } from "./signupUser";

async function signinUser(data: { email: string; password: string }) {
  try {
    const response = await fetch(`${API_BASE}auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

export default signinUser;
