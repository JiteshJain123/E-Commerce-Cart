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
      .catch(e => { console.error(e); toast.error("Failed to load products"); });
  }, []);

  const handleAdd = async (product) => {
    try {
      await API.post("/cart", { product_id: product.id, qty: 1 });
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <section>
      <ProductsGrid products={products} onAdd={handleAdd} />
    </section>
  );
}
