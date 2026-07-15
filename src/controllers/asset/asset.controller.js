import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from "../../models/asset/asset.model.js";

import resFunc from "../../utils/resFunc.js";

// Create Asset
export const createAssetController = (req, res) => {
  try {
    const result = createAsset(req.body);

    return resFunc(res, 201, true, "Asset created successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get All Assets
export const getAssetsController = (req, res) => {
  try {
    const assets = getAssets();

    return resFunc(res, 200, true, "Assets fetched successfully.", assets);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Asset By ID
export const getAssetByIdController = (req, res) => {
  try {
    const { id } = req.params;

    const asset = getAssetById(id);

    if (!asset) {
      return resFunc(res, 404, false, "Asset not found.");
    }

    return resFunc(res, 200, true, "Asset fetched successfully.", asset);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Asset
export const updateAssetController = (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const result = updateAsset(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Asset not found.");
    }

    return resFunc(res, 200, true, "Asset updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete Asset
export const deleteAssetController = (req, res) => {
  try {
    const { id } = req.params;

    const result = deleteAsset(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Asset not found.");
    }

    return resFunc(res, 200, true, "Asset deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
