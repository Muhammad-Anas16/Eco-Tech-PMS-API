import express from "express";

import {
  createAuthorityController,
  getAuthoritiesController,
  getAuthorityByIdController,
  updateAuthorityController,
  deleteAuthorityController,
} from "../../controllers/authority/authority.controller.js";

const authorityRoute = express.Router();

authorityRoute.post("/authorities", createAuthorityController);
authorityRoute.get("/authorities", getAuthoritiesController);
authorityRoute.get("/authorities/:id", getAuthorityByIdController);
authorityRoute.put("/authorities/:id", updateAuthorityController);
authorityRoute.delete("/authorities/:id", deleteAuthorityController);

export default authorityRoute;
