import resFunc from "../utils/resFunc.js";

// Usage: roleMiddleware("manager", "admin") — sirf inhi roles ko access milega
// Hamesha authMiddleware ke BAAD lagana hai (isko req.user chahiye)
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return resFunc(
        res,
        403,
        false,
        "You don't have permission to perform this action.",
      );
    }
    next();
  };
};

export default roleMiddleware;
