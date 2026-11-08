const r = require('express').Router();
const c = require('../controllers/applicationController');
const { requireRole } = require('../middleware/auth');

r.get('/', c.list);
r.post('/', c.create);
r.patch('/:id/status', requireRole('ADMIN', 'COMPANY'), c.updateStatus);

module.exports = r;
