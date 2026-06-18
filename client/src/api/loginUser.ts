import { API_BASE } from "./registerUser";

async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_BASE}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

export default loginUser;
