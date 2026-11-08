const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { usn, full_name, email, password, branch, cgpa, active_backlogs = 0, cleared_backlogs = 0 } = req.body;
  if (!usn || !full_name || !/^\S+@\S+\.\S+$/.test(email || '') || !password || password.length < 8 || !['CSE', 'ECE', 'ISE', 'MECH', 'CIVIL'].includes(branch) || +cgpa < 0 || +cgpa > 10) {
    return res.status(422).json({ message: 'Enter valid registration details. Password must have at least 8 characters.' });
  }

  const c = await db.getConnection();
  try {
    await c.beginTransaction();
    const [[found]] = await c.query('SELECT id FROM students WHERE usn=? OR email=?', [usn, email]);
    if (found) {
      await c.rollback();
      return res.status(409).json({ message: 'USN or email already exists.' });
    }
    const [student] = await c.query(
      'INSERT INTO students (usn, full_name, email, branch, cgpa, active_backlogs, cleared_backlogs) VALUES (?,?,?,?,?,?,?)',
      [usn, full_name, email, branch, cgpa, active_backlogs, cleared_backlogs]
    );
    const hash = await bcrypt.hash(password, 12);
    await c.query(
      "INSERT INTO users (email, password_hash, role, student_id) VALUES (?, ?, 'STUDENT', ?)",
      [email, hash, student.insertId]
    );
    await c.commit();
    req.session.user = { id: student.insertId, role: 'STUDENT', studentId: student.insertId, name: full_name, email };
    res.status(201).json({ message: 'Account created.', user: req.session.user });
  } catch (e) {
    await c.rollback();
    throw e;
  } finally {
    c.release();
  }
};

exports.login = async (req, res) => {
  const [[u]] = await db.query(
    `SELECT u.*, s.full_name AS student_name, c.name AS company_name
     FROM users u
     LEFT JOIN students s ON s.id = u.student_id
     LEFT JOIN companies c ON c.id = u.company_id
     WHERE u.email = ?`,
    [req.body.email]
  );

  if (!u || !(await bcrypt.compare(req.body.password || '', u.password_hash))) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  req.session.regenerate((err) => {
    if (err) throw err;
    let displayName = 'Administrator';
    if (u.role === 'STUDENT') displayName = u.student_name || 'Student';
    else if (u.role === 'COMPANY') displayName = u.company_name || 'Company Partner';

    req.session.user = {
      id: u.id,
      role: u.role,
      studentId: u.student_id,
      companyId: u.company_id,
      name: displayName,
      email: u.email
    };
    res.json({ message: 'Signed in.', user: req.session.user });
  });
};

exports.logout = (req, res) => req.session.destroy(() => res.clearCookie('connect.sid').json({ message: 'Signed out.' }));

exports.me = (req, res) => res.json({ user: req.session.user });
