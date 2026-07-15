import express from "express";
import { auth } from "../../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node"; // ⭐ Import karo

const userRoute = express.Router();

userRoute.get("/auth/user", async (req, res) => {
  try {
    // ⭐ fromNodeHeaders se Express headers convert karo
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid or expired token",
      });
    }

    // ⭐ Session mein user data already included hai
    return res.status(200).json({
      success: true,
      message: "User fetched",
      data: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        role: session.user.role, // Additional field automatically included
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

export default userRoute;
