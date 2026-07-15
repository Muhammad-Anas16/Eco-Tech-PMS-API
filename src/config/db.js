import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file ka path
const databasePath = path.join(__dirname, "../database/pms.db");

// Agar file nahi hai to automatically create ho jayegi
const db2 = new Database(databasePath);

console.log("✅ SQLite Database Connected");

export default db2;
