import express from "express";

import {
  createAssetController,
  getAssetsController,
  getAssetByIdController,
  updateAssetController,
  deleteAssetController,
} from "../../controllers/asset/asset.controller.js";

const assestRoute = express.Router();

// Create Asset
assestRoute.post("/assets", createAssetController);

// Get All Assets
assestRoute.get("/assets", getAssetsController);

// Get Asset By ID
assestRoute.get("/assets/:id", getAssetByIdController);

// Update Asset
assestRoute.put("/assets/:id", updateAssetController);

// Delete Asset
assestRoute.delete("/assets/:id", deleteAssetController);

export default assestRoute;