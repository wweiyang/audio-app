import { createContext } from "react";

export interface User {
  id: number;
  username: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (values: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
