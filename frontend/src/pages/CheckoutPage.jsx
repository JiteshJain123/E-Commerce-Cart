// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/checkout", { name, email });
      toast.success("Checkout success");
      console.log("Receipt:", res.data.receipt);
      nav("/");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) toast.error(err.response.data.error);
      else toast.error("Checkout failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Checkout</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-200"/>
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input value={email} type="email" onChange={e=>setEmail(e.target.value)} required className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-200"/>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Place Order</button>
        </form>
      </div>
    </div>
  );
}
