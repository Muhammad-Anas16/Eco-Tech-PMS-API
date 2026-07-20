import db2 from "../../config/db.js";

//  Faults table banata hai — machineId optional hai (kabhi general fault
//  type ho sakta hai, kabhi kisi specific machine se linked)
export const createFaultTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS faults (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      faultName TEXT NOT NULL,
      machineId INTEGER,
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (machineId) REFERENCES machines(id)
    );
  `;

  db2.exec(query);

  console.log("✅ Faults table ready");
};

// Naya fault create karta hai
export const createFault = (fault) => {
  const statement = db2.prepare(`
    INSERT INTO faults (faultName, machineId, isActive)
    VALUES (?, ?, ?)
  `);

  return statement.run(
    fault.faultName,
    fault.machineId || null, // machine na diya ho to null save hoga
    fault.isActive ? 1 : 0,
  );
};

// Sab faults — machine ka naam bhi JOIN karke sath laate hain (dono
// tables ek hi db2 connection me hain isliye ye JOIN chalega)
export const getFaults = () => {
  const statement = db2.prepare(`
    SELECT
      faults.id,
      faults.faultName,
      faults.machineId,
      machines.machineName,
      faults.isActive,
      faults.createdAt,
      faults.updatedAt
    FROM faults
    LEFT JOIN machines ON machines.id = faults.machineId
    ORDER BY faults.id DESC
  `);

  return statement.all();
};

// Sirf active faults — "Active Faults" screen ke liye
export const getActiveFaults = () => {
  const statement = db2.prepare(`
    SELECT
      faults.id,
      faults.faultName,
      faults.machineId,
      machines.machineName,
      faults.isActive
    FROM faults
    LEFT JOIN machines ON machines.id = faults.machineId
    WHERE faults.isActive = 1
    ORDER BY faults.id DESC
  `);

  return statement.all();
};

// ID se ek fault
export const getFaultById = (id) => {
  const statement = db2.prepare(`
    SELECT * FROM faults WHERE id = ?
  `);

  return statement.get(id);
};

// Fault update
export const updateFault = (id, fault) => {
  const statement = db2.prepare(`
    UPDATE faults
    SET
      faultName = ?,
      machineId = ?,
      isActive = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    fault.faultName,
    fault.machineId || null,
    fault.isActive ?? 1,
    id,
  );
};

// Fault delete
export const deleteFault = (id) => {
  const statement = db2.prepare(`
    DELETE FROM faults WHERE id = ?
  `);

  return statement.run(id);
};
