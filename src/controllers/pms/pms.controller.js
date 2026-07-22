import {
  createPms,
  getPmsRecords,
  getPmsById,
  updatePms,
  deletePms,
} from "../../models/pms/pms.model.js";
import db2 from "../../config/db.js";
import resFunc from "../../utils/resFunc.js";

const VALID_STATUSES = [
  "New Job",
  "In-Progress",
  "Pending Verification",
  "Completed",
];

// Technician cross-database hai (general.db) — naam yahan attach karte hain
const attachTechnicianName = (pms) => {
  if (!pms || !pms.assignedTechnicianId) return pms;
  const tech = db2
    .prepare(`SELECT techName, techCode FROM technicians WHERE id = ?`)
    .get(pms.assignedTechnicianId);
  return { ...pms, technicianName: tech?.techName || null };
};

export const createPmsController = (req, res) => {
  try {
    const { machineId, startDate, status } = req.body;

    if (!machineId || !startDate) {
      return resFunc(res, 400, false, "machineId and startDate are required.");
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return resFunc(
        res,
        400,
        false,
        `status must be one of: ${VALID_STATUSES.join(", ")}`,
      );
    }

    const result = createPms(req.body);
    return resFunc(res, 201, true, "PMS record created successfully.", result);
  } catch (error) {
    if (error.message.includes("FOREIGN KEY constraint failed")) {
      return resFunc(res, 400, false, "Invalid machineId.");
    }
    return resFunc(res, 500, false, error.message);
  }
};

export const getPmsRecordsController = (req, res) => {
  try {
    const records = getPmsRecords().map(attachTechnicianName);
    return resFunc(
      res,
      200,
      true,
      "PMS records fetched successfully.",
      records,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

export const getPmsByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const pms = getPmsById(id);

    if (!pms) {
      return resFunc(res, 404, false, "PMS record not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "PMS record fetched successfully.",
      attachTechnicianName(pms),
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

export const updatePmsController = (req, res) => {
  try {
    const { id } = req.params;
    const { machineId, startDate, status } = req.body;

    if (!machineId || !startDate) {
      return resFunc(res, 400, false, "machineId and startDate are required.");
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return resFunc(
        res,
        400,
        false,
        `status must be one of: ${VALID_STATUSES.join(", ")}`,
      );
    }

    const result = updatePms(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "PMS record not found.");
    }

    return resFunc(res, 200, true, "PMS record updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

export const deletePmsController = (req, res) => {
  try {
    const { id } = req.params;
    const result = deletePms(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "PMS record not found.");
    }

    return resFunc(res, 200, true, "PMS record deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
