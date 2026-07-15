import db2 from "../../config/db.js";

// Create Inventory Table
export const createInventoryTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itemCode TEXT NOT NULL UNIQUE,
      itemName TEXT NOT NULL,
      category TEXT,
      unit TEXT,
      quantity INTEGER DEFAULT 0,
      minimumStock INTEGER DEFAULT 0,
      location TEXT,
      supplier TEXT,
      unitPrice REAL DEFAULT 0,
      status TEXT DEFAULT 'Available',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db2.exec(query);

  console.log("✅ Inventory table ready");
};

// Create Inventory
export const createInventory = (inventory) => {
  const {
    itemCode,
    itemName,
    category,
    unit,
    quantity = 0,
    minimumStock = 0,
    location,
    supplier,
    unitPrice = 0,
    status = "Available",
  } = inventory;

  const statement = db2.prepare(`
    INSERT INTO inventory (
      itemCode,
      itemName,
      category,
      unit,
      quantity,
      minimumStock,
      location,
      supplier,
      unitPrice,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  return statement.run(
    itemCode,
    itemName,
    category,
    unit,
    quantity,
    minimumStock,
    location,
    supplier,
    unitPrice,
    status,
  );
};

// Get All Inventory
export const getInventories = () => {
  const statement = db2.prepare(`
    SELECT *
    FROM inventory
    ORDER BY id DESC
  `);

  return statement.all();
};

// Get Inventory By ID
export const getInventoryById = (id) => {
  const statement = db2.prepare(`
    SELECT *
    FROM inventory
    WHERE id = ?
  `);

  return statement.get(Number(id));
};

// Update Inventory
export const updateInventory = (id, inventory) => {
  const {
    itemCode,
    itemName,
    category,
    unit,
    quantity = 0,
    minimumStock = 0,
    location,
    supplier,
    unitPrice = 0,
    status = "Available",
  } = inventory;

  const statement = db2.prepare(`
    UPDATE inventory
    SET
      itemCode = ?,
      itemName = ?,
      category = ?,
      unit = ?,
      quantity = ?,
      minimumStock = ?,
      location = ?,
      supplier = ?,
      unitPrice = ?,
      status = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    itemCode,
    itemName,
    category,
    unit,
    quantity,
    minimumStock,
    location,
    supplier,
    unitPrice,
    status,
    Number(id),
  );
};

// Delete Inventory
export const deleteInventory = (id) => {
  const statement = db2.prepare(`
    DELETE FROM inventory
    WHERE id = ?
  `);

  return statement.run(Number(id));
};
