import { createAssetTable } from "../models/asset/asset.model.js";
import { createUserTable } from "../models/authUser/authUser.model.js";
import { createFaultTable } from "../models/fault/fault.model.js";
import { createInventoryTable } from "../models/inventory/inventory.model.js";
import { createJobRequestTable } from "../models/jobRequest/jobRequest.model.js";
import { createMachineTable } from "../models/machine/machine.model.js";
import { createMachineLocationTable } from "../models/machineLocation/machineLocation.model.js";

export const initializeDatabase = () => {
  console.log("🚀 Initializing Database...");

  createJobRequestTable();
  createUserTable();
  createFaultTable();
  createAssetTable();
  createInventoryTable();
  createMachineTable();
  createMachineLocationTable();

  console.log("✅ Database Ready");
};
