import {
  createPmsSchedule,
  getPmsSchedules,
  getPmsScheduleById,
  updatePmsSchedule,
  deletePmsSchedule,
} from "../../models/pmsSchedule/pmsSchedule.model.js";
import resFunc from "../../utils/resFunc.js";

const VALID_SCHEDULE_STATUSES = ["Active", "Completed"];

export const createPmsScheduleController = (req, res) => {
  try {
    const { machineId } = req.body;

    if (!machineId) {
      return resFunc(res, 400, false, "machineId is required.");
    }

    if (req.body.status && !VALID_SCHEDULE_STATUSES.includes(req.body.status)) {
      return resFunc(
        res,
        400,
        false,
        `status must be one of: ${VALID_SCHEDULE_STATUSES.join(", ")}`,
      );
    }

    const result = createPmsSchedule(req.body);

    return resFunc(
      res,
      201,
      true,
      "PMS schedule created successfully.",
      result,
    );
  } catch (error) {
    if (error.message.includes("FOREIGN KEY constraint failed")) {
      return resFunc(
        res,
        400,
        false,
        "One of the selected machines does not exist.",
      );
    }
    return resFunc(res, 500, false, error.message);
  }
};

export const getPmsSchedulesController = (req, res) => {
  try {
    return resFunc(
      res,
      200,
      true,
      "PMS schedules fetched successfully.",
      getPmsSchedules(),
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

export const getPmsScheduleByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const schedule = getPmsScheduleById(id);

    if (!schedule) {
      return resFunc(res, 404, false, "PMS schedule not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "PMS schedule fetched successfully.",
      schedule,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

export const updatePmsScheduleController = (req, res) => {
  try {
    const { id } = req.params;
    const { machineId } = req.body;

    if (!machineId) {
      return resFunc(res, 400, false, "machineId is required.");
    }

    if (req.body.status && !VALID_SCHEDULE_STATUSES.includes(req.body.status)) {
      return resFunc(
        res,
        400,
        false,
        `status must be one of: ${VALID_SCHEDULE_STATUSES.join(", ")}`,
      );
    }

    const result = updatePmsSchedule(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "PMS schedule not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "PMS schedule updated successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

export const deletePmsScheduleController = (req, res) => {
  try {
    const { id } = req.params;
    const result = deletePmsSchedule(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "PMS schedule not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "PMS schedule deleted successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
