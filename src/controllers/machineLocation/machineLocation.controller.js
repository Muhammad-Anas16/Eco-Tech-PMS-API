import {
  createMachineLocation,
  getMachineLocations,
  getMachineLocationById,
  getLocationsByMachineId,
  updateMachineLocation,
  deleteMachineLocation,
} from "../../models/machineLocation/machineLocation.model.js";
import resFunc from "../../utils/resFunc.js";

// Create Machine Location
export const createMachineLocationController = (req, res) => {
  try {
    const { machineId, locationName } = req.body;

    if (!machineId || !locationName) {
      return resFunc(
        res,
        400,
        false,
        "machineId and locationName are required.",
      );
    }

    const result = createMachineLocation(req.body);

    return resFunc(
      res,
      201,
      true,
      "Machine location created successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get All Machine Locations
export const getMachineLocationsController = (req, res) => {
  try {
    const locations = getMachineLocations();

    return resFunc(
      res,
      200,
      true,
      "Machine locations fetched successfully.",
      locations,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Machine Location By ID
export const getMachineLocationByIdController = (req, res) => {
  try {
    const { id } = req.params;

    const location = getMachineLocationById(id);

    if (!location) {
      return resFunc(res, 404, false, "Machine location not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Machine location fetched successfully.",
      location,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Locations By Machine ID
export const getLocationsByMachineIdController = (req, res) => {
  try {
    const { machineId } = req.params;

    const locations = getLocationsByMachineId(machineId);

    return resFunc(
      res,
      200,
      true,
      "Machine locations fetched successfully.",
      locations,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Machine Location
export const updateMachineLocationController = (req, res) => {
  try {
    const { id } = req.params;

    const result = updateMachineLocation(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Machine location not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Machine location updated successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete Machine Location
export const deleteMachineLocationController = (req, res) => {
  try {
    const { id } = req.params;

    const result = deleteMachineLocation(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Machine location not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Machine location deleted successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
