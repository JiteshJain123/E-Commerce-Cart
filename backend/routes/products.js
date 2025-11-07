// backend/routes/products.js
import express from "express";
import db from "../db.js";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", (req, res) => {
  const prods = db.prepare("SELECT id, name, price, description, image FROM products").all();
  res.json(prods);
});

/* Bonus: sync from Fake Store API (triggerable) */
router.post("/sync-fakestore", async (req, res) => {
  try {
    const resp = await fetch("https://fakestoreapi.com/products");
    const data = await resp.json();
    const insert = db.prepare("INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)");
    const existing = db.prepare("SELECT COUNT(*) as c FROM products").get().c;
    if (existing === 0) {
      const txn = db.transaction((items) => {
        items.forEach(p => insert.run(p.title, p.price, p.description, p.image));
      });
      txn(data.slice(0, 10)); // insert first 10
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to sync" });
  }
});

export default router;
