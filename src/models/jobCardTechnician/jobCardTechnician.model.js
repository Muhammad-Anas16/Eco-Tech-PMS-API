import db2 from "../../config/db.js";

//  Job Card <-> Technician many-to-many junction table
export const createJobCardTechnicianTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS job_card_technicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobCardId INTEGER NOT NULL,
      technicianId INTEGER NOT NULL,
      assignedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (jobCardId) REFERENCES job_cards(id)
    );
  `;

  db2.exec(query);

  console.log("✅ Job Card Technicians table ready");
};

// Technician assign karta hai kisi job card se
export const assignTechnician = (jobCardId, technicianId) => {
  const statement = db2.prepare(`
    INSERT INTO job_card_technicians (jobCardId, technicianId)
    VALUES (?, ?)
  `);

  return statement.run(jobCardId, technicianId);
};

// Ek job card ke sab assigned technicians (sirf IDs — naam controller me general.db se)
export const getTechniciansByJobCard = (jobCardId) => {
  const statement = db2.prepare(`
    SELECT * FROM job_card_technicians WHERE jobCardId = ?
  `);

  return statement.all(jobCardId);
};

// Ek assignment remove karna
export const removeTechnicianAssignment = (id) => {
  return db2.prepare(`DELETE FROM job_card_technicians WHERE id = ?`).run(id);
};
