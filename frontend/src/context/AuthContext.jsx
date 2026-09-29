import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("onesub_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("onesub_user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("onesub_user");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated: !!user }}>
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
