const db = require('../config/db');
exports.list = async (req, res) => {
  const { search = '', branch = '' } = req.query;
  const [rows] = await db.query(`SELECT * FROM students WHERE (full_name LIKE ? OR usn LIKE ?) AND (? = '' OR branch = ?) ORDER BY full_name`, [`%${search}%`, `%${search}%`, branch, branch]);
  res.json(rows);
};
exports.getOne = async (req, res) => { const [[row]] = await db.query('SELECT * FROM students WHERE id = ?', [req.params.id]); if (!row) return res.status(404).json({ message: 'Student not found.' }); res.json(row); };
exports.create = async (req, res) => { const { usn, full_name, email, branch, cgpa, active_backlogs = 0, cleared_backlogs = 0 } = req.body; const [r] = await db.query('INSERT INTO students (usn,full_name,email,branch,cgpa,active_backlogs,cleared_backlogs) VALUES (?,?,?,?,?,?,?)', [usn,full_name,email,branch,cgpa,active_backlogs,cleared_backlogs]); res.status(201).json({ id: r.insertId, message: 'Student created.' }); };
exports.update = async (req, res) => { const { full_name, email, branch, cgpa, active_backlogs, cleared_backlogs } = req.body; const [r] = await db.query('UPDATE students SET full_name=?,email=?,branch=?,cgpa=?,active_backlogs=?,cleared_backlogs=? WHERE id=?', [full_name,email,branch,cgpa,active_backlogs,cleared_backlogs,req.params.id]); if (!r.affectedRows) return res.status(404).json({ message: 'Student not found.' }); res.json({ message: 'Student updated.' }); };
exports.history = async (req, res) => { const [rows] = await db.query(`SELECT a.*, j.role, c.name company_name FROM applications a JOIN job_listings j ON a.job_id=j.id JOIN companies c ON j.company_id=c.id WHERE a.student_id=? ORDER BY a.applied_at DESC`, [req.params.id]); res.json(rows); };
