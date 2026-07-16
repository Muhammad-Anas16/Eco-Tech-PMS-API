import { createAssetTable } from "../models/asset/asset.model.js";
import { createInventoryTable } from "../models/inventory/inventory.model.js";
import { createMachineTable } from "../models/machine/machine.model.js";
import { createMachineLocationTable } from "../models/machineLocation/machineLocation.model.js";

export const initializeDatabase = () => {
  console.log("🚀 Initializing Database...");

  createAssetTable();
  createInventoryTable();
  createMachineTable();
  createMachineLocationTable();

  console.log("✅ Database Ready");
};
