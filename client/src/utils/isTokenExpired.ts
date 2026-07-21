import { jwtDecode } from "jwt-decode";
function isTokenExpired() {
  const token = localStorage.getItem("token");
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp! < currentTime;
  } catch {
    return true;
  }
}

export default isTokenExpired;
