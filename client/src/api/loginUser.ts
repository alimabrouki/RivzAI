const APP_BASE = "http://localhost:8080/";

async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${APP_BASE}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export default loginUser;
