import { createContext, useState, useEffect } from "react";
import { getUserFromToken } from "../utils/jwtUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(getUserFromToken());
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
