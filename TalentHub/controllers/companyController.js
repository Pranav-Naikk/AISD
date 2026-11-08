const db = require('../config/db');
exports.list = async (req,res) => { const [rows] = await db.query('SELECT c.*, COUNT(j.id) job_count FROM companies c LEFT JOIN job_listings j ON j.company_id=c.id GROUP BY c.id ORDER BY c.name'); res.json(rows); };
exports.create = async (req,res) => { const [r] = await db.query('INSERT INTO companies (name) VALUES (?)', [req.body.name]); res.status(201).json({ id:r.insertId, message:'Company added.' }); };
exports.update = async (req,res) => { const [r] = await db.query('UPDATE companies SET name=? WHERE id=?',[req.body.name,req.params.id]); if(!r.affectedRows)return res.status(404).json({message:'Company not found.'});res.json({message:'Company updated.'}); };
exports.remove = async (req,res) => { const [r] = await db.query('DELETE FROM companies WHERE id=?',[req.params.id]);if(!r.affectedRows)return res.status(404).json({message:'Company not found.'});res.json({message:'Company deleted.'}); };
