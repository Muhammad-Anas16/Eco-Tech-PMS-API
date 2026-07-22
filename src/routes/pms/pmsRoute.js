import express from "express";
import {
  createPmsController, getPmsRecordsController, getPmsByIdController,
  updatePmsController, deletePmsController,
} from "../../controllers/pms/pms.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const pmsRoute = express.Router();

pmsRoute.post("/pms", authMiddleware, createPmsController);
pmsRoute.get("/pms", authMiddleware, getPmsRecordsController);
pmsRoute.get("/pms/:id", authMiddleware, getPmsByIdController);
pmsRoute.put("/pms/:id", authMiddleware, updatePmsController);
pmsRoute.delete("/pms/:id", authMiddleware, deletePmsController);

export default pmsRoute;