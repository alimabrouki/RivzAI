import { API_BASE } from "./signupUser";

async function verifyEmail(email: string) {
  const response = await fetch(`${API_BASE}verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      error: responseData.message,
    };
  }

  return responseData;
}

export default verifyEmail;
