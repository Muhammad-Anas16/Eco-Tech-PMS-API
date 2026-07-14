import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const auth = betterAuth({
  database: new Database(path.join(__dirname, "../database/sqlite.db")),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
