import express from "express";
import {
  assignTechnicianController,
  getTechniciansByJobCardController,
  removeTechnicianAssignmentController,
} from "../../controllers/jobCardTechnician/jobCardTechnician.controller.js";
import {
  addJobCardItemController,
  getItemsByJobCardController,
  deleteJobCardItemController,
} from "../../controllers/jobCardItem/jobCardItem.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const jobCardSubRoute = express.Router();

// Technicians
jobCardSubRoute.post(
  "/job-cards/:jobCardId/technicians",
  authMiddleware,
  assignTechnicianController,
);
jobCardSubRoute.get(
  "/job-cards/:jobCardId/technicians",
  authMiddleware,
  getTechniciansByJobCardController,
);
jobCardSubRoute.delete(
  "/job-card-technicians/:id",
  authMiddleware,
  removeTechnicianAssignmentController,
);

// Items
jobCardSubRoute.post(
  "/job-cards/:jobCardId/items",
  authMiddleware,
  addJobCardItemController,
);
jobCardSubRoute.get(
  "/job-cards/:jobCardId/items",
  authMiddleware,
  getItemsByJobCardController,
);
jobCardSubRoute.delete(
  "/job-card-items/:id",
  authMiddleware,
  deleteJobCardItemController,
);

export default jobCardSubRoute;
