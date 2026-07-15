import express from "express";

import {
  createAssetController,
  getAssetsController,
  getAssetByIdController,
  updateAssetController,
  deleteAssetController,
} from "../../controllers/asset/asset.controller.js";

const assetRoute = express.Router();

// Create
assetRoute.post("/assets", createAssetController);

// Read
assetRoute.get("/assets", getAssetsController);
assetRoute.get("/assets/:id", getAssetByIdController);

// Update
assetRoute.put("/assets/:id", updateAssetController);

// Delete
assetRoute.delete("/assets/:id", deleteAssetController);

export default assetRoute;
