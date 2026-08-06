import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Get existing token when React starts
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Save token after successful login
  function login(token) {
    // Save in React memory
    setToken(token);

    // Save in browser storage
    localStorage.setItem("token", token);
  }

  // Remove token during logout
  function logout() {
    setToken(null);

    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
