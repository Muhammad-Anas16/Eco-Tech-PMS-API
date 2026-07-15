import {
  getTotalAssets,
  getTotalInventory,
  getLowStockItems,
  getRecentAssets,
  getRecentInventory,
} from "../../models/dashboard/dashboard.model.js";

import resFunc from "../../utils/resFunc.js";

/**
 * Get Dashboard Data
 */
export const getDashboardController = (req, res) => {
  try {
    const dashboardData = {
      totalAssets: getTotalAssets().totalAssets,
      totalInventory: getTotalInventory().totalInventory,
      lowStockItems: getLowStockItems().lowStockItems,
      recentAssets: getRecentAssets(),
      recentInventory: getRecentInventory(),
    };

    return resFunc(
      res,
      200,
      true,
      "Dashboard data fetched successfully.",
      dashboardData,
    );
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};
