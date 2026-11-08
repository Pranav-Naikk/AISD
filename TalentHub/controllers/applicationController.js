const db = require('../config/db');
const { checkEligibility } = require('../services/eligibilityService');

const transitions = {
  APPLIED: ['SHORTLISTED', 'REJECTED'],
  SHORTLISTED: ['INTERVIEW_SCHEDULED', 'REJECTED'],
  INTERVIEW_SCHEDULED: ['INTERVIEWED', 'REJECTED'],
  INTERVIEWED: ['OFFERED', 'REJECTED'],
  OFFERED: ['ACCEPTED', 'REJECTED'],
  ACCEPTED: [],
  REJECTED: ['SHORTLISTED']
};

exports.list = async (req, res) => {
  let sql = `SELECT a.*, s.full_name, s.usn, s.branch, s.cgpa, s.active_backlogs,
                    j.role, j.season, j.min_cgpa, j.max_backlogs,
                    c.id AS company_id, c.name AS company_name,
                    o.id AS offer_id, o.package_lpa, o.accepted AS offer_accepted
             FROM applications a 
             JOIN students s ON s.id = a.student_id 
             JOIN job_listings j ON j.id = a.job_id 
             JOIN companies c ON c.id = j.company_id
             LEFT JOIN offers o ON o.application_id = a.id`;
  let args = [];

  if (req.session.user.role === 'STUDENT') {
    sql += ' WHERE a.student_id = ?';
    args = [req.session.user.studentId];
  } else if (req.session.user.role === 'COMPANY') {
    sql += ' WHERE c.id = ?';
    args = [req.session.user.companyId];
  }

  sql += ' ORDER BY a.applied_at DESC, a.id DESC';
  const [rows] = await db.query(sql, args);
  res.json(rows);
};

exports.create = async (req, res) => {
  const student_id = req.session.user.role === 'STUDENT' ? req.session.user.studentId : req.body.student_id;
  const { job_id } = req.body;
  if (!student_id || !job_id) {
    return res.status(400).json({ message: 'student_id and job_id are required.' });
  }

  const result = await checkEligibility(student_id, job_id);
  if (!result.eligible) {
    return res.status(400).json({ message: 'Student is not eligible.', reasons: result.reasons });
  }

  const [[existing]] = await db.query('SELECT id FROM applications WHERE student_id=? AND job_id=?', [student_id, job_id]);
  if (existing) {
    return res.status(409).json({ message: 'You have already applied to this job.' });
  }

  const [r] = await db.query('INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, "APPLIED")', [student_id, job_id]);
  res.status(201).json({ id: r.insertId, message: 'Application submitted successfully.' });
};

exports.updateStatus = async (req, res) => {
  const [[a]] = await db.query(
    `SELECT a.id, a.status, j.company_id 
     FROM applications a 
     JOIN job_listings j ON j.id = a.job_id 
     WHERE a.id = ?`,
    [req.params.id]
  );
  if (!a) return res.status(404).json({ message: 'Application not found.' });

  if (req.session.user.role === 'COMPANY' && a.company_id !== req.session.user.companyId) {
    return res.status(403).json({ message: 'Not authorised to modify another company applicant.' });
  }

  const allowed = transitions[a.status] || [];
  if (!allowed.includes(req.body.status) && req.session.user.role !== 'ADMIN') {
    return res.status(400).json({ message: `Cannot change ${a.status} directly to ${req.body.status}.` });
  }

  await db.query('UPDATE applications SET status=? WHERE id=?', [req.body.status, req.params.id]);
  res.json({ message: 'Status updated successfully.' });
};
