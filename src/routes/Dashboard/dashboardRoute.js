import express from "express";
import { getDashboardController } from "../../controllers/dashboard/dashboard.controller.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/dashboard", getDashboardController);

export default dashboardRoute;
