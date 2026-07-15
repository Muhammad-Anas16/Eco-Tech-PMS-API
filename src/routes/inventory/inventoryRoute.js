import express from "express";

import {
  createInventoryController,
  getInventoriesController,
  getInventoryByIdController,
  updateInventoryController,
  deleteInventoryController,
} from "../../controllers/inventory/inventory.controller.js";

const inventoryRoute = express.Router();

// Create Inventory
inventoryRoute.post("/inventory", createInventoryController);

// Get All Inventory
inventoryRoute.get("/inventory", getInventoriesController);

// Get Inventory By ID
inventoryRoute.get("/inventory/:id", getInventoryByIdController);

// Update Inventory
inventoryRoute.put("/inventory/:id", updateInventoryController);

// Delete Inventory
inventoryRoute.delete("/inventory/:id", deleteInventoryController);

export default inventoryRoute;
