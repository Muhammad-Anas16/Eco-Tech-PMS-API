import {
  assignTechnician,
  getTechniciansByJobCard,
  removeTechnicianAssignment,
} from "../../models/jobCardTechnician/jobCardTechnician.model.js";
import resFunc from "../../utils/resFunc.js";
import db2 from "../../config/db.js";

// Assign
export const assignTechnicianController = (req, res) => {
  try {
    const { jobCardId } = req.params;
    const { technicianId } = req.body;

    if (!technicianId) {
      return resFunc(res, 400, false, "technicianId is required.");
    }

    const result = assignTechnician(jobCardId, technicianId);

    return resFunc(res, 201, true, "Technician assigned successfully.", result);
  } catch (error) {
    if (error.message.includes("FOREIGN KEY constraint failed")) {
      return resFunc(res, 400, false, "Invalid jobCardId.");
    }
    return resFunc(res, 500, false, error.message);
  }
};

// List (technician naam ke sath — general.db se alag query)
export const getTechniciansByJobCardController = (req, res) => {
  try {
    const { jobCardId } = req.params;
    const assignments = getTechniciansByJobCard(jobCardId);

    const withNames = assignments.map((a) => {
      const tech = db2
        .prepare(`SELECT techName, techCode FROM technicians WHERE id = ?`)
        .get(a.technicianId);

      return {
        ...a,
        techName: tech?.techName || null,
        techCode: tech?.techCode || null,
      };
    });

    return resFunc(
      res,
      200,
      true,
      "Technicians fetched successfully.",
      withNames,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Remove
export const removeTechnicianAssignmentController = (req, res) => {
  try {
    const { id } = req.params;
    const result = removeTechnicianAssignment(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Assignment not found.");
    }

    return resFunc(res, 200, true, "Technician removed successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
