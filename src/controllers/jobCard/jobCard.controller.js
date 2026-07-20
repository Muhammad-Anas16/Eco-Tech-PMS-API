import {
  createJobCard,
  getJobCards,
  getJobCardById,
  deleteJobCard,
  updateJobCardTiming,
  updateJobCardStatus,
} from "../../models/jobCard/jobCard.model.js";
import generalDb from "../../config/generalDb.js";
import resFunc from "../../utils/resFunc.js";

// Job types jo video ke Job Card form me the
const VALID_JOB_TYPES = [
  "N/A",
  "Air Conditioning",
  "Annual Inspection",
  "Duct Work",
  "Electrical",
  "Electronic Lab",
  "Fab. Work",
  "Khalasi Work",
  "Lath Workshop",
  "Lift Operations",
  "Mechanical",
  "Misc. work",
  "Paint work",
  "Winding Workshop",
];

const VALID_STATUSES = ["In-Progress", "Completed"];

// operatorId se general.db me operator ka naam dhoondta hai
// (cross-database hai isliye JOIN nahi ho sakta, alag query zaroori hai)
const attachOperatorName = (jobCard) => {
  if (!jobCard || !jobCard.operatorId) return jobCard;

  const operator = generalDb
    .prepare(`SELECT operatorName FROM operators WHERE id = ?`)
    .get(jobCard.operatorId);

  return { ...jobCard, operatorName: operator?.operatorName || null };
};

// Create
export const createJobCardController = (req, res) => {
  try {
    const { machineId, jobType } = req.body;

    if (!machineId || !jobType) {
      return resFunc(res, 400, false, "machineId and jobType are required.");
    }

    if (!VALID_JOB_TYPES.includes(jobType)) {
      return resFunc(
        res,
        400,
        false,
        `jobType must be one of: ${VALID_JOB_TYPES.join(", ")}`,
      );
    }

    const result = createJobCard(req.body);

    return resFunc(res, 201, true, "Job card created successfully.", result);
  } catch (error) {
    if (error.message.includes("FOREIGN KEY constraint failed")) {
      return resFunc(res, 400, false, "Invalid machineId or faultId.");
    }
    return resFunc(res, 500, false, error.message);
  }
};

// Get All
export const getJobCardsController = (req, res) => {
  try {
    const jobCards = getJobCards().map(attachOperatorName);
    return resFunc(res, 200, true, "Job cards fetched successfully.", jobCards);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get By ID
export const getJobCardByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const jobCard = getJobCardById(id);

    if (!jobCard) {
      return resFunc(res, 404, false, "Job card not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Job card fetched successfully.",
      attachOperatorName(jobCard),
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete
export const deleteJobCardController = (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteJobCard(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Job card not found.");
    }

    return resFunc(res, 200, true, "Job card deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Timing/Details
export const updateJobCardTimingController = (req, res) => {
  try {
    const { id } = req.params;
    const result = updateJobCardTiming(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Job card not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Job card timing updated successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Status
export const updateJobCardStatusController = (req, res) => {
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

    const result = updateJobCardStatus(id, status);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Job card not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Job card status updated successfully.",
      result,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
