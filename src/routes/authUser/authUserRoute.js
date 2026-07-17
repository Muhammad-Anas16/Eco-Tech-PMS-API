import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  getMeController,
  getUsersController,
  updateUserController,
  deleteUserController,
} from "../../controllers/authUser/authUser.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";

const authUserRoute = express.Router();

// Public
authUserRoute.post("/register", registerController);
authUserRoute.post("/login", loginController);

// Login zaroori
authUserRoute.post("/logout", authMiddleware, logoutController);
authUserRoute.get("/me", authMiddleware, getMeController);

// Sirf manager/admin
authUserRoute.get(
  "/users",
  authMiddleware,
  roleMiddleware("manager", "admin"),
  getUsersController,
);
authUserRoute.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("manager", "admin"),
  updateUserController,
);
authUserRoute.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUserController,
);

export default authUserRoute;
