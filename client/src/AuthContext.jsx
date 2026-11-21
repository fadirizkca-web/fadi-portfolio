
import { createContext, useContext, useState } from "react";
import apiRequest from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Restore the signed-in user when the page is refreshed.
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  // Register a new regular user.
  const register = async (userData) => {
    return apiRequest("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  };

  // Sign in an Admin or regular user.
  const login = async (email, password) => {
    const data = await apiRequest("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  // Sign out and clear local authentication information.
  const logout = async () => {
    try {
      await apiRequest("/api/auth/signout", {
        method: "POST",
      });
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === "admin",
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Access authentication information from any component.
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
