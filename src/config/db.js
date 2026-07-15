import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import localDb from "../database/pms.db";
import path from "path";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const databasePath = path.join(_dirname, localDb);

const db2 = new Database(databasePath);
console.log("SQLite 2 Database connected ⚡");

export default db2;
