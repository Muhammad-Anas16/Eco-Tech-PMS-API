import express from "express";
import { auth } from "../../utils/auth.js";

const logoutRoute = express.Router();

logoutRoute.post("/auth/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token nahi mila",
      });
    }
    // Session delete
    await auth.context.internalAdapter.deleteSession(token);

    return res.status(200).json({
      success: true,
      message: "Logout ho gaya",
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Logout ho gaya",
    });
  }
});

export default logoutRoute;
