const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: 'D:/TalentHub/.env' });

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'talenthub'
  });

  console.log('Connected to DB');

  try {
    await conn.query('ALTER TABLE users DROP CHECK chk_user_role_link;');
    console.log('Dropped old chk_user_role_link');
  } catch(e) {
    console.log('Drop check notice:', e.message);
  }

  await conn.query("ALTER TABLE users MODIFY COLUMN role ENUM('STUDENT','ADMIN','COMPANY') NOT NULL;");
  console.log('Altered role ENUM');

  const [cols] = await conn.query('DESCRIBE users;');
  if (!cols.some(c => c.Field === 'company_id')) {
    await conn.query('ALTER TABLE users ADD COLUMN company_id INT NULL UNIQUE AFTER student_id;');
    await conn.query('ALTER TABLE users ADD CONSTRAINT fk_user_company FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE;');
    console.log('Added company_id and foreign key constraint');
  }

  try {
    await conn.query(`ALTER TABLE users ADD CONSTRAINT chk_user_role_link CHECK (
      (role='STUDENT' AND student_id IS NOT NULL AND company_id IS NULL) OR
      (role='ADMIN' AND student_id IS NULL AND company_id IS NULL) OR
      (role='COMPANY' AND company_id IS NOT NULL AND student_id IS NULL)
    );`);
    console.log('Re-added chk_user_role_link');
  } catch(e) {
    console.log('Add check notice:', e.message);
  }

  // Seed demo student users
  const defaultPwHash = await bcrypt.hash('password123', 10);

  const [students] = await conn.query('SELECT id, full_name, email FROM students LIMIT 5;');
  for (const s of students) {
    await conn.query(
      "INSERT INTO users (email, password_hash, role, student_id) VALUES (?, ?, 'STUDENT', ?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)",
      [s.email, defaultPwHash, s.id]
    );
  }
  console.log(`Seeded ${students.length} demo student accounts`);

  // Seed demo company users
  const [companies] = await conn.query('SELECT id, name FROM companies LIMIT 5;');
  for (const c of companies) {
    const compEmail = 'hr@' + c.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
    await conn.query(
      "INSERT INTO users (email, password_hash, role, company_id) VALUES (?, ?, 'COMPANY', ?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)",
      [compEmail, defaultPwHash, c.id]
    );
  }
  console.log(`Seeded ${companies.length} demo company accounts`);

  const [allUsers] = await conn.query('SELECT u.id, u.email, u.role, u.student_id, u.company_id, s.full_name student_name, c.name company_name FROM users u LEFT JOIN students s ON s.id=u.student_id LEFT JOIN companies c ON c.id=u.company_id;');
  console.log('All Users:', allUsers);

  await conn.end();
  console.log('Schema migration & seeding done!');
})();
