import express from "express";
import {
  createFaultController,
  getFaultsController,
  getActiveFaultsController,
  getFaultByIdController,
  updateFaultController,
  deleteFaultController,
} from "../../controllers/fault/fault.controller.js";

const faultRoute = express.Router();

// "/faults/active" ko "/faults/:id" se PEHLE likhna zaroori hai,
// warna Express "active" ko :id maan lega
faultRoute.get("/faults/active", getActiveFaultsController);

faultRoute.post("/faults", createFaultController);
faultRoute.get("/faults", getFaultsController);
faultRoute.get("/faults/:id", getFaultByIdController);
faultRoute.put("/faults/:id", updateFaultController);
faultRoute.delete("/faults/:id", deleteFaultController);

export default faultRoute;
