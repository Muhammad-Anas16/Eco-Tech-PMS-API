import db2 from "../../config/db.js";

export const createPmsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS pms_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      machineId INTEGER NOT NULL,
      assignedTechnicianId INTEGER,
      startDate DATE NOT NULL,
      endDate DATE,
      status TEXT DEFAULT 'New Job',
      remarks TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (machineId) REFERENCES machines(id)
    );
  `;

  db2.exec(query);

  console.log("✅ PMS Records table ready");
};

export const createPms = (pms) => {
  const statement = db2.prepare(`
    INSERT INTO pms_records (machineId, assignedTechnicianId, startDate, endDate, status, remarks)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  return statement.run(
    pms.machineId,
    pms.assignedTechnicianId || null,
    pms.startDate,
    pms.endDate || null,
    pms.status || "New Job",
    pms.remarks || null,
  );
};

export const getPmsRecords = () => {
  const statement = db2.prepare(`
    SELECT p.*, m.machineName
    FROM pms_records p
    LEFT JOIN machines m ON m.id = p.machineId
    ORDER BY p.id DESC
  `);
  return statement.all();
};

export const getPmsById = (id) => {
  const statement = db2.prepare(`
    SELECT p.*, m.machineName
    FROM pms_records p
    LEFT JOIN machines m ON m.id = p.machineId
    WHERE p.id = ?
  `);
  return statement.get(id);
};

export const updatePms = (id, pms) => {
  const statement = db2.prepare(`
    UPDATE pms_records
    SET machineId = ?, assignedTechnicianId = ?, startDate = ?, endDate = ?, status = ?, remarks = ?,
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    pms.machineId,
    pms.assignedTechnicianId || null,
    pms.startDate,
    pms.endDate || null,
    pms.status,
    pms.remarks || null,
    id,
  );
};

export const deletePms = (id) => {
  return db2.prepare(`DELETE FROM pms_records WHERE id = ?`).run(id);
};
