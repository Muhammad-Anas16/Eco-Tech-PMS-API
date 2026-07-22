import express from "express";
import {
  createPmsScheduleController,
  getPmsSchedulesController,
  getPmsScheduleByIdController,
  updatePmsScheduleController,
  deletePmsScheduleController,
} from "../../controllers/pmsSchedule/pmsSchedule.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const pmsScheduleRoute = express.Router();

pmsScheduleRoute.post("/pms-schedules", authMiddleware, createPmsScheduleController);
pmsScheduleRoute.get("/pms-schedules", authMiddleware, getPmsSchedulesController);
pmsScheduleRoute.get("/pms-schedules/:id", authMiddleware, getPmsScheduleByIdController);
pmsScheduleRoute.put("/pms-schedules/:id", authMiddleware, updatePmsScheduleController);
pmsScheduleRoute.delete("/pms-schedules/:id", authMiddleware, deletePmsScheduleController);

export default pmsScheduleRoute;