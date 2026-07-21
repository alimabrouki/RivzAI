import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import isTokenExpired from "../utils/isTokenExpired";
import { useLocation } from "react-router-dom";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function updateUser(updatedUser: User) {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }
  useEffect(() => {
    if (!isTokenExpired()) return;

    queueMicrotask(() => {
      logout();
    });
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
