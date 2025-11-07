// db.js
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname);
const dataDir = path.join(projectRoot, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbFile = path.join(dataDir, "ecommerce.db");
const db = new Database(dbFile);

// helper to check for existing tables
function tableExists(name) {
  try {
    const r = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name = ?"
    ).get(name);
    return !!r;
  } catch (err) {
    return false;
  }
}

// If DB is empty or key tables missing, apply init.sql
const stats = fs.existsSync(dbFile) ? fs.statSync(dbFile) : null;
const maybeEmpty = !stats || stats.size === 0;

if (maybeEmpty || !tableExists("products") || !tableExists("users")) {
  // Try backend/init.sql first, then project-root ../init.sql
  const candidates = [
    path.join(projectRoot, "init.sql"),           // backend/init.sql (now expected)
    path.join(projectRoot, "..", "init.sql")      // project root fallback
  ];
  let sqlPath = null;
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      sqlPath = c;
      break;
    }
  }

  if (sqlPath) {
    const initSQL = fs.readFileSync(sqlPath, "utf8");
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec(initSQL);
    console.log("🧱 Applied init SQL from:", sqlPath);
  } else {
    console.warn("⚠️ init.sql not found; DB tables may be missing.");
  }
} else {
  db.exec("PRAGMA foreign_keys = ON;");
}

export default db;
