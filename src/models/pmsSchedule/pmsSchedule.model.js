import db2 from "../../config/db.js";

export const createPmsScheduleTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS pms_schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      machineId INTEGER NOT NULL,
      machine2Id INTEGER,
      machine3Id INTEGER,
      machine4Id INTEGER,
      machine5Id INTEGER,
      plant TEXT,
      remarks TEXT,
      frequencyDays INTEGER DEFAULT 30,
      nextDueDate DATE,
      status TEXT DEFAULT 'Active',
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (machineId) REFERENCES machines(id)
    );
  `;

  db2.exec(query);

  console.log("✅ PMS Schedules table ready");
};

export const createPmsSchedule = (schedule) => {
  const statement = db2.prepare(`
    INSERT INTO pms_schedules (
      machineId, machine2Id, machine3Id, machine4Id, machine5Id,
      plant, remarks, frequencyDays, nextDueDate, status, isActive
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  return statement.run(
    schedule.machineId,
    schedule.machine2Id || null,
    schedule.machine3Id || null,
    schedule.machine4Id || null,
    schedule.machine5Id || null,
    schedule.plant || null,
    schedule.remarks || null,
    schedule.frequencyDays || 30,
    schedule.nextDueDate || null,
    schedule.status || "Active",
    schedule.isActive ?? 1,
  );
};

export const getPmsSchedules = () => {
  const statement = db2.prepare(`
    SELECT
      s.*,
      m1.machineName AS machineName,
      m2.machineName AS machine2Name,
      m3.machineName AS machine3Name,
      m4.machineName AS machine4Name,
      m5.machineName AS machine5Name
    FROM pms_schedules s
    LEFT JOIN machines m1 ON m1.id = s.machineId
    LEFT JOIN machines m2 ON m2.id = s.machine2Id
    LEFT JOIN machines m3 ON m3.id = s.machine3Id
    LEFT JOIN machines m4 ON m4.id = s.machine4Id
    LEFT JOIN machines m5 ON m5.id = s.machine5Id
    ORDER BY s.id DESC
  `);
  return statement.all();
};

export const getPmsScheduleById = (id) => {
  const statement = db2.prepare(`
    SELECT
      s.*,
      m1.machineName AS machineName,
      m2.machineName AS machine2Name,
      m3.machineName AS machine3Name,
      m4.machineName AS machine4Name,
      m5.machineName AS machine5Name
    FROM pms_schedules s
    LEFT JOIN machines m1 ON m1.id = s.machineId
    LEFT JOIN machines m2 ON m2.id = s.machine2Id
    LEFT JOIN machines m3 ON m3.id = s.machine3Id
    LEFT JOIN machines m4 ON m4.id = s.machine4Id
    LEFT JOIN machines m5 ON m5.id = s.machine5Id
    WHERE s.id = ?
  `);
  return statement.get(id);
};

export const updatePmsSchedule = (id, schedule) => {
  const statement = db2.prepare(`
    UPDATE pms_schedules
    SET
      machineId = ?, machine2Id = ?, machine3Id = ?, machine4Id = ?, machine5Id = ?,
      plant = ?, remarks = ?, frequencyDays = ?, nextDueDate = ?, status = ?, isActive = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    schedule.machineId,
    schedule.machine2Id || null,
    schedule.machine3Id || null,
    schedule.machine4Id || null,
    schedule.machine5Id || null,
    schedule.plant || null,
    schedule.remarks || null,
    schedule.frequencyDays || 30,
    schedule.nextDueDate || null,
    schedule.status || "Active",
    schedule.isActive ?? 1,
    id,
  );
};

export const deletePmsSchedule = (id) => {
  return db2.prepare(`DELETE FROM pms_schedules WHERE id = ?`).run(id);
};
