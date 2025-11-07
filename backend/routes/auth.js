// backend/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_for_dev";

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) return res.status(409).json({ error: "Email already used" });

  const hashed = bcrypt.hashSync(password, 8);
  const info = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hashed);
  const user = { id: info.lastInsertRowid, name, email };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ user, token });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const row = db.prepare("SELECT id, name, email, password FROM users WHERE email = ?").get(email);
  if (!row) return res.status(401).json({ error: "Invalid credentials" });
  const ok = bcrypt.compareSync(password, row.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const user = { id: row.id, name: row.name, email: row.email };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
  res.json({ user, token });
});

export default router;
