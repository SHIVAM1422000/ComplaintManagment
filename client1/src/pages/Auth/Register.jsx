import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, companyName);
    } catch (error) {
      console.log("Reg Failed)");
      console.log(error);
      
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Register</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Company Name"
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-4 py-2"
        disabled={!email || !password || !name || !companyName}
        onClick={handleSubmit}
      >
        Register
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2"
        onClick={() => {
          nav("/login");
        }}
      >
        Login
      </button>
    </div>
  );
}
