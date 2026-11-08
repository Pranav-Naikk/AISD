# TalentHub — Campus Placement Management System

TalentHub is a full-stack campus recruitment and placement management portal built with **Node.js**, **Express**, **MySQL**, and a modern dark glassmorphic responsive frontend.

---

## 🌟 Key Features & 3 Dedicated Portals

1. 🎓 **Student Portal**:
   - Academic overview: USN, branch, CGPA, and backlogs tracking.
   - Live campus drives with automated server-side eligibility checks.
   - Application status pipeline (`APPLIED`, `SHORTLISTED`, `INTERVIEW_SCHEDULED`, etc.).
   - One-click offer letter acceptance.

2. 🏢 **Company Recruiter Portal**:
   - Post campus recruitment drives with specific CGPA, backlog, and branch criteria.
   - Candidate management pool across different recruitment stages.
   - Direct CTC compensation offer issuance to shortlisted students.

3. 🛡️ **Admin / Placement Officer Console**:
   - Central placement analytics and cohort placement rate calculation.
   - Student directory and registration.
   - Corporate hiring partner directory.
   - Full audit trail of campus drives and accepted offers.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, `express-session`, `bcrypt`, `mysql2`
- **Frontend**: Vanilla JavaScript (SPA), Tailwind CSS CDN, Modern Glassmorphism
- **Database**: MySQL 8.0 (Normalized schema with foreign key constraints)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MySQL Server 8.0+

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Abdul5700/TalentHub.git
cd TalentHub
npm install
```

### 3. Environment Setup
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Update `.env` with your local MySQL credentials:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=talenthub
SESSION_SECRET=your_secret_key
INITIAL_ADMIN_EMAIL=admin@talenthub.edu
INITIAL_ADMIN_PASSWORD=Admin@123456
```

### 4. Database Setup
Execute the database scripts in your MySQL client:
```sql
SOURCE database/schema.sql;
SOURCE database/sample-data.sql;
SOURCE database/migration-add-users.sql;
```

Run the schema migration for the company portal & demo accounts:
```bash
node database/migrate-company-portal.js
node database/seed-admin.js
```

### 5. Run the Server
```bash
npm start
# or for development mode:
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## 🔑 Demo Credentials

| Portal | Role | Email | Password |
|---|---|---|---|
| 🎓 **Student** | Student | `aarav@example.com` | `password123` |
| 🏢 **Company** | Corporate Partner | `hr@infosys.com` | `password123` |
| 🛡️ **Admin** | Placement Officer | `admin@talenthub.edu` | `Admin@123456` |
*(One-click demo buttons are available on the login screen).*

---

## 📄 License
MIT License.
