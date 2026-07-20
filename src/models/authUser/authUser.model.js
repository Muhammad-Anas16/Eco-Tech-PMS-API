import db2 from "../../config/db.js";

// Custom users table — role-based
export const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employeeId TEXT NOT NULL UNIQUE,
      fullName TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'worker',
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db2.exec(query);

  console.log("✅ Users table ready");
};

// Naya user create (password pehle se hashed aata hai controller se)
export const createUser = (user) => {
  const statement = db2.prepare(`
    INSERT INTO users (employeeId, fullName, password, role, isActive)
    VALUES (?, ?, ?, ?, ?)
  `);

  return statement.run(
    user.employeeId,
    user.fullName,
    user.password,
    user.role || "worker",
    user.isActive ?? 1,
  );
};

// Login ke liye — password hash sahit pura record chahiye
export const getUserByEmployeeId = (employeeId) => {
  const statement = db2.prepare(
    `SELECT * FROM users WHERE employeeId = ?`,
  );
  return statement.get(employeeId);
};

// Get-Me / listing ke liye — password kabhi wapas nahi bhejte
export const getUserById = (id) => {
  const statement = db2.prepare(`
    SELECT id, employeeId, fullName, role, isActive, createdAt, updatedAt
    FROM users WHERE id = ?
  `);
  return statement.get(id);
};

export const getUsers = () => {
  const statement = db2.prepare(`
    SELECT id, employeeId, fullName, role, isActive, createdAt, updatedAt
    FROM users ORDER BY id DESC
  `);
  return statement.all();
};

export const updateUser = (id, user) => {
  const statement = db2.prepare(`
    UPDATE users
    SET fullName = ?, role = ?, isActive = ?, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  return statement.run(user.fullName, user.role, user.isActive ?? 1, id);
};

export const deleteUser = (id) => {
  const statement = db2.prepare(`DELETE FROM users WHERE id = ?`);
  return statement.run(id);
};
