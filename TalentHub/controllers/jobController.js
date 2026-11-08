const db = require('../config/db');
const { checkEligibility } = require('../services/eligibilityService');

exports.list = async (req, res) => {
  const { search = '', openOnly = '', companyOnly = '' } = req.query;
  let sql = `SELECT j.*, c.name company_name, GROUP_CONCAT(jab.branch ORDER BY jab.branch) allowed_branches 
             FROM job_listings j 
             JOIN companies c ON c.id=j.company_id 
             LEFT JOIN job_allowed_branches jab ON jab.job_id=j.id 
             WHERE (j.role LIKE ? OR c.name LIKE ?)`;
  const args = [`%${search}%`, `%${search}%`];

  if (openOnly) {
    sql += ' AND j.is_open=1';
  }

  if (req.session.user.role === 'COMPANY' || companyOnly) {
    const compId = req.session.user.role === 'COMPANY' ? req.session.user.companyId : companyOnly;
    sql += ' AND j.company_id=?';
    args.push(compId);
  }

  sql += ' GROUP BY j.id ORDER BY j.drive_date DESC, j.id DESC';
  const [rows] = await db.query(sql, args);
  res.json(rows);
};

exports.getOne = async (req, res) => {
  const [[job]] = await db.query(
    'SELECT j.*, c.name company_name FROM job_listings j JOIN companies c ON c.id=j.company_id WHERE j.id=?',
    [req.params.id]
  );
  if (!job) return res.status(404).json({ message: 'Job not found.' });
  const [branches] = await db.query('SELECT branch FROM job_allowed_branches WHERE job_id=?', [job.id]);
  res.json({ ...job, allowed_branches: branches.map(x => x.branch) });
};

exports.create = async (req, res) => {
  const c = await db.getConnection();
  try {
    await c.beginTransaction();
    let company_id = req.body.company_id;
    if (req.session.user.role === 'COMPANY') {
      company_id = req.session.user.companyId;
    }
    const { role, season = '2026', min_cgpa = 0, max_backlogs = 0, drive_date, is_open = true, allowed_branches = [] } = req.body;
    const finalDriveDate = drive_date || new Date().toISOString().slice(0, 10);

    const [r] = await c.query(
      'INSERT INTO job_listings (company_id, role, season, min_cgpa, max_backlogs, drive_date, is_open) VALUES (?,?,?,?,?,?,?)',
      [company_id, role, season, min_cgpa, max_backlogs, finalDriveDate, is_open]
    );

    for (const b of allowed_branches) {
      if (b && b.trim()) {
        await c.query('INSERT INTO job_allowed_branches (job_id, branch) VALUES (?,?)', [r.insertId, b.trim()]);
      }
    }

    await c.commit();
    res.status(201).json({ id: r.insertId, message: 'Job created successfully.' });
  } catch (e) {
    await c.rollback();
    throw e;
  } finally {
    c.release();
  }
};

exports.update = async (req, res) => {
  const c = await db.getConnection();
  try {
    await c.beginTransaction();
    const [[existing]] = await c.query('SELECT * FROM job_listings WHERE id=?', [req.params.id]);
    if (!existing) {
      await c.rollback();
      return res.status(404).json({ message: 'Job not found.' });
    }
    if (req.session.user.role === 'COMPANY' && existing.company_id !== req.session.user.companyId) {
      await c.rollback();
      return res.status(403).json({ message: 'You can only update your own job listings.' });
    }

    let company_id = existing.company_id;
    if (req.session.user.role === 'ADMIN' && req.body.company_id) {
      company_id = req.body.company_id;
    }
    const {
      role = existing.role,
      season = existing.season,
      min_cgpa = existing.min_cgpa,
      max_backlogs = existing.max_backlogs,
      drive_date = existing.drive_date,
      is_open = existing.is_open,
      allowed_branches = []
    } = req.body;

    await c.query(
      'UPDATE job_listings SET company_id=?, role=?, season=?, min_cgpa=?, max_backlogs=?, drive_date=?, is_open=? WHERE id=?',
      [company_id, role, season, min_cgpa, max_backlogs, drive_date, is_open, req.params.id]
    );

    if (allowed_branches.length > 0) {
      await c.query('DELETE FROM job_allowed_branches WHERE job_id=?', [req.params.id]);
      for (const b of allowed_branches) {
        if (b && b.trim()) {
          await c.query('INSERT INTO job_allowed_branches (job_id, branch) VALUES (?,?)', [req.params.id, b.trim()]);
        }
      }
    }

    await c.commit();
    res.json({ message: 'Job updated successfully.' });
  } catch (e) {
    await c.rollback();
    throw e;
  } finally {
    c.release();
  }
};

exports.eligibility = async (req, res) => {
  res.json(await checkEligibility(req.query.student_id, req.params.id));
};
