import { createAuthorityTable } from "../models/authority/authority.model.js";
import { createOperatorTable } from "../models/operator/operator.model.js";
import { createTechnicianTable } from "../models/technician/technician.model.js";

export const initializeGeneralDatabase = () => {
  console.log("🚀 Initializing General Database...");

  createAuthorityTable();
  createOperatorTable();
  createTechnicianTable();

  console.log("✅ General Database Ready");
};
