import { API_BASE } from "./registerUser";

async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_BASE}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 404) {
    const errorData = await response.json();
    return { error: errorData.message };
  }
  return response.json();
}

export default loginUser;
