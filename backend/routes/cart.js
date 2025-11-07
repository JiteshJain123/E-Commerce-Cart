// backend/routes/cart.js
import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret_for_dev";

const router = express.Router();

/* helper: get or create cart for user (or guest cart id in body) */
function getOrCreateCartForUser(userId) {
  let cart = db.prepare("SELECT id FROM carts WHERE user_id = ?").get(userId);
  if (!cart) {
    const info = db.prepare("INSERT INTO carts (user_id) VALUES (?)").run(userId);
    return { id: info.lastInsertRowid };
  }
  return cart;
}

/* Middleware to optionally authenticate user */
function tryAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return next();
  const token = auth.split(" ")[1];
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
  } catch (e) {
    // ignore invalid token
  }
  next();
}
router.use(tryAuth);

/* GET /api/cart - returns items + total (for authenticated user cart)
   If no user: allow optional cart_id query param for guest carts (not implemented fully) */
router.get("/", (req, res) => {
  const user = req.user;
  let cartId;
  if (user) {
    const cart = getOrCreateCartForUser(user.id);
    cartId = cart.id;
  } else {
    return res.status(400).json({ error: "Login to access cart in this demo" });
  }
  const items = db.prepare(`
    SELECT ci.id as id, p.id as productId, p.name, p.price, ci.qty, ci.price_at_time
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = ?
  `).all(cartId);
  let total = 0;
  items.forEach(i => total += i.qty * i.price);
  res.json({ items, total, cartId });
});

/* POST /api/cart - add { productId, qty } - requires auth for this demo */
router.post("/", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Login required" });
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: "Missing product or qty" });

  const cart = getOrCreateCartForUser(user.id);
  // Check existing item
  const existing = db.prepare("SELECT id, qty FROM cart_items WHERE cart_id = ? AND product_id = ?").get(cart.id, productId);
  if (existing) {
    const newQty = existing.qty + qty;
    db.prepare("UPDATE cart_items SET qty = ? WHERE id = ?").run(newQty, existing.id);
  } else {
    const price = db.prepare("SELECT price FROM products WHERE id = ?").get(productId)?.price || 0;
    db.prepare("INSERT INTO cart_items (cart_id, product_id, qty, price_at_time) VALUES (?, ?, ?, ?)").run(cart.id, productId, qty, price);
  }
  res.json({ ok: true });
});

/* DELETE /api/cart/:id - remove cart_item by cart_items.id */
router.delete("/:id", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Login required" });
  const id = req.params.id;
  db.prepare("DELETE FROM cart_items WHERE id = ?").run(id);
  res.json({ ok: true });
});

/* PUT /api/cart/:id - update qty */
router.put("/:id", (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Login required" });
  const id = req.params.id;
  const { qty } = req.body;
  if (qty <= 0) {
    db.prepare("DELETE FROM cart_items WHERE id = ?").run(id);
    return res.json({ ok: true });
  }
  db.prepare("UPDATE cart_items SET qty = ? WHERE id = ?").run(qty, id);
  res.json({ ok: true });
});

export default router;
