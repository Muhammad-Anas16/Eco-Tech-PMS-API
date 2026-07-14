import express from "express";
import { auth } from "../../utils/auth.js";
import resFunc from "../../utils/resFunc.js";

const registerRoute = express.Router();

registerRoute.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const result = await auth.api.signUpEmail({
      body: {
        name: username,
        email: email,
        password: password,
      },
      asResponse: false,
    });

    resFunc(res, 201, true, "Register successfully", result.user);
  } catch (error) {
    resFunc(res, 400, false, error.message);
  }
});

export default registerRoute;
