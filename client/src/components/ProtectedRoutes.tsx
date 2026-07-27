import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import isTokenExpired from "../utils/isTokenExpired";

export function ProtectedRoutes() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || isTokenExpired()) {
      logout();
      if (isTokenExpired()) {
        sessionStorage.setItem("sessionExpired", "true");
      }
      navigate("/auth/signin", { replace: true });
    }
  }, [logout, navigate, token]);

  if (!token || isTokenExpired()) {
    return null;
  }

  return <Outlet />;
}
