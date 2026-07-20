import {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
} from "../../models/machine/machine.model.js";
import resFunc from "../../utils/resFunc.js";

// Create Machine
export const createMachineController = (req, res) => {
  try {
    const { machineCode, machineName } = req.body;

    if (!machineCode || !machineName) {
      return resFunc(
        res,
        400,
        false,
        "machineCode and machineName are required.",
      );
    }

    const result = createMachine(req.body);

    return resFunc(res, 201, true, "Machine created successfully.", result);
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return resFunc(res, 409, false, "Machine code already exists.");
    }
    return resFunc(res, 500, false, error.message);
  }
};

// Get All Machines
export const getMachinesController = (req, res) => {
  try {
    const machines = getMachines();

    return resFunc(res, 200, true, "Machines fetched successfully.", machines);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Get Machine By ID
export const getMachineByIdController = (req, res) => {
  try {
    const { id } = req.params;

    const machine = getMachineById(id);

    if (!machine) {
      return resFunc(res, 404, false, "Machine not found.");
    }

    return resFunc(res, 200, true, "Machine fetched successfully.", machine);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Update Machine
export const updateMachineController = (req, res) => {
  try {
    const { id } = req.params;

    const result = updateMachine(id, req.body);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Machine not found.");
    }

    return resFunc(res, 200, true, "Machine updated successfully.", result);
  } catch (error) {
    return resFunc(res, 500, false, error.message);
  }
};

// Delete Machine
export const deleteMachineController = (req, res) => {
  try {
    const { id } = req.params;
    console.log("MAchine ID :", id);

    const result = deleteMachine(id);

    if (result.changes === 0) {
      return resFunc(res, 404, false, "Machine not found.");
    }

    return resFunc(res, 200, true, "Machine deleted successfully.", result);
  } catch (error) {
    console.log("checking Delete Err Machine", error.message);
    return resFunc(res, 500, false, error.message);
  }
};
