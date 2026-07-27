export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    throw new Error("Unauthorized");
  }

  return response;
}
