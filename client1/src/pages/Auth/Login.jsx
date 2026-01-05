import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, setCurrCompanySlug, setCurrToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !companySlug) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await login(email, password, companySlug);
      if (!res) throw new Error("Login Failed, Incorrect Credentials");
      // setCompanySlug(res?.user?.company.trim().toLowerCase());
      // setCurrToken(res?.token);

      if (res.user.role === "admin") return nav("/dashboard");
      if (res.user.role === "agent") return nav("/inbox");
      if (res.user.role === "user") return nav("/add-fake");
    } catch (error) {
      alert("Login Failed, Incorrect Credentials..!!");
      console.log(error);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <form>
        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Company Name"
          onChange={(e) => setCompanySlug(e.target.value?.toLowerCase())}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 m-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
          onClick={(e) => handleSubmit(e)}
          disabled={!email || !password || !companySlug}
        >
          Login
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2"
          onClick={() => nav("/register")}
        >
          Register Instead ..!!
        </button>
      </form>
    </div>
  );
}
