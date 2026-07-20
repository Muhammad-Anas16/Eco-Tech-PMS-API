import db2 from "../../config/db.js";

export const createJobRequestTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS job_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      machineId INTEGER NOT NULL,
      requestedByName TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'Open',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (machineId) REFERENCES machines(id)
    );
  `;

  db2.exec(query);

  console.log("✅ Job Requests table ready");
};

export const createJobRequest = (jobRequest) => {
  const statement = db2.prepare(`
    INSERT INTO job_requests (machineId, requestedByName, description, status)
    VALUES (?, ?, ?, ?)
  `);

  return statement.run(
    jobRequest.machineId,
    jobRequest.requestedByName,
    jobRequest.description || null,
    "Open",
  );
};

export const getJobRequests = () => {
  const statement = db2.prepare(`
    SELECT
      job_requests.id,
      job_requests.machineId,
      machines.machineName,
      job_requests.requestedByName,
      job_requests.description,
      job_requests.status,
      job_requests.createdAt,
      job_requests.updatedAt
    FROM job_requests
    LEFT JOIN machines ON machines.id = job_requests.machineId
    ORDER BY job_requests.id DESC
  `);

  return statement.all();
};

export const getJobRequestById = (id) => {
  const statement = db2.prepare(`
    SELECT
      job_requests.id,
      job_requests.machineId,
      machines.machineName,
      job_requests.requestedByName,
      job_requests.description,
      job_requests.status,
      job_requests.createdAt,
      job_requests.updatedAt
    FROM job_requests
    LEFT JOIN machines ON machines.id = job_requests.machineId
    WHERE job_requests.id = ?
  `);

  return statement.get(id);
};

export const updateJobRequest = (id, jobRequest) => {
  const statement = db2.prepare(`
    UPDATE job_requests
    SET
      machineId = ?,
      requestedByName = ?,
      description = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    jobRequest.machineId,
    jobRequest.requestedByName,
    jobRequest.description || null,
    id,
  );
};

export const updateJobRequestStatus = (id, status) => {
  const statement = db2.prepare(`
    UPDATE job_requests
    SET status = ?, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(status, id);
};

export const deleteJobRequest = (id) => {
  const statement = db2.prepare(`
    DELETE FROM job_requests WHERE id = ?
  `);

  return statement.run(id);
};
