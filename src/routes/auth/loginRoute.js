import express from "express";
import { auth } from "../../utils/auth.js";
import resFunc from "../../utils/resFunc.js";

const loginRoute = express.Router();

loginRoute.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
      },
      asResponse: false,
    });

    // ✅ Typo fix: resurlt -> result
    resFunc(res, 200, true, "Login successfully", result);
  } catch (error) {
    resFunc(res, 400, false, error.message);
  }
});

export default loginRoute;
