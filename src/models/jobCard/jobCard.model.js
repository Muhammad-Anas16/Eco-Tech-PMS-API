import db2 from "../../config/db.js";

//  Job Cards table — poora schema ek hi baar bana rahe hain,
//  fields Day 9-10 me use hongi lekin structure abhi complete kar dete hain
export const createJobCardTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS job_cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobCardNo TEXT UNIQUE,
      machineId INTEGER NOT NULL,
      faultId INTEGER,
      operatorId INTEGER,
      jobType TEXT NOT NULL,
      intimationTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      startTime DATETIME,
      endTime DATETIME,
      duration TEXT,
      machineStop INTEGER DEFAULT 0,
      subLocation TEXT,
      plant TEXT,
      remarks TEXT,
      expenseType TEXT,
      status TEXT DEFAULT 'In-Progress',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (machineId) REFERENCES machines(id),
      FOREIGN KEY (faultId) REFERENCES faults(id)
    );
  `;

  db2.exec(query);

  console.log("✅ Job Cards table ready");
};

// Naya job card create karta hai — jobCardNo insert ke baad auto-generate hota hai
export const createJobCard = (jobCard) => {
  const insertStatement = db2.prepare(`
    INSERT INTO job_cards (
      machineId, faultId, operatorId, jobType, intimationTime, remarks, status
    )
    VALUES (?, ?, ?, ?, ?, ?, 'In-Progress')
  `);

  const result = insertStatement.run(
    jobCard.machineId,
    jobCard.faultId || null,
    jobCard.operatorId || null,
    jobCard.jobType,
    jobCard.intimationTime || new Date().toISOString(),
    jobCard.remarks || null,
  );

  // Insert hote hi id mil gayi — usi se readable jobCardNo banate hain: JC-0001
  const jobCardNo = `JC-${String(result.lastInsertRowid).padStart(4, "0")}`;

  db2
    .prepare(`UPDATE job_cards SET jobCardNo = ? WHERE id = ?`)
    .run(jobCardNo, result.lastInsertRowid);

  return { id: result.lastInsertRowid, jobCardNo };
};

// Sab job cards — machine aur fault ka naam JOIN karke sath laate hain
// (operator ka naam alag se controller me general.db se laayenge)
export const getJobCards = () => {
  const statement = db2.prepare(`
    SELECT
      job_cards.*,
      machines.machineName,
      faults.faultName
    FROM job_cards
    LEFT JOIN machines ON machines.id = job_cards.machineId
    LEFT JOIN faults ON faults.id = job_cards.faultId
    ORDER BY job_cards.id DESC
  `);

  return statement.all();
};

// ID se ek job card
export const getJobCardById = (id) => {
  const statement = db2.prepare(`
    SELECT
      job_cards.*,
      machines.machineName,
      faults.faultName
    FROM job_cards
    LEFT JOIN machines ON machines.id = job_cards.machineId
    LEFT JOIN faults ON faults.id = job_cards.faultId
    WHERE job_cards.id = ?
  `);

  return statement.get(id);
};

// Delete
export const deleteJobCard = (id) => {
  return db2.prepare(`DELETE FROM job_cards WHERE id = ?`).run(id);
};

// ... (Day 8 wale functions upar rahenge, ye neeche add karo)

// Timing + extra details update karta hai, aur duration khud calculate karta hai
export const updateJobCardTiming = (id, data) => {
  let duration = null;

  if (data.startTime && data.endTime) {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    const diffMs = end - start;

    if (diffMs > 0) {
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      duration = `${hours}h ${minutes}m`;
    }
  }

  const statement = db2.prepare(`
    UPDATE job_cards
    SET
      startTime = ?,
      endTime = ?,
      duration = ?,
      machineStop = ?,
      subLocation = ?,
      plant = ?,
      remarks = ?,
      expenseType = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    data.startTime || null,
    data.endTime || null,
    duration,
    data.machineStop ? 1 : 0,
    data.subLocation || null,
    data.plant || null,
    data.remarks || null,
    data.expenseType || null,
    id,
  );
};

// Sirf status change karne ke liye
export const updateJobCardStatus = (id, status) => {
  return db2
    .prepare(
      `
    UPDATE job_cards SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?
  `,
    )
    .run(status, id);
};
