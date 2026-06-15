export const API_BASE = "http://localhost:8080/";

async function registerUser(data: {
  email: string;
  password: string;
  username?: string;
}) {
  const response = await fetch(`${API_BASE}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.status === 409) {
    const errorData = await response.json();
    return { error: errorData.message };
  }

  return response.json();
}

export default registerUser;
