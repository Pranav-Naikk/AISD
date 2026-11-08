const r = require('express').Router();
const c = require('../controllers/jobController');
const { requireRole } = require('../middleware/auth');

r.get('/', c.list);
r.get('/:id/eligibility', c.eligibility);
r.get('/:id', c.getOne);
r.post('/', requireRole('ADMIN', 'COMPANY'), c.create);
r.put('/:id', requireRole('ADMIN', 'COMPANY'), c.update);

module.exports = r;
