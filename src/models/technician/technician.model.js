import generalDb from "../../config/generalDb.js";

//  Create Technicians Table
export const createTechnicianTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS technicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      techCode TEXT NOT NULL UNIQUE,
      techName TEXT NOT NULL,
      techDesignation TEXT,
      cellNo TEXT,
      employeeCode TEXT,
      plantName TEXT,
      type TEXT,
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  generalDb.exec(query);

  console.log("✅ Technicians table ready");
};

//  Create Technician
export const createTechnician = (tech) => {
  const statement = generalDb.prepare(`
    INSERT INTO technicians (
      techCode,
      techName,
      techDesignation,
      cellNo,
      employeeCode,
      plantName,
      type,
      isActive
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  return statement.run(
    tech.techCode,
    tech.techName,
    tech.techDesignation,
    tech.cellNo,
    tech.employeeCode,
    tech.plantName,
    tech.type,
    tech.isActive ?? 1,
  );
};

//  Get All Technicians
export const getTechnicians = () => {
  const statement = generalDb.prepare(`
    SELECT *
    FROM technicians
    ORDER BY id DESC
  `);

  return statement.all();
};

//  Get Technician By ID
export const getTechnicianById = (id) => {
  const statement = generalDb.prepare(`
    SELECT *
    FROM technicians
    WHERE id = ?
  `);

  return statement.get(id);
};

//  Update Technician
export const updateTechnician = (id, tech) => {
  const statement = generalDb.prepare(`
    UPDATE technicians
    SET
      techCode = ?,
      techName = ?,
      techDesignation = ?,
      cellNo = ?,
      employeeCode = ?,
      plantName = ?,
      type = ?,
      isActive = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    tech.techCode,
    tech.techName,
    tech.techDesignation,
    tech.cellNo,
    tech.employeeCode,
    tech.plantName,
    tech.type,
    tech.isActive ?? 1,
    id,
  );
};

//  Delete Technician
export const deleteTechnician = (id) => {
  const statement = generalDb.prepare(`
    DELETE FROM technicians
    WHERE id = ?
  `);

  return statement.run(id);
};
