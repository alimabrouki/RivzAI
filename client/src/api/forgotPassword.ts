import { API_BASE } from "./registerUser";

async function forgotPassword(data: { email: string }) {
  const response = await fetch(`${API_BASE}auth/forgot-password`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (!response.ok) {
    return {
      error: responseData.message,
    };
  }

  return responseData;
}

export default forgotPassword;
