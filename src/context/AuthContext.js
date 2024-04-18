import React, { createContext, useState, useEffect, useContext } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token, user) => {
    setIsLoggedIn(true);
    setToken(token);
    setCurrentUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken("");
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

