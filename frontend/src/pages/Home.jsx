// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import ProductsGrid from "../components/ProductsGrid";
import { toast } from "react-toastify";

export default function Home(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then(r => setProducts(r.data || []))
      .catch(e => {
        console.error("Failed to load products:", e);
        toast.error("Failed to load products");
      });
  }, []);

  const handleAdd = async (product) => {
    if (!product || (product.id === undefined || product.id === null)) {
      toast.error("Invalid product");
      console.error("Invalid product passed to handleAdd:", product);
      return;
    }

    const payload = { productId: Number(product.id), qty: 1 };
    console.log("Add to cart payload:", payload);

    try {
      const res = await API.post("/cart", payload);
      console.log("Add to cart response:", res.data);
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      const serverMsg = err?.response?.data?.error || err.message || "Failed to add to cart";
      toast.error(serverMsg);
    }
  };

  return (
    <section>
      <ProductsGrid products={products} onAdd={handleAdd} />
    </section>
  );
}
