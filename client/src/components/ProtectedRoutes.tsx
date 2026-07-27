import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import isTokenExpired from "../utils/isTokenExpired";

export function ProtectedRoutes() {
  const { logout } = useAuth();

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (isTokenExpired()) {
    logout();
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
}
