// AuthForm.jsx
import React, { useState } from "react";

export default function AuthForm({ mode = "login", initialValues = {}, onSubmit }) {
  const [email, setEmail] = useState(initialValues.email || "");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">{mode === "login" ? "Login" : "Register"}</h2>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300" type="email" />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300" />

        <button
          onClick={() => onSubmit && onSubmit({ email, password })}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
}
