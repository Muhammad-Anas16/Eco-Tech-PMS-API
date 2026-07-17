import { verifyToken } from "../utils/jwt.js";
import resFunc from "../utils/resFunc.js";

const authMiddleware = (req, res, next) => {
  try {
    // Cookie ki jagah ab header se: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return resFunc(res, 401, false, "Not authenticated. Please login.");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return resFunc(res, 401, false, "Session expired. Please login again.");
  }
};

export default authMiddleware;
