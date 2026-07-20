import {
  addJobCardItem,
  getItemsByJobCard,
  deleteJobCardItem,
  getJobCardItemById,
} from "../../models/jobCardItem/jobCardItem.model.js";
import resFunc from "../../utils/resFunc.js";

// ⚠️ NOTE: Inventory table ke exact fields abhi confirm nahi hain — is liye
// stock deduction (Inventory se quantity kam karna) yahan nahi laga, taake
// galat column name se crash na ho. Inventory model confirm hote hi
// ek line add karni hogi: "quantity ko Inventory table se kam karo".

// Add Item
export const addJobCardItemController = (req, res) => {
  try {
    const { jobCardId } = req.params;
    const { itemCode, itemName, quantityIssued } = req.body;

    if (!itemCode || !itemName || !quantityIssued) {
      return resFunc(
        res,
        400,
        false,
        "itemCode, itemName and quantityIssued are required.",
      );
    }

    const result = addJobCardItem({ ...req.body, jobCardId });

    return resFunc(res, 201, true, "Item issued successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// List
export const getItemsByJobCardController = (req, res) => {
  try {
    const { jobCardId } = req.params;
    return resFunc(
      res,
      200,
      true,
      "Items fetched successfully.",
      getItemsByJobCard(jobCardId),
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete
export const deleteJobCardItemController = (req, res) => {
  try {
    const { id } = req.params;
    const item = getJobCardItemById(id);

    if (!item) {
      return resFunc(res, 404, false, "Item entry not found.");
    }

    deleteJobCardItem(id);

    return resFunc(res, 200, true, "Item entry deleted successfully.");
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
