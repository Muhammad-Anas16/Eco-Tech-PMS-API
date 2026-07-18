import {
  createJobRequest,
  getJobRequests,
  getJobRequestById,
  updateJobRequest,
  updateJobRequestStatus,
  deleteJobRequest,
} from "../../models/jobRequest/jobRequest.model.js";
import resFunc from "../../utils/resFunc.js";

// Valid status values — inke ilawa koi aur value allow nahi karni
const VALID_STATUSES = ["Open", "In-Progress", "Closed"];

// Create
export const createJobRequestController = (req, res) => {
  try {
    const { machineId, requestedByName } = req.body;

    if (!machineId || !requestedByName) {
      return resFunc(
        res,
        400,
        false,
        "machineId and requestedByName are required.",
      );
    }

    const result = createJobRequest(req.body);

    return resFunc(res, 201, true, "Job request created successfully.", result);
  } catch (error) {
    if (error.message.includes("FOREIGN KEY constraint failed")) {
      return resFunc(
        res,
        400,
        false,
        "Invalid machineId — machine does not exist.",
      );
    }
    return resFunc(res, 500, false, error.message);
  }
};

// Get All
export const getJobRequestsController = (req, res) => {
  try {
    return resFunc(
      res,
      200,
      true,
      "Job requests fetched successfully.",
      getJobRequests(),
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get By ID
export const getJobRequestByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const jobRequest = getJobRequestById(id);

    if (!jobRequest) {
      return resFunc(res, 404, false, "Job request not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Job request fetched successfully.",
      jobRequest,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update (details)
export const updateJobRequestController = (req, res) => {
  try {
    const { id } = req.params;
    const { machineId, requestedByName } = req.body;

    if (!machineId || !requestedByName) {
      return resFunc(
        res,
        400,
        false,
        "machineId and requestedByName are required.",
      );
    }

    const result = updateJobRequest(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Job request not found.");
    }

    return resFunc(res, 200, true, "Job request updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Status (Open -> In-Progress -> Closed)
export const updateJobRequestStatusController = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return resFunc(
        res,
        400,
        false,
        `status must be one of: ${VALID_STATUSES.join(", ")}`,
      );
    }

    const result = updateJobRequestStatus(id, status);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Job request not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Job request status updated successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete
export const deleteJobRequestController = (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteJobRequest(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Job request not found.");
    }

    return resFunc(res, 200, true, "Job request deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
