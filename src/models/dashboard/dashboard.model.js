import db2 from "../../config/db.js";

// Total Assets
export const getTotalAssets = () => {
  const statement = db2.prepare(`
    SELECT COUNT(*) AS totalAssets
    FROM assets
  `);

  return statement.get();
};

// Total Inventory
export const getTotalInventory = () => {
  const statement = db2.prepare(`
    SELECT COUNT(*) AS totalInventory
    FROM inventory
  `);

  return statement.get();
};

// Low Stock Items
export const getLowStockItems = () => {
  const statement = db2.prepare(`
    SELECT COUNT(*) AS lowStockItems
    FROM inventory
    WHERE quantity <= minimumStock
  `);

  return statement.get();
};

// Recent Assets
export const getRecentAssets = () => {
  const statement = db2.prepare(`
    SELECT *
    FROM assets
    ORDER BY createdAt DESC
    LIMIT 5
  `);

  return statement.all();
};

// Recent Inventory
export const getRecentInventory = () => {
  const statement = db2.prepare(`
    SELECT *
    FROM inventory
    ORDER BY createdAt DESC
    LIMIT 5
  `);

  return statement.all();
};
