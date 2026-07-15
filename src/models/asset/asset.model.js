import db2 from "../../config/db.js";

//  Create Assets Table
export const createAssetTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assetCode TEXT NOT NULL UNIQUE,
      assetName TEXT NOT NULL,
      category TEXT,
      location TEXT,
      manufacturer TEXT,
      serialNumber TEXT,
      status TEXT DEFAULT 'Active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db2.exec(query);

  console.log("✅ Assets table ready");
};

//  Create Asset
export const createAsset = (asset) => {
  const statement = db2.prepare(`
    INSERT INTO assets (
      assetCode,
      assetName,
      category,
      location,
      manufacturer,
      serialNumber,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  return statement.run(
    asset.assetCode,
    asset.assetName,
    asset.category,
    asset.location,
    asset.manufacturer,
    asset.serialNumber,
    asset.status,
  );
};

//  Get All Assets
export const getAssets = () => {
  const statement = db2.prepare(`
    SELECT *
    FROM assets
    ORDER BY id DESC
  `);

  return statement.all();
};

//  Get Asset By ID
export const getAssetById = (id) => {
  const statement = db2.prepare(`
    SELECT *
    FROM assets
    WHERE id = ?
  `);

  return statement.get(id);
};

//  Update Asset
export const updateAsset = (id, asset) => {
  const statement = db2.prepare(`
    UPDATE assets
    SET
      assetCode = ?,
      assetName = ?,
      category = ?,
      location = ?,
      manufacturer = ?,
      serialNumber = ?,
      status = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    asset.assetCode,
    asset.assetName,
    asset.category,
    asset.location,
    asset.manufacturer,
    asset.serialNumber,
    asset.status,
    id,
  );
};

//  Delete Asset
export const deleteAsset = (id) => {
  const statement = db2.prepare(`
    DELETE FROM assets
    WHERE id = ?
  `);

  return statement.run(id);
};
