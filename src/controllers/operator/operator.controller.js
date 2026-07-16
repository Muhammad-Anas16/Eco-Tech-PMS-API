import {
  createOperator,
  getOperators,
  getOperatorById,
  updateOperator,
  deleteOperator,
} from "../../models/operator/operator.model.js";
import resFunc from "../../utils/resFunc.js";

// Create Operator
export const createOperatorController = (req, res) => {
  try {
    const { operatorCode, operatorName } = req.body;

    if (!operatorCode || !operatorName) {
      return resFunc(
        res,
        400,
        false,
        "operatorCode and operatorName are required.",
      );
    }

    const result = createOperator(req.body);

    return resFunc(res, 201, true, "Operator created successfully.", result);
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return resFunc(res, 409, false, "Operator code already exists.");
    }
    return resFunc(res, 500, false, error.message);
  }
};

// Get All Operators
export const getOperatorsController = (req, res) => {
  try {
    const operators = getOperators();

    return resFunc(
      res,
      200,
      true,
      "Operators fetched successfully.",
      operators,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Operator By ID
export const getOperatorByIdController = (req, res) => {
  try {
    const { id } = req.params;

    const operator = getOperatorById(id);

    if (!operator) {
      return resFunc(res, 404, false, "Operator not found.");
    }

    return resFunc(res, 200, true, "Operator fetched successfully.", operator);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Operator
export const updateOperatorController = (req, res) => {
  try {
    const { id } = req.params;

    const result = updateOperator(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Operator not found.");
    }

    return resFunc(res, 200, true, "Operator updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete Operator
export const deleteOperatorController = (req, res) => {
  try {
    const { id } = req.params;

    const result = deleteOperator(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Operator not found.");
    }

    return resFunc(res, 200, true, "Operator deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
