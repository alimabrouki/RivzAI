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

  const responseData = await response.json();

  if (!response.ok) {
    return { error: responseData.message };
  }

  return responseData;
}

export default registerUser;
