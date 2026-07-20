import express from "express";
import {
  createJobCardController,
  getJobCardsController,
  getJobCardByIdController,
  deleteJobCardController,
  updateJobCardTimingController,
  updateJobCardStatusController,
} from "../../controllers/jobCard/jobCard.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const jobCardRoute = express.Router();

jobCardRoute.post("/job-cards", authMiddleware, createJobCardController);
jobCardRoute.get("/job-cards", authMiddleware, getJobCardsController);
jobCardRoute.get("/job-cards/:id", authMiddleware, getJobCardByIdController);
jobCardRoute.delete("/job-cards/:id", authMiddleware, deleteJobCardController);
// ...existing routes
jobCardRoute.put(
  "/job-cards/:id/timing",
  authMiddleware,
  updateJobCardTimingController,
);
jobCardRoute.patch(
  "/job-cards/:id/status",
  authMiddleware,
  updateJobCardStatusController,
);

export default jobCardRoute;
