import { createAssetTable } from "../models/asset/asset.model.js";

export const initializeDatabase = () => {
  console.log("🚀 Initializing Database...");

  createAssetTable();

  console.log("✅ Database Ready");
};
