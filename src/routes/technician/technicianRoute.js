import express from "express";

import {
  createTechnicianController,
  getTechniciansController,
  getTechnicianByIdController,
  updateTechnicianController,
  deleteTechnicianController,
} from "../../controllers/technician/technician.controller.js";

const technicianRoute = express.Router();

technicianRoute.post("/technicians", createTechnicianController);
technicianRoute.get("/technicians", getTechniciansController);
technicianRoute.get("/technicians/:id", getTechnicianByIdController);
technicianRoute.put("/technicians/:id", updateTechnicianController);
technicianRoute.delete("/technicians/:id", deleteTechnicianController);

export default technicianRoute;
