// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api/api";
import { saveAuth } from "../utils/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      saveAuth(res.data.user, res.data.token);
      toast.success("Logged in");
      nav("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handle} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <label className="block text-sm mb-1">Email</label>
        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-indigo-200"
          type="email"
        />

        <label className="block text-sm mb-1">Password</label>
        <input
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded mb-4 focus:ring-2 focus:ring-indigo-200"
          type="password"
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Login</button>
      </form>
    </div>
  );
}
