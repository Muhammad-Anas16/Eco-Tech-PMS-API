import { createAssetTable } from "../models/asset/asset.model.js";
import { createInventoryTable } from "../models/inventory/inventory.model.js";

export const initializeDatabase = () => {
  console.log("🚀 Initializing Database...");

  createAssetTable();
  createInventoryTable();

  console.log("✅ Database Ready");
};
