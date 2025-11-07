// scripts/init-db.js
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const dbFile = path.join(dataDir, "ecommerce.db");

// Preferred SQL location: backend/init.sql, fallback: projectRoot/init.sql
const sqlCandidates = [
  path.join(projectRoot, "init.sql"),               // backend/init.sql (preferred now)
  path.join(projectRoot, "..", "init.sql")          // projectRoot/init.sql (fallback)
];

function findSql() {
  for (const p of sqlCandidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

try {
  const sqlPath = findSql();
  if (!sqlPath) {
    throw new Error(
      "init.sql not found. Tried:\n" + sqlCandidates.map(p => ` - ${p}`).join("\n")
    );
  }

  console.log("📄 Using SQL file:", sqlPath);

  // ensure data dir exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("📁 Created data directory:", dataDir);
  }

  // delete old DB if exists
  if (fs.existsSync(dbFile)) {
    console.log("🗑️  Deleting old database:", dbFile);
    fs.unlinkSync(dbFile);
  }

  // read SQL and create DB
  const sql = fs.readFileSync(sqlPath, "utf8");
  console.log("🧱 Creating new database:", dbFile);
  const db = new Database(dbFile);
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec(sql);
  db.close();

  console.log("✅ Database created and seeded successfully!");
} catch (err) {
  console.error("❌ Error rebuilding database:", err);
  process.exitCode = 1;
}
