import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(email, password, companySlug);
      if (res.user.role === "admin") return nav("/dashboard");
      if (res.user.role === "agent") return nav("/inbox");
      if (res.user.role === "user") return nav("/add-fake");
      console.log("Logged In");
    } catch (error) {
      console.log("Login Failed..!!");
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
          placeholder="Company Slug"
          onChange={(e) => setCompanySlug(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 m-2"
          onClick={(e)=>handleSubmit(e)}
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
