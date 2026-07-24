import express from "express";
import {
  createJobRequestController,
  getJobRequestsController,
  getJobRequestByIdController,
  updateJobRequestController,
  updateJobRequestStatusController,
  deleteJobRequestController,
  convertJobRequestToJobCardController,
} from "../../controllers/jobRequest/jobRequest.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const jobRequestRoute = express.Router();

jobRequestRoute.post(
  "/job-requests",
  authMiddleware,
  createJobRequestController,
);
jobRequestRoute.get("/job-requests", authMiddleware, getJobRequestsController);
jobRequestRoute.post(
  "/job-requests/:id/convert",
  authMiddleware,
  convertJobRequestToJobCardController,
);
jobRequestRoute.get(
  "/job-requests/:id",
  authMiddleware,
  getJobRequestByIdController,
);
jobRequestRoute.put(
  "/job-requests/:id",
  authMiddleware,
  updateJobRequestController,
);
jobRequestRoute.patch(
  "/job-requests/:id/status",
  authMiddleware,
  updateJobRequestStatusController,
);
jobRequestRoute.delete(
  "/job-requests/:id",
  authMiddleware,
  deleteJobRequestController,
);

export default jobRequestRoute;
