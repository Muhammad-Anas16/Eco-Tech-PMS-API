import db2 from "../../config/db.js";

//  Create Machines Table
export const createMachineTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS machines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      machineCode TEXT NOT NULL UNIQUE,
      machineName TEXT NOT NULL,
      plant TEXT,
      status TEXT DEFAULT 'Active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db2.exec(query);

  console.log("✅ Machines table ready");
};

//  Create Machine
export const createMachine = (machine) => {
  const statement = db2.prepare(`
    INSERT INTO machines (
      machineCode,
      machineName,
      plant,
      status
    )
    VALUES (?, ?, ?, ?)
  `);

  return statement.run(
    machine.machineCode,
    machine.machineName,
    machine.plant,
    machine.status || "Active",
  );
};

//  Get All Machines
export const getMachines = () => {
  const statement = db2.prepare(`
    SELECT *
    FROM machines
    ORDER BY id DESC
  `);

  return statement.all();
};

//  Get Machine By ID
export const getMachineById = (id) => {
  const statement = db2.prepare(`
    SELECT *
    FROM machines
    WHERE id = ?
  `);

  return statement.get(id);
};

//  Update Machine
export const updateMachine = (id, machine) => {
  const statement = db2.prepare(`
    UPDATE machines
    SET
      machineCode = ?,
      machineName = ?,
      plant = ?,
      status = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    machine.machineCode,
    machine.machineName,
    machine.plant,
    machine.status,
    id,
  );
};

//  Delete Machine
export const deleteMachine = (id) => {
  const statement = db2.prepare(`
    DELETE FROM machines
    WHERE id = ?
  `);

  return statement.run(id);
};
