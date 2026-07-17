import { verifyToken } from "../utils/jwt.js";
import resFunc from "../utils/resFunc.js";

// Har protected route se pehle chalega — cookie se token nikalta
// hai, verify karta hai, aur req.user set kar deta hai
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return resFunc(res, 401, false, "Not authenticated. Please login.");
    }

    const decoded = verifyToken(token); // expire/tampered ho to yahin error throw hoga

    req.user = decoded; // { id, employeeId, role } — controllers isko use karenge

    next();
  } catch (error) {
    return resFunc(res, 401, false, "Session expired. Please login again.");
  }
};

export default authMiddleware;
