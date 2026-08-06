import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  function login() {
    setIsLoggedIn(true);

    localStorage.setItem("isLoggedIn", "true");
  }

  function logout() {
    setIsLoggedIn(false);

    localStorage.removeItem("isLoggedIn");
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
