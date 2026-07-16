import express from "express";

import {
  createOperatorController,
  getOperatorsController,
  getOperatorByIdController,
  updateOperatorController,
  deleteOperatorController,
} from "../../controllers/operator/operator.controller.js";

const operatorRoute = express.Router();

operatorRoute.post("/operators", createOperatorController);
operatorRoute.get("/operators", getOperatorsController);
operatorRoute.get("/operators/:id", getOperatorByIdController);
operatorRoute.put("/operators/:id", updateOperatorController);
operatorRoute.delete("/operators/:id", deleteOperatorController);

export default operatorRoute;
