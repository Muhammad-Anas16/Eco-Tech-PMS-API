import db2 from "../../config/db.js";

//  Create Machine Locations Table
export const createMachineLocationTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS machine_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      machineId INTEGER NOT NULL,
      locationCode TEXT,
      locationName TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (machineId) REFERENCES machines(id)
    );
  `;

  db2.exec(query);

  console.log("✅ Machine Locations table ready");
};

//  Create Machine Location
export const createMachineLocation = (location) => {
  const statement = db2.prepare(`
    INSERT INTO machine_locations (
      machineId,
      locationCode,
      locationName
    )
    VALUES (?, ?, ?)
  `);

  return statement.run(
    location.machineId,
    location.locationCode,
    location.locationName,
  );
};

//  Get All Machine Locations (machine name joined in)
export const getMachineLocations = () => {
  const statement = db2.prepare(`
    SELECT
      machine_locations.id,
      machine_locations.machineId,
      machines.machineName,
      machine_locations.locationCode,
      machine_locations.locationName,
      machine_locations.createdAt,
      machine_locations.updatedAt
    FROM machine_locations
    LEFT JOIN machines ON machines.id = machine_locations.machineId
    ORDER BY machine_locations.id DESC
  `);

  return statement.all();
};

//  Get Machine Location By ID
export const getMachineLocationById = (id) => {
  const statement = db2.prepare(`
    SELECT
      machine_locations.id,
      machine_locations.machineId,
      machines.machineName,
      machine_locations.locationCode,
      machine_locations.locationName,
      machine_locations.createdAt,
      machine_locations.updatedAt
    FROM machine_locations
    LEFT JOIN machines ON machines.id = machine_locations.machineId
    WHERE machine_locations.id = ?
  `);

  return statement.get(id);
};

//  Get Locations By Machine ID
export const getLocationsByMachineId = (machineId) => {
  const statement = db2.prepare(`
    SELECT *
    FROM machine_locations
    WHERE machineId = ?
    ORDER BY id DESC
  `);

  return statement.all(machineId);
};

//  Update Machine Location
export const updateMachineLocation = (id, location) => {
  const statement = db2.prepare(`
    UPDATE machine_locations
    SET
      machineId = ?,
      locationCode = ?,
      locationName = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    location.machineId,
    location.locationCode,
    location.locationName,
    id,
  );
};

//  Delete Machine Location
export const deleteMachineLocation = (id) => {
  const statement = db2.prepare(`
    DELETE FROM machine_locations
    WHERE id = ?
  `);

  return statement.run(id);
};
