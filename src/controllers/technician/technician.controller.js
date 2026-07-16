import {
  createTechnician,
  getTechnicians,
  getTechnicianById,
  updateTechnician,
  deleteTechnician,
} from "../../models/technician/technician.model.js";
import resFunc from "../../utils/resFunc.js";

// Create Technician
export const createTechnicianController = (req, res) => {
  try {
    const { techCode, techName } = req.body;

    if (!techCode || !techName) {
      return resFunc(res, 400, false, "techCode and techName are required.");
    }

    const result = createTechnician(req.body);

    return resFunc(res, 201, true, "Technician created successfully.", result);
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return resFunc(res, 409, false, "Technician code already exists.");
    }
    return resFunc(res, 500, false, error.message);
  }
};

// Get All Technicians
export const getTechniciansController = (req, res) => {
  try {
    const technicians = getTechnicians();

    return resFunc(
      res,
      200,
      true,
      "Technicians fetched successfully.",
      technicians,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Technician By ID
export const getTechnicianByIdController = (req, res) => {
  try {
    const { id } = req.params;

    const technician = getTechnicianById(id);

    if (!technician) {
      return resFunc(res, 404, false, "Technician not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Technician fetched successfully.",
      technician,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Technician
export const updateTechnicianController = (req, res) => {
  try {
    const { id } = req.params;

    const result = updateTechnician(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Technician not found.");
    }

    return resFunc(res, 200, true, "Technician updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete Technician
export const deleteTechnicianController = (req, res) => {
  try {
    const { id } = req.params;

    const result = deleteTechnician(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Technician not found.");
    }

    return resFunc(res, 200, true, "Technician deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
