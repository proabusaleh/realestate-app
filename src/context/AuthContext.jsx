import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function getStoredUser() {
  try {
    const stored = localStorage.getItem("dreamestate_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [loading] = useState(false);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("dreamestate_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dreamestate_user");
  };

  const updateProfile = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("dreamestate_user", JSON.stringify(newUser));
  };

  const isAdmin = user?.role === "admin";
  const isAgent = user?.role === "agent";
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateProfile,
        isAdmin,
        isAgent,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}