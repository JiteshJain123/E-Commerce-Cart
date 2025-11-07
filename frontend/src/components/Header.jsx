// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "../utils/auth";

export default function Header() {
  const user = getUser();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    nav("/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Vibe Commerce
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-indigo-600 font-semibold">Products</Link>
            <Link to="/cart" className="hover:text-indigo-600 font-semibold">Cart</Link>

            {user ? (
              <>
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <button onClick={handleLogout} className="text-sm border px-3 py-1 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold">Login</Link>
                <Link to="/register" className="text-sm font-semibold border px-3 py-1 rounded">Register</Link>
              </>
            )}
          </nav>

          {/* mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <Link to="/" onClick={() => setOpen(false)} className="block py-2">Products</Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="block py-2">Cart</Link>
            {user ? (
              <>
                <div className="py-2 text-sm text-gray-600">Hi, {user.name}</div>
                <button onClick={() => { setOpen(false); handleLogout(); }} className="w-full text-left py-2 border rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block py-2">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block py-2">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
