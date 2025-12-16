import React, { createContext, useContext, useState, useEffect } from "react";
import API, { setAuthToken, setCompanySlug } from "../API/API";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === "admin";
  const isAgent = user?.role === "agent";
  const isUser = user?.role === "user";

  // load token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const slug = localStorage.getItem("company_slug");

    if (token) setAuthToken(token);
    if (slug) setCompanySlug(slug);

    if (!token) {
      setLoading(false);
      return;
    }

    API.get("/auth/me")
      .then((res) => setUser(res.data.user))
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
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("company_slug", res.data.user.company);
      setAuthToken(res.data.token);
      setCompanySlug(res.data.user.company);
      setUser(res.data.user);
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
      setAuthToken(res.data.token);
      setCompanySlug(res.data.user.company);
      setUser(res.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company_slug");
    setAuthToken(null);
    setCompanySlug(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
