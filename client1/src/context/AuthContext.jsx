import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/query";
import { connectSocket, disconnectSocket } from "../socket/socket";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === "admin";
  const isAgent = user?.role === "agent";
  const isUser = user?.role === "user";
  const [CurrToken, setCurrToken] = useState(null);
  const [CurrCompanySlug, setCurrCompanySlug] = useState(null);

  useEffect(() => {
    const token = CurrToken || localStorage.getItem("token");
    const slug = CurrCompanySlug || localStorage.getItem("company_slug");

    if (!token || !slug) {
      setLoading(false);
      alert("Unauthorized Login");
      return;
    }

    API.get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.log(err);
        alert("Unauthorized Please Login Again");
        <Navigate to="/login" replace />;
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password, companySlug) => {
    const data = {
      email,
      password,
      companySlug,
    };
    try {
      const res = await API.post("/auth/login", data);
      if (res) {
        setCurrToken(res.token);
        setCurrCompanySlug(res?.user?.company.trim().toLowerCase());
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("company_slug", res.data.user.company);
      connectSocket();
      setUser(res.data.user);
      connectSocket();
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const register = async (name, email, password, companyName) => {
    const data = {
      name,
      email,
      password,
      companyName,
    };
    try {
      const res = await API.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("company_slug", res.data.user.company);
      setUser(res.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company_slug");
    disconnectSocket();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isAgent,
        isUser,
        CurrToken,
        CurrCompanySlug,
        setCurrToken,
        setCurrCompanySlug,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
