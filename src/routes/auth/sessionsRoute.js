import express from "express";
import { auth } from "../../utils/auth.js";
import resFunc from "../../utils/resFunc.js";

const sessionRoute = express.Router();

sessionRoute.get("/auth/get-session", async (req, res) => {
  try {
    const result = await auth.api.getSession({
      headers: req.headers, // Express se headers pass karo
    });

    if (!result) {
      return resFunc(res, 401, false, "No active session");
    }

    resFunc(res, 200, true, "Session fetched", result);
  } catch (error) {
    resFunc(res, 400, false, error.message);
  }
});

export default sessionRoute;
