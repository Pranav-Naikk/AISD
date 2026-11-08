const db = require('../config/db');

exports.list = async (req, res) => {
  let sql = `SELECT o.*, a.student_id, s.full_name, s.usn, j.role, c.id AS company_id, c.name AS company_name 
             FROM offers o 
             JOIN applications a ON a.id = o.application_id 
             JOIN students s ON s.id = a.student_id
             JOIN job_listings j ON j.id = a.job_id 
             JOIN companies c ON c.id = j.company_id`;
  let args = [];

  if (req.session.user.role === 'STUDENT') {
    sql += ' WHERE a.student_id = ?';
    args = [req.session.user.studentId];
  } else if (req.session.user.role === 'COMPANY') {
    sql += ' WHERE c.id = ?';
    args = [req.session.user.companyId];
  }

  sql += ' ORDER BY o.id DESC';
  const [rows] = await db.query(sql, args);
  res.json(rows);
};

exports.create = async (req, res) => {
  const { application_id, package_lpa, offer_letter_key } = req.body;
  const c = await db.getConnection();
  try {
    await c.beginTransaction();

    const [[app]] = await c.query(
      `SELECT a.*, j.company_id FROM applications a JOIN job_listings j ON j.id = a.job_id WHERE a.id = ?`,
      [application_id]
    );
    if (!app) {
      await c.rollback();
      return res.status(404).json({ message: 'Application not found.' });
    }

    if (req.session.user.role === 'COMPANY' && app.company_id !== req.session.user.companyId) {
      await c.rollback();
      return res.status(403).json({ message: 'Not authorised to issue offers for other company applications.' });
    }

    const key = offer_letter_key || `OFFER-${application_id}-${Date.now().toString().slice(-4)}`;
    const [r] = await c.query(
      'INSERT INTO offers (application_id, package_lpa, offer_letter_key) VALUES (?, ?, ?)',
      [application_id, package_lpa, key]
    );

    await c.query("UPDATE applications SET status='OFFERED' WHERE id=?", [application_id]);
    await c.commit();
    res.status(201).json({ id: r.insertId, message: 'Offer created and issued.' });
  } catch (e) {
    await c.rollback();
    throw e;
  } finally {
    c.release();
  }
};

exports.accept = async (req, res) => {
  const c = await db.getConnection();
  try {
    await c.beginTransaction();
    const [[offer]] = await c.query(
      'SELECT o.*, a.student_id FROM offers o JOIN applications a ON a.id=o.application_id WHERE o.id=?',
      [req.params.id]
    );
    if (!offer) {
      await c.rollback();
      return res.status(404).json({ message: 'Offer not found.' });
    }

    if (req.session.user.role === 'STUDENT' && offer.student_id !== req.session.user.studentId) {
      await c.rollback();
      return res.status(403).json({ message: 'You can only accept offers sent to you.' });
    }

    const [[student]] = await c.query('SELECT has_accepted_offer FROM students WHERE id=?', [offer.student_id]);
    if (student.has_accepted_offer) {
      await c.rollback();
      return res.status(400).json({ message: 'This student has already accepted an offer.' });
    }

    await c.query('UPDATE offers SET accepted=TRUE WHERE id=?', [offer.id]);
    await c.query('UPDATE students SET has_accepted_offer=TRUE WHERE id=?', [offer.student_id]);
    await c.query("UPDATE applications SET status='ACCEPTED' WHERE id=?", [offer.application_id]);

    await c.commit();
    res.json({ message: 'Offer accepted successfully! Congratulations!' });
  } catch (e) {
    await c.rollback();
    throw e;
  } finally {
    c.release();
  }
};
