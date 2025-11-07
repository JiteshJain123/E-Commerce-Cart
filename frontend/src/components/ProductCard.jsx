import React from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function ProductCard({ product }){
  const addToCart = async () => {
    try {
      await API.post("/cart", { productId: product.id, qty: 1 });
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) toast.error("Login to add to cart");
      else toast.error("Could not add to cart");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm flex flex-col">
      <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">
        {product.image ? <img src={product.image} alt={product.name} className="h-full object-contain"/> : <span>No image</span>}
      </div>
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-lg font-bold">₹{product.price}</div>
        <button onClick={addToCart} className="bg-indigo-600 text-white px-3 py-1 rounded">Add to Cart</button>
      </div>
    </div>
  );
}
