// backend/routes/checkout.js
import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret_for_dev";

const router = express.Router();

function authRequired(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Login required" });
  try {
    const token = auth.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
}

router.post("/", authRequired, (req, res) => {
  const user = req.user;
  // get cart and compute total
  const cart = db.prepare("SELECT id FROM carts WHERE user_id = ?").get(user.id);
  if (!cart) return res.status(400).json({ error: "Cart empty" });
  const items = db.prepare(`
    SELECT p.id as productId, p.name, p.price, ci.qty
    FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.cart_id = ?
  `).all(cart.id);
  if (!items || items.length === 0) return res.status(400).json({ error: "Cart empty" });

  let total = items.reduce((s, it) => s + it.price * it.qty, 0);
  const receipt = {
    orderId: `VIBE-${Date.now()}`,
    total,
    items,
    timestamp: new Date().toISOString()
  };

  // Insert order record
  db.prepare("INSERT INTO orders (user_id, total, receipt) VALUES (?, ?, ?)").run(user.id, total, JSON.stringify(receipt));
  // Clear cart
  db.prepare("DELETE FROM cart_items WHERE cart_id = ?").run(cart.id);

  res.json({ ok: true, receipt });
});

export default router;
