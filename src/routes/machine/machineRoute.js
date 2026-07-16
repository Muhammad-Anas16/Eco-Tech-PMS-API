import express from "express";
import {
  createMachineController,
  getMachinesController,
  getMachineByIdController,
  updateMachineController,
  deleteMachineController,
} from "../../controllers/machine/machine.controller.js";

const machineRoute = express.Router();

// Create
machineRoute.post("/machines", createMachineController);

// Read
machineRoute.get("/machines", getMachinesController);
machineRoute.get("/machines/:id", getMachineByIdController);

// Update
machineRoute.put("/machines/:id", updateMachineController);

// Delete
machineRoute.delete("/machines/:id", deleteMachineController);

export default machineRoute;
