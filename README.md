# AISD — AI Assisted Software Development

A consolidated repository of production-ready, full-stack educational and enterprise software systems developed under the **AI Assisted Software Development (AISD)** curriculum.

This monorepo contains two primary applications:
1. **[FinPay](finpay-app/)**: Student Digital Wallet, Merchant Payment, Automated Cashback & Monthly Audit Reconciliation System.
2. **[TalentHub](TalentHub/)**: Comprehensive Campus Placement Management System with 3 Dedicated Portals (Student, Company Recruiter, Placement Officer/Admin).

---

## 📁 Repository Structure

```
AISD/
├── finpay-app/                         # FinPay Student Wallet & Payment System
│   ├── backend/                        # Node.js + Express + Prisma ORM Backend
│   │   ├── prisma/                     # Schema definition & demo database seeder
│   │   ├── src/                        # 4-Layer Modular Monolith (Router/Service/Repo/Model)
│   │   ├── .env.example                # Backend configuration template
│   │   ├── package.json
│   │   └── test-flow.js                # End-to-end automated API test flow
│   ├── frontend/                       # React (Vite) + Tailwind CSS Frontend
│   │   ├── src/                        # Components, AuthContext, Layouts, Pages
│   │   ├── package.json
│   │   └── vite.config.js
│   └── README.md                       # FinPay dedicated documentation
│
├── TalentHub/                          # TalentHub Campus Placement Portal
│   ├── config/                         # MySQL connection pool configuration
│   ├── controllers/                    # Express controller handlers
│   ├── database/                       # SQL schemas, seed data & migration scripts
│   ├── middleware/                     # Session authentication & role guards
│   ├── public/                         # Glassmorphic SPA Frontend (HTML5/CSS3/Vanilla JS)
│   ├── routes/                         # Express API and portal route handlers
│   ├── services/                       # Business logic services
│   ├── .env.example                    # Application configuration template
│   ├── package.json
│   ├── server.js                       # Express HTTP server entrypoint
│   └── README.md                       # TalentHub dedicated documentation
│
├── .gitignore                          # Monorepo-level git ignore rules
└── README.md                           # Main repository documentation
```

---

## 1. 💳 FinPay — Student Wallet & Payment System

FinPay is an academic full-stack platform designed to handle campus micro-transactions, digital wallets, automatic cashback incentives, and monthly financial reconciliation.

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Axios, React Router v6
- **Backend**: Node.js, Express.js (Modular Monolith, 4-Layer Architecture)
- **Database & ORM**: MySQL 8.0, Prisma ORM
- **Security**: JWT (JSON Web Tokens), bcrypt password hashing

### Key Functional Requirements
- **FR1 — Wallet Management**: Auto-provisioned wallet upon registration, balance inquiries, live transaction history, wallet top-up.
- **FR2 — Merchant Payments**: Browse verified campus merchants, atomic balance debit transactions inside MySQL ACID blocks.
- **FR3 — Automated Cashback**: Instant rule-based cashback computation credited back to the student's wallet immediately upon payment.
- **FR4 — Merchant Administration**: Admin dashboard to manage merchants, commission tiers, and categories.
- **FR5 — Financial Audit & Reconciliation**: Monthly audit reports, discrepancy detection, and CSV export.
- **FR6 — Role-Based Security**: Strict JWT authentication for `STUDENT` and `ADMIN` roles.

### Demo Credentials
| Role | Email | Password | Details |
|---|---|---|---|
| **Admin** | `admin@finpay.edu` | `admin123` | Full admin privileges & reconciliation audit |
| **Student** | `aarav@student.edu` | `student123` | Demo Student (`STU-2024-001`) with preloaded wallet |
| **Students** | `diya@student.edu`, `rohan@student.edu` | `student123` | Additional student test accounts |

*(One-click **Academic Demo Quick-Fill** buttons are provided on the login page).*

### Quick Start (FinPay)
1. **Create MySQL Database**:
   ```sql
   CREATE DATABASE finpay_db;
   ```
2. **Backend Setup**:
   ```bash
   cd finpay-app/backend
   cp .env.example .env      # Configure your DB credentials
   npm install
   npx prisma db push        # Sync schema to MySQL
   npm run seed              # Seed demo accounts and merchants
   npm start                 # Runs at http://localhost:5000
   ```
3. **Frontend Setup**:
   ```bash
   cd finpay-app/frontend
   npm install
   npm run dev               # Runs at http://localhost:5173
   ```

---

## 2. 🎓 TalentHub — Campus Placement Management System

TalentHub is a full-stack campus placement and recruitment portal connecting students, corporate recruiters, and college placement officers.

### Tech Stack
- **Backend**: Node.js, Express.js, `mysql2`, `express-session`, `bcrypt`, `express-validator`
- **Frontend**: Single Page Application (SPA), Modern Dark Glassmorphic Design, Tailwind CSS CDN
- **Database**: MySQL 8.0 (Normalized relational schema with foreign key integrity)

### 3 Dedicated Portals
1. 🎓 **Student Portal**:
   - Academic profile tracking (USN, CGPA, Branch, Backlogs).
   - Live campus placement drives with automated server-side eligibility checks.
   - Status pipeline (`APPLIED`, `SHORTLISTED`, `INTERVIEW_SCHEDULED`, `OFFERED`, `PLACED`).
   - One-click offer letter acceptance.
2. 🏢 **Company Recruiter Portal**:
   - Drive creation with custom eligibility criteria (CGPA cutoff, allowed branches, max backlogs).
   - Candidate management across hiring funnel stages.
   - Direct CTC compensation offer issuance to qualified candidates.
3. 🛡️ **Placement Officer / Admin Console**:
   - Central placement analytics and cohort placement percentage calculations.
   - Student & corporate recruiter directory management.
   - Comprehensive audit log of all drives, interviews, and accepted offers.

### Demo Credentials
| Portal | Role | Email | Password |
|---|---|---|---|
| 🎓 **Student** | Student | `aarav@example.com` | `password123` |
| 🏢 **Company** | Corporate Partner | `hr@infosys.com` | `password123` |
| 🛡️ **Admin** | Placement Officer | `admin@talenthub.edu` | `Admin@123456` |

### Quick Start (TalentHub)
1. **Create MySQL Database & Import Schema**:
   ```bash
   cd TalentHub
   cp .env.example .env      # Configure your DB credentials
   ```
   Execute the SQL setup scripts in MySQL:
   ```sql
   SOURCE database/schema.sql;
   SOURCE database/sample-data.sql;
   SOURCE database/migration-add-users.sql;
   ```
2. **Install & Run Migrations**:
   ```bash
   npm install
   node database/migrate-company-portal.js
   node database/seed-admin.js
   ```
3. **Start the Application**:
   ```bash
   npm start
   # Or for development with live reload:
   npm run dev
   ```
   Open **http://localhost:3000** in your browser.

---

## 🛠️ Global Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MySQL Server**: v8.0 or higher (or MariaDB 10.5+)
- **Git**

---

## 🚀 Verification & Automated Tests

- **FinPay Backend Test Flow**:
  ```bash
  cd finpay-app/backend
  node test-flow.js
  ```
  Tests admin login, student login, wallet debit with automatic cashback crediting, and monthly reconciliation report generation.

- **FinPay Frontend Production Build**:
  ```bash
  cd finpay-app/frontend
  npm run build
  ```
  Compiles and bundles the production assets using Vite.

---

## 📄 License & Attribution

Developed as part of the **AI Assisted Software Development (AISD)** curriculum.
Open-source under the MIT License.
