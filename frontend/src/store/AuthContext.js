import { createContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Auth Provider

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    setIsLoggedIn(!!token); // true if token exists, false otherwise
    if (token) {
      setIsAdmin(isAdmin);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
