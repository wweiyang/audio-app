import React, { useState, useEffect } from "react";
import { userLogin } from "../api/apis";
import { AuthContext } from "./AuthContext";
import { UserCredentials } from "../api/types";
import { User } from "./types";

export const TOKEN_KEY = "authToken";
export const USER_KEY = "user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem(TOKEN_KEY);
    setIsLoggedIn(!!authToken);
  }, []);

  const login = async (values: UserCredentials) => {
    try {
      const response = await userLogin(values);

      if (response.user && response.token) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        localStorage.setItem(TOKEN_KEY, response.token);
        setIsLoggedIn(true);
        setUser(response.user);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
