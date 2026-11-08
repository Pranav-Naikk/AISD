const r = require('express').Router();
const c = require('../controllers/offerController');
const { requireRole } = require('../middleware/auth');

r.get('/', c.list);
r.post('/', requireRole('ADMIN', 'COMPANY'), c.create);
r.patch('/:id/accept', c.accept);

module.exports = r;
