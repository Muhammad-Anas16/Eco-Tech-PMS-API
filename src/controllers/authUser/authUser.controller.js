import bcrypt from "bcryptjs";
import {
  createUser,
  getUserByEmployeeId,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../../models/authUser/authUser.model.js";
import { generateToken } from "../../utils/jwt.js";
import resFunc from "../../utils/resFunc.js";

// Cookie options ek jagah — login aur logout dono me same hone chahiye
const COOKIE_OPTIONS = {
  httpOnly: true, // JS se access nahi (XSS se bachao)
  secure: process.env.NODE_ENV === "production", // production me sirf HTTPS
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 din
};

// ---------------- REGISTER ----------------
export const registerController = (req, res) => {
  try {
    const { employeeId, fullName, password, role } = req.body;

    if (!employeeId || !fullName || !password) {
      return resFunc(
        res,
        400,
        false,
        "employeeId, fullName and password are required.",
      );
    }

    // Plain password ko DB me kabhi save nahi karte — hash karke save karte hain
    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = createUser({
      employeeId,
      fullName,
      password: hashedPassword,
      role,
    });

    return resFunc(res, 201, true, "User registered successfully.", {
      id: result.lastInsertRowid,
    });
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return resFunc(res, 409, false, "Employee ID already registered.");
    }
    return resFunc(res, 500, false, error.message);
  }
};

// ---------------- LOGIN ----------------
export const loginController = (req, res) => {
  try {
    const { employeeId, password } = req.body;

    if (!employeeId || !password) {
      return resFunc(res, 400, false, "employeeId and password are required.");
    }

    const user = getUserByEmployeeId(employeeId);

    if (!user) {
      return resFunc(res, 401, false, "Invalid employee ID or password.");
    }

    if (!user.isActive) {
      return resFunc(res, 403, false, "This account is deactivated.");
    }

    // Diya gaya password DB ke hashed password se compare kar rahe hain
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return resFunc(res, 401, false, "Invalid employee ID or password.");
    }

    // Token me id + role save karte hain — har request pe dobara DB
    // query kiye baghair pata chal jayega ye kaun hai aur kya role hai
    const token = generateToken({
      id: user.id,
      employeeId: user.employeeId,
      role: user.role,
    });

    res.cookie("token", token, COOKIE_OPTIONS);

    return resFunc(res, 200, true, "Login successful.", {
      id: user.id,
      employeeId: user.employeeId,
      fullName: user.fullName,
      role: user.role,
    });
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// ---------------- LOGOUT ----------------
export const logoutController = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return resFunc(res, 200, true, "Logged out successfully.");
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// ---------------- GET LOGGED-IN USER ----------------
export const getMeController = (req, res) => {
  try {
    // req.user authMiddleware ne verify karke yahan tak pohnchaya hai
    const user = getUserById(req.user.id);

    if (!user) {
      return resFunc(res, 404, false, "User not found.");
    }

    return resFunc(res, 200, true, "User fetched successfully.", user);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// ---------------- USER MANAGEMENT (manager/admin ke liye) ----------------
export const getUsersController = (req, res) => {
  try {
    return resFunc(res, 200, true, "Users fetched successfully.", getUsers());
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

export const updateUserController = (req, res) => {
  try {
    const { id } = req.params;
    const result = updateUser(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "User not found.");
    }

    return resFunc(res, 200, true, "User updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

export const deleteUserController = (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteUser(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "User not found.");
    }

    return resFunc(res, 200, true, "User deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
