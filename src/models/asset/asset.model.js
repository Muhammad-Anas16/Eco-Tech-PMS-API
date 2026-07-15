import db2 from "../../config/db.js";

export const createAssetTables = async () => {
  const query = `CREATE TABLE IF NOT EXISTS assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assetcode TEXT NOT NULL UNIQUE,
  assetname TEXT,
  cetagory TEXT,
  location TEXT,
  manufacturer TEXT,
  serialnumber TEXT,
  status TEXT DEFAULT 'active',
  createdat DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedat DATETIME DEFAULT CURRENT_TIMESTAMP
)
  `;
  db2.exec(query);

  console.log("Assest TAble Created ⚡");
};
