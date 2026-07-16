import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Alag Database file ka path (General masters ke liye)
const generalDatabasePath = path.join(__dirname, "../database/general.db");

// Agar file nahi hai to automatically create ho jayegi
const generalDb = new Database(generalDatabasePath);

console.log("✅ General SQLite Database Connected");

export default generalDb;
