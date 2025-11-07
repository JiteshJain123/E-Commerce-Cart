// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function CartPage(){
  const [cart, setCart] = useState({ items: [], total: 0 });

  const load = () => {
    API.get("/cart").then(r => setCart(r.data)).catch(e => {
      console.error(e);
      toast.error("Could not load cart. Login may be required.");
    });
  };

  useEffect(load, []);

  const remove = async (id) => {
    await API.delete(`/cart/${id}`).then(load).catch(() => toast.error("Failed remove"));
  };

  const updateQty = async (id, qty) => {
    await API.put(`/cart/${id}`, { qty }).then(load).catch(() => toast.error("Failed update"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-xl font-bold">Your Cart</h1>

        {cart.items.length === 0 ? (
          <div className="text-gray-600">Cart is empty</div>
        ) : (
          cart.items.map(it => (
            <div key={it.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <div>
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-gray-500">₹{it.price} × {it.qty}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))} className="px-3 py-1 border rounded">-</button>
                <div className="px-2">{it.qty}</div>
                <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-3 py-1 border rounded">+</button>
                <button onClick={() => remove(it.id)} className="text-red-500 ml-4">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <aside className="bg-white p-4 rounded shadow">
        <div className="text-lg font-bold mb-4">Order Summary</div>
        <div className="mb-2">Total: <span className="font-semibold">₹{(cart.total||0).toFixed(2)}</span></div>
        <a href="/checkout" className="block mt-4 bg-green-600 text-white px-4 py-2 rounded text-center">Checkout</a>
      </aside>
    </div>
  );
}
