import generalDb from "../../config/generalDb.js";

//  Create Operators Table
export const createOperatorTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS operators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      operatorCode TEXT NOT NULL UNIQUE,
      operatorName TEXT NOT NULL,
      plantName TEXT,
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  generalDb.exec(query);

  console.log("✅ Operators table ready");
};

//  Create Operator
export const createOperator = (operator) => {
  const statement = generalDb.prepare(`
    INSERT INTO operators (
      operatorCode,
      operatorName,
      plantName,
      isActive
    )
    VALUES (?, ?, ?, ?)
  `);

  return statement.run(
    operator.operatorCode,
    operator.operatorName,
    operator.plantName,
    operator.isActive ?? 1,
  );
};

//  Get All Operators
export const getOperators = () => {
  const statement = generalDb.prepare(`
    SELECT *
    FROM operators
    ORDER BY id DESC
  `);

  return statement.all();
};

//  Get Operator By ID
export const getOperatorById = (id) => {
  const statement = generalDb.prepare(`
    SELECT *
    FROM operators
    WHERE id = ?
  `);

  return statement.get(id);
};

//  Update Operator
export const updateOperator = (id, operator) => {
  const statement = generalDb.prepare(`
    UPDATE operators
    SET
      operatorCode = ?,
      operatorName = ?,
      plantName = ?,
      isActive = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    operator.operatorCode,
    operator.operatorName,
    operator.plantName,
    operator.isActive ?? 1,
    id,
  );
};

//  Delete Operator
export const deleteOperator = (id) => {
  const statement = generalDb.prepare(`
    DELETE FROM operators
    WHERE id = ?
  `);

  return statement.run(id);
};
