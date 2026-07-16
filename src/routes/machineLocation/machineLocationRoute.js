import express from "express";

import {
  createMachineLocationController,
  getMachineLocationsController,
  getMachineLocationByIdController,
  getLocationsByMachineIdController,
  updateMachineLocationController,
  deleteMachineLocationController,
} from "../../controllers/machineLocation/machineLocation.controller.js";

const machineLocationRoute = express.Router();

// Create
machineLocationRoute.post(
  "/machine-locations",
  createMachineLocationController,
);

// Read
machineLocationRoute.get("/machine-locations", getMachineLocationsController);
machineLocationRoute.get(
  "/machine-locations/:id",
  getMachineLocationByIdController,
);
machineLocationRoute.get(
  "/machine-locations/machine/:machineId",
  getLocationsByMachineIdController,
);

// Update
machineLocationRoute.put(
  "/machine-locations/:id",
  updateMachineLocationController,
);

// Delete
machineLocationRoute.delete(
  "/machine-locations/:id",
  deleteMachineLocationController,
);

export default machineLocationRoute;
