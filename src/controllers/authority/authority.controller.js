import {
  createAuthority,
  getAuthorities,
  getAuthorityById,
  updateAuthority,
  deleteAuthority,
} from "../../models/authority/authority.model.js";
import resFunc from "../../utils/resFunc.js";

// Create Authority
export const createAuthorityController = (req, res) => {
  try {
    const { authorityName } = req.body;

    if (!authorityName) {
      return resFunc(res, 400, false, "authorityName is required.");
    }

    const result = createAuthority(req.body);

    return resFunc(res, 201, true, "Authority created successfully.", result);
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return resFunc(res, 409, false, "Authority name already exists.");
    }
    return resFunc(res, 500, false, error.message);
  }
};

// Get All Authorities
export const getAuthoritiesController = (req, res) => {
  try {
    const authorities = getAuthorities();

    return resFunc(
      res,
      200,
      true,
      "Authorities fetched successfully.",
      authorities,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Authority By ID
export const getAuthorityByIdController = (req, res) => {
  try {
    const { id } = req.params;

    const authority = getAuthorityById(id);

    if (!authority) {
      return resFunc(res, 404, false, "Authority not found.");
    }

    return resFunc(
      res,
      200,
      true,
      "Authority fetched successfully.",
      authority,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Authority
export const updateAuthorityController = (req, res) => {
  try {
    const { id } = req.params;

    const result = updateAuthority(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Authority not found.");
    }

    return resFunc(res, 200, true, "Authority updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete Authority
export const deleteAuthorityController = (req, res) => {
  try {
    const { id } = req.params;

    const result = deleteAuthority(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Authority not found.");
    }

    return resFunc(res, 200, true, "Authority deleted successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
