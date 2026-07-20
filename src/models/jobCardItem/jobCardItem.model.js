import db2 from "../../config/db.js";

//  Job Card me use hone wale Inventory items (parts consumed)
export const createJobCardItemTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS job_card_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobCardId INTEGER NOT NULL,
      itemCode TEXT NOT NULL,
      itemName TEXT NOT NULL,
      quantityIssued INTEGER NOT NULL,
      rate REAL DEFAULT 0,
      amount REAL DEFAULT 0,
      department TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (jobCardId) REFERENCES job_cards(id)
    );
  `;

  db2.exec(query);

  console.log("✅ Job Card Items table ready");
};

// Item issue karta hai — amount khud calculate hota hai (qty * rate)
export const addJobCardItem = (item) => {
  const amount = (item.quantityIssued || 0) * (item.rate || 0);

  const statement = db2.prepare(`
    INSERT INTO job_card_items (
      jobCardId, itemCode, itemName, quantityIssued, rate, amount, department
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  return statement.run(
    item.jobCardId,
    item.itemCode,
    item.itemName,
    item.quantityIssued,
    item.rate || 0,
    amount,
    item.department || null,
  );
};

// Ek job card ke sab issued items
export const getItemsByJobCard = (jobCardId) => {
  const statement = db2.prepare(`
    SELECT * FROM job_card_items WHERE jobCardId = ? ORDER BY id DESC
  `);

  return statement.all(jobCardId);
};

// Item entry delete (stock wapas add karna controller me hoga)
export const deleteJobCardItem = (id) => {
  return db2.prepare(`DELETE FROM job_card_items WHERE id = ?`).run(id);
};

export const getJobCardItemById = (id) => {
  return db2.prepare(`SELECT * FROM job_card_items WHERE id = ?`).get(id);
};
