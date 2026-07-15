import {
  createInventory,
  getInventories,
  getInventoryById,
  updateInventory,
  deleteInventory,
} from "../../models/inventory/inventory.model.js";
import resFunc from "../../utils/resFunc.js";

// Create Inventory
export const createInventoryController = (req, res) => {
  try {
    const result = createInventory(req.body);

    return resFunc(
      res,
      201,
      true,
      "Inventory item created successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get All Inventory
export const getInventoriesController = (req, res) => {
  try {
    const inventories = getInventories();

    return resFunc(
      res,
      200,
      true,
      "Inventory fetched successfully.",
      inventories,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Inventory By ID
export const getInventoryByIdController = (req, res) => {
  try {
    const { id } = req.params;

    const inventory = getInventoryById(id);

    if (!inventory) {
      return resFunc(res, 404, false, "Inventory item not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Inventory item fetched successfully.",
      inventory,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Inventory
export const updateInventoryController = (req, res) => {
  try {
    const { id } = req.params;

    const result = updateInventory(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Inventory item not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Inventory item updated successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete Inventory
export const deleteInventoryController = (req, res) => {
  try {
    const { id } = req.params;

    const result = deleteInventory(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Inventory item not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Inventory item deleted successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
