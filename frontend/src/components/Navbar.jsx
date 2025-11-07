// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Vibe <span className="block text-indigo-600">Commerce</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm">Products</Link>
            <Link to="/cart" className="text-sm">Cart</Link>
            <Link to="/login" className="text-sm">Login</Link>
            <Link to="/register" className="text-sm px-3 py-1 border rounded">Register</Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
              aria-label="Toggle menu"
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

        {open && (
          <div className="md:hidden py-2">
            <Link to="/" className="block py-2">Products</Link>
            <Link to="/cart" className="block py-2">Cart</Link>
            <Link to="/login" className="block py-2">Login</Link>
            <Link to="/register" className="block py-2">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
