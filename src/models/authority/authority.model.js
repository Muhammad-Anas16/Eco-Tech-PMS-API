import db2 from "../../config/db.js";

//  Create Authority Table
export const createAuthorityTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS authorities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      authorityName TEXT NOT NULL UNIQUE,
      description TEXT,
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db2.exec(query);

  console.log("✅ Authorities table ready");
};

//  Create Authority
export const createAuthority = (authority) => {
  const statement = db2.prepare(`
    INSERT INTO authorities (
      authorityName,
      description,
      isActive
    )
    VALUES (?, ?, ?)
  `);

  return statement.run(
    authority.authorityName,
    authority.description,
    authority.isActive ? 1 : 0,
  );
};

//  Get All Authorities
export const getAuthorities = () => {
  const statement = db2.prepare(`
    SELECT *
    FROM authorities
    ORDER BY id DESC
  `);

  return statement.all();
};

//  Get Authority By ID
export const getAuthorityById = (id) => {
  const statement = db2.prepare(`
    SELECT *
    FROM authorities
    WHERE id = ?
  `);

  return statement.get(id);
};

//  Update Authority
export const updateAuthority = (id, authority) => {
  const statement = db2.prepare(`
    UPDATE authorities
    SET
      authorityName = ?,
      description = ?,
      isActive = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  return statement.run(
    authority.authorityName,
    authority.description,
    authority.isActive ?? 1,
    id,
  );
};

//  Delete Authority
export const deleteAuthority = (id) => {
  const statement = db2.prepare(`
    DELETE FROM authorities
    WHERE id = ?
  `);

  return statement.run(id);
};
