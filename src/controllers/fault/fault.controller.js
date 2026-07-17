import {
  createFault,
  getFaults,
  getActiveFaults,
  getFaultById,
  updateFault,
  deleteFault,
} from "../../models/fault/fault.model.js";
import resFunc from "../../utils/resFunc.js";

// Create
export const createFaultController = (req, res) => {
  try {
    const { faultName } = req.body;

    // Sirf faultName required hai, machineId optional
    if (!faultName) {
      return resFunc(res, 400, false, "faultName is required.");
    }

    const result = createFault(req.body);

    return resFunc(res, 201, true, "Fault created successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get All (machine name ke sath)
export const getFaultsController = (req, res) => {
  try {
    return resFunc(res, 200, true, "Faults fetched successfully.", getFaults());
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Only Active Faults
export const getActiveFaultsController = (req, res) => {
  try {
    return resFunc(
      res,
      200,
      true,
      "Active faults fetched successfully.",
      getActiveFaults(),
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get By ID
export const getFaultByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const fault = getFaultById(id);

    if (!fault) {
      return resFunc(res, 404, false, "Fault not found.");
    }

    return resFunc(res, 200, true, "Fault fetched successfully.", fault);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update
export const updateFaultController = (req, res) => {
  try {
    const { id } = req.params;
    const result = updateFault(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Fault not found.");
    }

    return resFunc(res, 200, true, "Fault updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete
export const deleteFaultController = (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteFault(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Fault not found.");
    }

    return resFunc(res, 200, true, "Fault deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
