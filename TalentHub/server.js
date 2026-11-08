const path = require('path');
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(!process.env.SESSION_SECRET) console.warn('SESSION_SECRET is not set. Set it in .env before deployment.');
app.use(session({ secret: process.env.SESSION_SECRET || 'local-development-only-secret', resave: false, saveUninitialized: false, cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV==='production', maxAge: 1000*60*60*8 } }));
app.use(express.static(path.join(__dirname, 'public')));

const {requireAuth,requireRole}=require('./middleware/auth');
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', requireAuth, require('./routes/students'));
app.use('/api/companies', requireAuth, requireRole('ADMIN'), require('./routes/companies'));
app.use('/api/jobs', requireAuth, require('./routes/jobs'));
app.use('/api/applications', requireAuth, require('./routes/applications'));
app.use('/api/interviews', requireAuth, require('./routes/interviews'));
app.use('/api/offers', requireAuth, require('./routes/offers'));
app.use('/api/dashboard', requireAuth, require('./routes/dashboard'));
app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`TalentHub is running at http://localhost:${port}`));
