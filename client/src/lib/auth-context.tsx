import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "./api-client";

interface User {
  id: number;
  username: string;
  email: string;
  displayName: string;
  linkedinConnected: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await apiClient.post("/api/auth/login", { username, password });
    const { token: newToken, user: newUser } = response.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    delete apiClient.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
