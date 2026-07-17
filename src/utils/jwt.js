import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pms_secret_key_change_this";
const JWT_EXPIRES_IN = "30d"; // token 30 din valid rahega

// Login ke waqt naya token banane ke liye
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Protected routes pe token check karne ke liye
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
