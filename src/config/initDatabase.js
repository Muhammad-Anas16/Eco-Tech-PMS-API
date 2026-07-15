import { createAssetTables } from "../models/asset/asset.model.js";

export const initializeDatabase = () => {
  console.log("🚀 Initializing Database...");

  createAssetTables();

  console.log("✅ Database Ready");
};
