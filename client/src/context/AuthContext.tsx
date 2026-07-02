import { createContext } from "react";

export interface User {
  id: number;
  email: string;
  username: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
