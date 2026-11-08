const r = require('express').Router();
const db = require('../config/db');

r.get('/', async (req, res) => {
  const user = req.session.user;

  if (user.role === 'ADMIN') {
    const [[counts]] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM students) students,
        (SELECT COUNT(*) FROM companies) companies,
        (SELECT COUNT(*) FROM job_listings) jobs,
        (SELECT COUNT(*) FROM job_listings WHERE is_open=1) open_jobs,
        (SELECT COUNT(*) FROM applications) applications,
        (SELECT COUNT(*) FROM offers) offers,
        (SELECT COUNT(*) FROM offers WHERE accepted=1) accepted_offers
    `);
    return res.json(counts);
  }

  if (user.role === 'COMPANY') {
    const companyId = user.companyId;
    const [[stats]] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM job_listings WHERE company_id=?) AS my_jobs,
        (SELECT COUNT(*) FROM job_listings WHERE company_id=? AND is_open=1) AS my_open_jobs,
        (SELECT COUNT(*) FROM applications a JOIN job_listings j ON j.id=a.job_id WHERE j.company_id=?) AS total_applicants,
        (SELECT COUNT(*) FROM applications a JOIN job_listings j ON j.id=a.job_id WHERE j.company_id=? AND a.status='SHORTLISTED') AS shortlisted,
        (SELECT COUNT(*) FROM offers o JOIN applications a ON a.id=o.application_id JOIN job_listings j ON j.id=a.job_id WHERE j.company_id=?) AS offers_issued,
        (SELECT COUNT(*) FROM offers o JOIN applications a ON a.id=o.application_id JOIN job_listings j ON j.id=a.job_id WHERE j.company_id=? AND o.accepted=1) AS accepted_offers
    `, [companyId, companyId, companyId, companyId, companyId, companyId]);
    return res.json(stats);
  }

  if (user.role === 'STUDENT') {
    const studentId = user.studentId;
    const [[stats]] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM applications WHERE student_id=?) AS applied,
        (SELECT COUNT(*) FROM applications WHERE student_id=? AND status='SHORTLISTED') AS shortlisted,
        (SELECT COUNT(*) FROM offers o JOIN applications a ON a.id=o.application_id WHERE a.student_id=?) AS offers,
        (SELECT COUNT(*) FROM offers o JOIN applications a ON a.id=o.application_id WHERE a.student_id=? AND o.accepted=1) AS accepted
    `, [studentId, studentId, studentId, studentId]);
    return res.json(stats);
  }

  res.status(403).json({ message: 'Unknown role' });
});

module.exports = r;
