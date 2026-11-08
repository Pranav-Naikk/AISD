/* =============================================================
   TalentHub Placement Management System — Modern SPA
   3 Distinct Portals:
     1. Student Portal
     2. Admin / Placement Officer Portal
     3. Company Portal
   ============================================================= */

// ─── State ────────────────────────────────────────────────────
let user = null;
let currentPage = 'dashboard';
let activePortalTab = 'STUDENT'; // login portal switcher tab

// ─── Icons (Lucide-style SVGs) ────────────────────────────────
const icon = {
  graduationCap: `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  building:      `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  shield:        `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  barChart:      `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
  briefcase:     `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  fileText:      `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  award:         `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  users:         `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  user:          `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  logIn:         `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>`,
  logOut:        `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  plus:          `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
  check:         `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  sparkles:      `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
};

// ─── Toast System ─────────────────────────────────────────────
function toast(msg, ok = true) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast ${ok ? 'toast-ok' : 'toast-err'}`;
  el.innerHTML = `
    <span class="w-4 h-4 flex-shrink-0">${ok ? icon.check : icon.shield}</span>
    <span>${esc(msg)}</span>
  `;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = 'all 0.2s ease';
    setTimeout(() => el.remove(), 250);
  }, 3500);
}

// ─── API Helper ───────────────────────────────────────────────
const api = {
  async req(method, path, body) {
    const opts = { method, headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const r = await fetch('/api' + path, opts);
    const json = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(json.message || (json.reasons ? json.reasons.join(', ') : r.statusText));
    return json;
  },
  get:   (p)       => api.req('GET', p),
  post:  (p, b)    => api.req('POST', p, b),
  put:   (p, b)    => api.req('PUT', p, b),
  patch: (p, b)    => api.req('PATCH', p, b),
  del:   (p)       => api.req('DELETE', p),
};

// ─── Status Badge Component ───────────────────────────────────
function statusBadge(status) {
  if (!status) return '';
  const map = {
    APPLIED:             { cls: 'bg-slate-800 text-slate-300 border-slate-700', dot: 'bg-slate-400' },
    SHORTLISTED:         { cls: 'bg-amber-950/60 text-amber-300 border-amber-800/80', dot: 'bg-amber-400' },
    INTERVIEW_SCHEDULED: { cls: 'bg-sky-950/60 text-sky-300 border-sky-800/80', dot: 'bg-sky-400' },
    INTERVIEWED:         { cls: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/80', dot: 'bg-indigo-400' },
    OFFERED:             { cls: 'bg-emerald-950/70 text-emerald-300 border-emerald-700', dot: 'bg-emerald-400' },
    ACCEPTED:            { cls: 'bg-emerald-900 text-emerald-200 border-emerald-500 font-semibold', dot: 'bg-emerald-300' },
    REJECTED:            { cls: 'bg-rose-950/70 text-rose-300 border-rose-800/80', dot: 'bg-rose-400' },
    OPEN:                { cls: 'bg-emerald-950/50 text-emerald-300 border-emerald-800/70', dot: 'bg-emerald-400' },
    CLOSED:              { cls: 'bg-slate-900 text-slate-400 border-slate-800', dot: 'bg-slate-500' }
  };

  const item = map[status] || { cls: 'bg-slate-800 text-slate-300 border-slate-700', dot: 'bg-slate-400' };
  const label = status.replaceAll('_', ' ');
  return `
    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border ${item.cls}">
      <span class="w-1.5 h-1.5 rounded-full ${item.dot}"></span>
      ${label}
    </span>
  `;
}

// ─── Boot Lifecycle ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const stored = sessionStorage.getItem('th_user');
  if (stored) {
    try {
      user = JSON.parse(stored);
    } catch (_) {}
  }
  render();
});

// ─── Main Render Dispatcher ───────────────────────────────────
function render() {
  const root = document.getElementById('root');
  if (!user) {
    root.innerHTML = renderAuthScreen();
    attachAuthHandlers();
    return;
  }
  root.innerHTML = renderAppShell();
  loadCurrentView();
}

// ─── AUTH SCREEN (3 Portal Selection & Login) ─────────────────
const DEMO_PRESETS = {
  STUDENT: [
    { label: 'Aarav Sharma (CSE, 8.9 CGPA)', email: 'aarav@example.com', pw: 'password123' },
    { label: 'Diya Nair (ECE, 9.1 CGPA)', email: 'diya@example.com', pw: 'password123' },
    { label: 'Kabir Singh (ISE, 7.8 CGPA)', email: 'kabir@example.com', pw: 'password123' }
  ],
  COMPANY: [
    { label: 'Infosys HR', email: 'hr@infosys.com', pw: 'password123' },
    { label: 'TCS Talent Acquisition', email: 'hr@tcs.com', pw: 'password123' },
    { label: 'Accenture Campus Hiring', email: 'hr@accenture.com', pw: 'password123' }
  ],
  ADMIN: [
    { label: 'Placement Officer (Admin)', email: 'admin@talenthub.edu', pw: 'Admin@123456' }
  ]
};

function renderAuthScreen() {
  const presets = DEMO_PRESETS[activePortalTab] || [];
  const portalMeta = {
    STUDENT: {
      title: 'Student Portal',
      desc: 'Browse verified campus opportunities, track drive statuses & accept placement offers',
      icon: icon.graduationCap,
      badge: 'Student Access',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    COMPANY: {
      title: 'Company Portal',
      desc: 'Publish placement drives, review applicants, evaluate talent & extend offers',
      icon: icon.building,
      badge: 'Corporate Partner',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    ADMIN: {
      title: 'Admin / Placement Office',
      desc: 'Centralized college placement management, statistics, company onboarding & student records',
      icon: icon.shield,
      badge: 'Officer Console',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    }
  }[activePortalTab];

  return `
    <div class="min-h-screen bg-slate-950 bg-mesh flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-xl space-y-6 fade-in">
        
        <!-- Brand Header -->
        <div class="text-center space-y-2">
          <div class="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            <span class="w-3.5 h-3.5">${icon.sparkles}</span> Next-Gen Placement Platform
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-300 tracking-tight">
            TalentHub
          </h1>
          <p class="text-slate-400 text-sm max-w-md mx-auto">
            Comprehensive college placement ecosystem connecting students, corporate recruiters, and placement coordinators.
          </p>
        </div>

        <!-- 3 Portal Selector Tabs -->
        <div class="grid grid-cols-3 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl gap-1.5 shadow-2xl">
          <button onclick="switchPortalTab('STUDENT')" 
            class="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activePortalTab === 'STUDENT'
                ? 'bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }">
            <span class="w-4 h-4">${icon.graduationCap}</span>
            <span>Student</span>
          </button>

          <button onclick="switchPortalTab('COMPANY')" 
            class="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activePortalTab === 'COMPANY'
                ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }">
            <span class="w-4 h-4">${icon.building}</span>
            <span>Company</span>
          </button>

          <button onclick="switchPortalTab('ADMIN')" 
            class="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activePortalTab === 'ADMIN'
                ? 'bg-gradient-to-b from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }">
            <span class="w-4 h-4">${icon.shield}</span>
            <span>Admin</span>
          </button>
        </div>

        <!-- Login Card -->
        <div class="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 glow-indigo">
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${portalMeta.badgeColor} mb-2">
                ${portalMeta.badge}
              </span>
              <h2 class="text-xl font-bold text-white">${portalMeta.title}</h2>
              <p class="text-xs text-slate-400 mt-1">${portalMeta.desc}</p>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 p-2.5 text-indigo-400 flex items-center justify-center flex-shrink-0">
              ${portalMeta.icon}
            </div>
          </div>

          <form id="auth-form" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
              <input id="auth-email" type="email" required placeholder="name@domain.com"
                class="inp w-full" value="${presets[0] ? presets[0].email : ''}" />
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
              <input id="auth-password" type="password" required placeholder="••••••••"
                class="inp w-full" value="${presets[0] ? presets[0].pw : ''}" />
            </div>

            <div id="auth-error" class="hidden p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs"></div>

            <button type="submit" id="auth-submit-btn"
              class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] transition-all duration-150 shadow-lg shadow-indigo-600/30">
              <span class="w-4 h-4">${icon.logIn}</span>
              <span id="auth-btn-label">Sign In to ${portalMeta.title}</span>
            </button>
          </form>

          <!-- Fast One-Click Demo Logins -->
          <div class="pt-4 border-t border-slate-800/80">
            <div class="flex items-center justify-between mb-2.5">
              <span class="text-xs font-medium text-slate-400">Quick Test Accounts</span>
              <span class="text-[11px] text-slate-500">Click to fill</span>
            </div>
            <div class="flex flex-col gap-2">
              ${presets.map(p => `
                <button type="button" onclick="fillAuthCredentials('${p.email}','${p.pw}')"
                  class="flex items-center justify-between text-left px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 text-xs text-slate-300 transition-all group">
                  <span class="font-medium group-hover:text-indigo-300">${p.label}</span>
                  <span class="text-slate-500 font-mono text-[11px]">${p.email}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <p class="text-center text-xs text-slate-500">
          Powered by Express & MySQL &bull; Normalized 7-table schema &bull; Role-based access control
        </p>

      </div>
    </div>
  `;
}

function switchPortalTab(tab) {
  activePortalTab = tab;
  render();
}

function fillAuthCredentials(email, pw) {
  const emailInput = document.getElementById('auth-email');
  const pwInput = document.getElementById('auth-password');
  if (emailInput && pwInput) {
    emailInput.value = email;
    pwInput.value = pw;
  }
}

function attachAuthHandlers() {
  const form = document.getElementById('auth-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('auth-submit-btn');
    const label = document.getElementById('auth-btn-label');
    const errEl = document.getElementById('auth-error');
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;

    errEl.classList.add('hidden');
    btn.disabled = true;
    label.textContent = 'Verifying credentials...';

    try {
      const data = await api.post('/auth/login', { email, password });
      user = data.user;
      sessionStorage.setItem('th_user', JSON.stringify(user));
      currentPage = 'dashboard';
      toast(`Welcome back, ${user.name}!`);
      render();
    } catch (err) {
      errEl.textContent = err.message || 'Login failed. Please check credentials.';
      errEl.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      label.textContent = `Sign In`;
    }
  });
}

// ─── PORTAL NAVIGATION STRUCTURE ──────────────────────────────
function getNavigationItems() {
  if (user.role === 'STUDENT') {
    return [
      { id: 'dashboard',    label: 'Overview',        icon: icon.barChart },
      { id: 'jobs',         label: 'Eligible Drives', icon: icon.briefcase },
      { id: 'applications', label: 'My Applications', icon: icon.fileText },
      { id: 'offers',       label: 'Job Offers',      icon: icon.award },
    ];
  }

  if (user.role === 'COMPANY') {
    return [
      { id: 'dashboard',    label: 'Recruitment Hub', icon: icon.barChart },
      { id: 'jobs',         label: 'Our Job Postings',icon: icon.briefcase },
      { id: 'applications', label: 'Candidates Pool', icon: icon.users },
      { id: 'offers',       label: 'Extended Offers', icon: icon.award },
    ];
  }

  // ADMIN
  return [
    { id: 'dashboard',    label: 'Coordinator Desk',icon: icon.barChart },
    { id: 'students',     label: 'Student Directory',icon: icon.users },
    { id: 'companies',    label: 'Partner Companies',icon: icon.building },
    { id: 'jobs',         label: 'Campus Drives',    icon: icon.briefcase },
    { id: 'applications', label: 'All Applications', icon: icon.fileText },
    { id: 'offers',       label: 'Placement Offers', icon: icon.award },
  ];
}

function getPortalMeta() {
  if (user.role === 'STUDENT') {
    return { name: 'Student Portal', badge: 'Candidate', color: 'indigo' };
  }
  if (user.role === 'COMPANY') {
    return { name: 'Company Recruiter Portal', badge: 'Corporate Partner', color: 'emerald' };
  }
  return { name: 'Officer Control Center', badge: 'Coordinator', color: 'purple' };
}

// ─── APP SHELL ────────────────────────────────────────────────
function renderAppShell() {
  const navItems = getNavigationItems();
  const meta = getPortalMeta();

  return `
    <div class="min-h-screen flex bg-slate-950 text-slate-100">
      
      <!-- Fixed Left Sidebar -->
      <aside class="w-64 bg-slate-900/90 border-r border-slate-800/80 flex flex-col fixed inset-y-0 z-30">
        
        <!-- Portal Brand Header -->
        <div class="p-5 border-b border-slate-800/80">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white p-2 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              ${icon.graduationCap}
            </div>
            <div class="min-w-0">
              <div class="font-bold text-base text-white leading-tight flex items-center gap-1.5">
                TalentHub
                <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div class="text-[11px] font-medium text-slate-400 truncate">${meta.name}</div>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 p-3 space-y-1.5 overflow-y-auto">
          <div class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Navigation</div>
          ${navItems.map(item => `
            <button onclick="navigateView('${item.id}')" id="nav-btn-${item.id}"
              class="nav-tab w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }">
              <span class="w-4 h-4 flex-shrink-0">${item.icon}</span>
              <span class="truncate">${item.label}</span>
            </button>
          `).join('')}
        </nav>

        <!-- User Profile Card in Sidebar Footer -->
        <div class="p-3 border-t border-slate-800/80">
          <div class="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 p-2 text-indigo-400 flex items-center justify-center flex-shrink-0">
              ${icon.user}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-white truncate">${esc(user.name)}</div>
              <div class="text-[11px] text-slate-400 truncate">${esc(user.email)}</div>
            </div>
            <button onclick="handleSignOut()" title="Sign Out"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors flex-shrink-0">
              <span class="w-4 h-4">${icon.logOut}</span>
            </button>
          </div>
        </div>

      </aside>

      <!-- Main Portal Workspace -->
      <main class="ml-64 flex-1 flex flex-col min-h-screen">
        
        <!-- Top Sticky Action Bar -->
        <header class="h-16 px-8 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Portal Mode:</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              user.role === 'STUDENT' ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700' :
              user.role === 'COMPANY' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' :
              'bg-purple-950/80 text-purple-300 border-purple-700'
            }">${user.role}</span>
          </div>

          <div class="flex items-center gap-3 text-xs text-slate-400">
            <span>Academic Year: <strong class="text-slate-200">2026</strong></span>
            <span>&bull;</span>
            <button onclick="handleSignOut()" class="hover:text-rose-400 transition-colors">Sign Out</button>
          </div>
        </header>

        <!-- View Body Content -->
        <div class="p-8 max-w-6xl w-full mx-auto flex-1 fade-in" id="portal-view-content">
          <div class="py-16 text-center text-slate-500">Loading view components...</div>
        </div>

      </main>

    </div>
  `;
}

function navigateView(viewId) {
  currentPage = viewId;
  document.querySelectorAll('.nav-tab').forEach(b => {
    const isThis = b.id === `nav-btn-${viewId}`;
    b.className = `nav-tab w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
      isThis
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
    }`;
  });
  loadCurrentView();
}

function handleSignOut() {
  api.post('/auth/logout').catch(() => {});
  sessionStorage.removeItem('th_user');
  user = null;
  toast('Signed out successfully.');
  render();
}

// ─── VIEW DISPATCHER ──────────────────────────────────────────
function loadCurrentView() {
  const container = document.getElementById('portal-view-content');
  if (!container) return;

  container.innerHTML = `<div class="py-16 text-center text-slate-500">Loading details...</div>`;

  if (user.role === 'STUDENT') {
    if (currentPage === 'dashboard')    return renderStudentDashboard(container);
    if (currentPage === 'jobs')         return renderStudentJobs(container);
    if (currentPage === 'applications') return renderStudentApplications(container);
    if (currentPage === 'offers')       return renderStudentOffers(container);
  }

  if (user.role === 'COMPANY') {
    if (currentPage === 'dashboard')    return renderCompanyDashboard(container);
    if (currentPage === 'jobs')         return renderCompanyJobs(container);
    if (currentPage === 'applications') return renderCompanyApplications(container);
    if (currentPage === 'offers')       return renderCompanyOffers(container);
  }

  if (user.role === 'ADMIN') {
    if (currentPage === 'dashboard')    return renderAdminDashboard(container);
    if (currentPage === 'students')     return renderAdminStudents(container);
    if (currentPage === 'companies')    return renderAdminCompanies(container);
    if (currentPage === 'jobs')         return renderAdminJobs(container);
    if (currentPage === 'applications') return renderAdminApplications(container);
    if (currentPage === 'offers')       return renderAdminOffers(container);
  }

  container.innerHTML = `<div class="text-slate-400 py-12 text-center">Section not found.</div>`;
}

// ═════════════════════════════════════════════════════════════
// 1. STUDENT PORTAL VIEWS
// ═════════════════════════════════════════════════════════════
async function renderStudentDashboard(el) {
  try {
    const [student, stats, apps] = await Promise.all([
      api.get(`/students/${user.studentId}`),
      api.get('/dashboard'),
      api.get('/applications')
    ]);

    el.innerHTML = `
      <div class="space-y-6">
        
        <!-- Welcome banner -->
        <div class="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-1">Student Candidate Portal</div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Welcome back, ${esc(student.full_name)}!</h1>
              <p class="text-sm text-slate-400 mt-1">Review eligibility criteria, submit job applications, and accept company offers.</p>
            </div>
            <div class="flex items-center gap-3">
              <button onclick="navigateView('jobs')" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all">
                Browse Campus Drives &rarr;
              </button>
            </div>
          </div>
        </div>

        <!-- Academic Snapshot Card -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="glass-panel rounded-2xl p-4 text-center">
            <div class="text-xs text-slate-400 font-medium">College USN</div>
            <div class="text-lg font-bold text-slate-200 mt-1 font-mono">${esc(student.usn)}</div>
          </div>
          <div class="glass-panel rounded-2xl p-4 text-center">
            <div class="text-xs text-slate-400 font-medium">Branch</div>
            <div class="text-lg font-bold text-indigo-400 mt-1">${esc(student.branch)}</div>
          </div>
          <div class="glass-panel rounded-2xl p-4 text-center">
            <div class="text-xs text-slate-400 font-medium">CGPA</div>
            <div class="text-lg font-bold text-emerald-400 mt-1">${student.cgpa}</div>
          </div>
          <div class="glass-panel rounded-2xl p-4 text-center">
            <div class="text-xs text-slate-400 font-medium">Active Backlogs</div>
            <div class="text-lg font-bold ${student.active_backlogs > 0 ? 'text-rose-400' : 'text-slate-200'} mt-1">${student.active_backlogs}</div>
          </div>
        </div>

        <!-- Metric Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-indigo-500">
            <div class="text-2xl font-black text-white">${stats.applied || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Drives Applied</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-amber-500">
            <div class="text-2xl font-black text-amber-300">${stats.shortlisted || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Shortlisted</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-emerald-500">
            <div class="text-2xl font-black text-emerald-300">${stats.offers || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Offers Extended</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-purple-500">
            <div class="text-2xl font-black text-purple-300">${student.has_accepted_offer ? 'Accepted' : 'In Progress'}</div>
            <div class="text-xs text-slate-400 mt-1">Final Status</div>
          </div>
        </div>

        <!-- Recent Applications Table -->
        <div class="glass-panel rounded-3xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-base text-white">Recent Applications</h3>
            <button onclick="navigateView('applications')" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View All &rarr;</button>
          </div>
          ${apps.length === 0 ? `<p class="text-sm text-slate-400 py-4 text-center">No active applications yet.</p>` : `
            <div class="overflow-x-auto">
              <table class="w-full text-xs sm:text-sm">
                <thead>
                  <tr class="text-left text-slate-500 border-b border-slate-800 text-xs uppercase tracking-wider">
                    <th class="pb-3">Company</th>
                    <th class="pb-3">Role</th>
                    <th class="pb-3">Applied On</th>
                    <th class="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  ${apps.slice(0, 5).map(a => `
                    <tr>
                      <td class="py-3 font-semibold text-white">${esc(a.company_name)}</td>
                      <td class="py-3 text-slate-300">${esc(a.role)}</td>
                      <td class="py-3 text-slate-400">${new Date(a.applied_at).toLocaleDateString()}</td>
                      <td class="py-3">${statusBadge(a.status)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderStudentJobs(el) {
  try {
    const [jobs, myApps] = await Promise.all([
      api.get('/jobs?openOnly=1'),
      api.get('/applications')
    ]);
    const appliedJobIds = new Set(myApps.map(a => a.job_id));

    el.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-white">Active Campus Placement Drives</h2>
          <p class="text-xs text-slate-400 mt-1">Review criteria and submit applications. Eligibility rules are verified server-side.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${jobs.length === 0 ? `<div class="col-span-2 text-center text-slate-400 py-12 glass-panel rounded-3xl">No drives currently open.</div>` : jobs.map(j => {
            const hasApplied = appliedJobIds.has(j.id);
            return `
              <div class="glass-panel rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">${esc(j.company_name)}</span>
                      <h3 class="text-lg font-bold text-white mt-0.5">${esc(j.role)}</h3>
                    </div>
                    ${statusBadge(j.is_open ? 'OPEN' : 'CLOSED')}
                  </div>

                  <div class="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center text-xs">
                    <div>
                      <span class="text-slate-400 block text-[10px] uppercase">Min CGPA</span>
                      <span class="font-bold text-slate-200">${j.min_cgpa}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 block text-[10px] uppercase">Max Backlogs</span>
                      <span class="font-bold text-slate-200">${j.max_backlogs}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 block text-[10px] uppercase">Season</span>
                      <span class="font-bold text-slate-200">${esc(j.season)}</span>
                    </div>
                  </div>

                  <div class="mt-3 text-xs text-slate-400">
                    <span class="font-medium text-slate-300">Branches:</span> ${j.allowed_branches ? esc(j.allowed_branches) : 'All Branches'}
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div class="text-xs text-slate-400">
                    Drive: <strong class="text-slate-200">${j.drive_date ? j.drive_date.slice(0, 10) : 'TBD'}</strong>
                  </div>
                  ${hasApplied 
                    ? `<span class="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-700">Already Applied</span>`
                    : `<button onclick="handleStudentApply(${j.id})"
                        class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all">
                        Apply Now
                      </button>`
                  }
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function handleStudentApply(jobId) {
  try {
    const elig = await api.get(`/jobs/${jobId}/eligibility?student_id=${user.studentId}`);
    if (!elig.eligible) {
      toast(elig.reasons && elig.reasons.length ? elig.reasons.join(' ') : 'You do not meet the drive eligibility rules.', false);
      return;
    }
    await api.post('/applications', { student_id: user.studentId, job_id: jobId });
    toast('Application submitted successfully!');
    renderStudentJobs(document.getElementById('portal-view-content'));
  } catch (err) {
    toast(err.message, false);
  }
}

async function renderStudentApplications(el) {
  try {
    const apps = await api.get('/applications');
    el.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-white">My Submitted Applications</h2>
          <p class="text-xs text-slate-400 mt-1">Track the recruitment progression across companies.</p>
        </div>

        <div class="glass-panel rounded-3xl p-6">
          ${apps.length === 0 ? `<p class="text-sm text-slate-400 py-8 text-center">No applications recorded yet.</p>` : `
            <div class="overflow-x-auto">
              <table class="w-full text-xs sm:text-sm">
                <thead>
                  <tr class="text-left text-slate-500 border-b border-slate-800 text-xs uppercase tracking-wider">
                    <th class="pb-3">Company</th>
                    <th class="pb-3">Role</th>
                    <th class="pb-3">Applied At</th>
                    <th class="pb-3">Status</th>
                    <th class="pb-3">Offer Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  ${apps.map(a => `
                    <tr>
                      <td class="py-3 font-semibold text-white">${esc(a.company_name)}</td>
                      <td class="py-3 text-slate-300">${esc(a.role)}</td>
                      <td class="py-3 text-slate-400">${new Date(a.applied_at).toLocaleDateString()}</td>
                      <td class="py-3">${statusBadge(a.status)}</td>
                      <td class="py-3">
                        ${a.package_lpa 
                          ? `<span class="text-emerald-400 font-bold">₹${a.package_lpa} LPA</span> ${a.offer_accepted ? '<span class="text-[10px] text-emerald-300 uppercase ml-1">(Accepted)</span>' : ''}`
                          : '<span class="text-slate-600">—</span>'
                        }
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderStudentOffers(el) {
  try {
    const offers = await api.get('/offers');
    el.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-white">Placement Offers Extended to You</h2>
          <p class="text-xs text-slate-400 mt-1">Review official compensation packages and accept your placement.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${offers.length === 0 ? `<div class="col-span-2 text-center text-slate-400 py-12 glass-panel rounded-3xl">No job offers received yet.</div>` : offers.map(o => `
            <div class="glass-panel rounded-3xl p-6 space-y-4 border ${o.accepted ? 'border-emerald-600/40' : 'border-slate-800'}">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-xs uppercase font-bold text-indigo-400">${esc(o.company_name)}</span>
                  <h3 class="text-xl font-bold text-white mt-1">${esc(o.role)}</h3>
                </div>
                ${statusBadge(o.accepted ? 'ACCEPTED' : 'OFFERED')}
              </div>

              <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div class="text-[10px] uppercase tracking-wider text-slate-400">Offered CTC Package</div>
                  <div class="text-2xl font-black text-emerald-400">₹${o.package_lpa} <span class="text-sm font-normal text-slate-400">LPA</span></div>
                </div>
                <div class="text-right text-xs text-slate-400">
                  Ref: <span class="font-mono text-slate-300">${esc(o.offer_letter_key)}</span>
                </div>
              </div>

              <div class="pt-2 flex justify-end">
                ${o.accepted 
                  ? `<div class="text-xs font-semibold text-emerald-400 flex items-center gap-1.5"><span class="w-4 h-4">${icon.check}</span> Offer Confirmed & Accepted</div>`
                  : `<button onclick="handleAcceptOffer(${o.id})"
                      class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all">
                      Accept Offer Letter
                    </button>`
                }
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function handleAcceptOffer(offerId) {
  try {
    await api.patch(`/offers/${offerId}/accept`, {});
    toast('Offer accepted successfully! Placement record updated.');
    renderStudentOffers(document.getElementById('portal-view-content'));
  } catch (err) {
    toast(err.message, false);
  }
}

// ═════════════════════════════════════════════════════════════
// 2. COMPANY PORTAL VIEWS
// ═════════════════════════════════════════════════════════════
async function renderCompanyDashboard(el) {
  try {
    const [stats, myJobs, myApps] = await Promise.all([
      api.get('/dashboard'),
      api.get('/jobs'),
      api.get('/applications')
    ]);

    el.innerHTML = `
      <div class="space-y-6">
        
        <!-- Welcome Hero -->
        <div class="glass-panel rounded-3xl p-6 sm:p-8 relative">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Recruitment Partner Portal</div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white">${esc(user.name)} Hiring Hub</h1>
              <p class="text-sm text-slate-400 mt-1">Manage campus postings, screen applicants, schedule rounds, and extend job offers.</p>
            </div>
            <button onclick="showPostJobModal()" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5">
              <span class="w-4 h-4">${icon.plus}</span> Post New Drive
            </button>
          </div>
        </div>

        <!-- Metrics Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-emerald-500">
            <div class="text-3xl font-black text-white">${stats.my_jobs || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Total Postings</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-indigo-500">
            <div class="text-3xl font-black text-indigo-300">${stats.total_applicants || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Total Applicants</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-amber-500">
            <div class="text-3xl font-black text-amber-300">${stats.shortlisted || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Shortlisted</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-purple-500">
            <div class="text-3xl font-black text-purple-300">${stats.offers_issued || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Offers Extended</div>
          </div>
        </div>

        <!-- Recent Candidates -->
        <div class="glass-panel rounded-3xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-base text-white">Recent Applicants</h3>
            <button onclick="navigateView('applications')" class="text-xs text-emerald-400 hover:text-emerald-300 font-medium">View Candidate Pool &rarr;</button>
          </div>
          ${myApps.length === 0 ? `<p class="text-sm text-slate-400 py-6 text-center">No applicants yet for your job drives.</p>` : `
            <div class="overflow-x-auto">
              <table class="w-full text-xs sm:text-sm">
                <thead>
                  <tr class="text-left text-slate-500 border-b border-slate-800 text-xs uppercase tracking-wider">
                    <th class="pb-3">Candidate</th>
                    <th class="pb-3">Branch</th>
                    <th class="pb-3">CGPA</th>
                    <th class="pb-3">Role</th>
                    <th class="pb-3">Status</th>
                    <th class="pb-3">Quick Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  ${myApps.slice(0, 6).map(a => `
                    <tr>
                      <td class="py-3 font-semibold text-white">${esc(a.full_name)} <span class="text-slate-500 font-mono text-xs block">${esc(a.usn)}</span></td>
                      <td class="py-3 text-slate-300">${esc(a.branch)}</td>
                      <td class="py-3 text-slate-200 font-semibold">${a.cgpa}</td>
                      <td class="py-3 text-slate-300">${esc(a.role)}</td>
                      <td class="py-3">${statusBadge(a.status)}</td>
                      <td class="py-3">
                        <button onclick="showCandidateStatusModal(${a.id}, '${a.status}', '${esc(a.full_name)}')"
                          class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors">
                          Manage
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderCompanyJobs(el) {
  try {
    const jobs = await api.get('/jobs');
    el.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">Your Campus Postings</h2>
            <p class="text-xs text-slate-400 mt-1">Placement drives posted under ${esc(user.name)}.</p>
          </div>
          <button onclick="showPostJobModal()" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5">
            <span class="w-4 h-4">${icon.plus}</span> Create New Listing
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${jobs.length === 0 ? `<div class="col-span-2 text-center text-slate-400 py-12 glass-panel rounded-3xl">No drives posted yet. Click above to post.</div>` : jobs.map(j => `
            <div class="glass-panel rounded-3xl p-6 space-y-4">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-bold text-white">${esc(j.role)}</h3>
                  <div class="text-xs text-slate-400 mt-0.5">${esc(j.season)} Season &bull; Drive: ${j.drive_date ? j.drive_date.slice(0, 10) : 'TBD'}</div>
                </div>
                ${statusBadge(j.is_open ? 'OPEN' : 'CLOSED')}
              </div>

              <div class="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                <div>Min CGPA: <strong class="text-white">${j.min_cgpa}</strong></div>
                <div>Max Backlogs: <strong class="text-white">${j.max_backlogs}</strong></div>
                <div class="col-span-2 text-[11px] text-slate-400">
                  Branches: ${j.allowed_branches ? esc(j.allowed_branches) : 'All Branches'}
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                <button onclick="showEditJobModal(${j.id})" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors">
                  Edit Drive
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderCompanyApplications(el) {
  try {
    const apps = await api.get('/applications');
    el.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-white">Candidates Pool</h2>
          <p class="text-xs text-slate-400 mt-1">Review student applications, update candidate stages & extend offers.</p>
        </div>

        <div class="glass-panel rounded-3xl p-6">
          ${apps.length === 0 ? `<p class="text-sm text-slate-400 py-8 text-center">No student applications recorded.</p>` : `
            <div class="overflow-x-auto">
              <table class="w-full text-xs sm:text-sm">
                <thead>
                  <tr class="text-left text-slate-500 border-b border-slate-800 text-xs uppercase tracking-wider">
                    <th class="pb-3">Candidate</th>
                    <th class="pb-3">Branch</th>
                    <th class="pb-3">CGPA / Backlogs</th>
                    <th class="pb-3">Job Role</th>
                    <th class="pb-3">Stage</th>
                    <th class="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  ${apps.map(a => `
                    <tr>
                      <td class="py-3 font-semibold text-white">${esc(a.full_name)} <span class="text-slate-500 font-mono text-xs block">${esc(a.usn)}</span></td>
                      <td class="py-3 text-slate-300">${esc(a.branch)}</td>
                      <td class="py-3 text-slate-300 font-medium">${a.cgpa} <span class="text-xs text-slate-500">(${a.active_backlogs} bl)</span></td>
                      <td class="py-3 text-slate-300 font-semibold">${esc(a.role)}</td>
                      <td class="py-3">${statusBadge(a.status)}</td>
                      <td class="py-3 text-right space-x-2">
                        <button onclick="showCandidateStatusModal(${a.id}, '${a.status}', '${esc(a.full_name)}')"
                          class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors">
                          Stage
                        </button>
                        ${['SHORTLISTED', 'INTERVIEW_SCHEDULED', 'INTERVIEWED'].includes(a.status) ? `
                          <button onclick="showCreateOfferModal(${a.id}, '${esc(a.full_name)}', '${esc(a.role)}')"
                            class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-medium transition-colors">
                            Issue Offer
                          </button>
                        ` : ''}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderCompanyOffers(el) {
  try {
    const offers = await api.get('/offers');
    el.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-white">Extended Offers</h2>
          <p class="text-xs text-slate-400 mt-1">Official offers extended by ${esc(user.name)}.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${offers.length === 0 ? `<div class="col-span-2 text-center text-slate-400 py-12 glass-panel rounded-3xl">No offers issued yet.</div>` : offers.map(o => `
            <div class="glass-panel rounded-3xl p-6 space-y-3">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-bold text-white">${esc(o.full_name)}</h3>
                  <div class="text-xs text-slate-400 font-mono">${esc(o.usn)} &bull; ${esc(o.role)}</div>
                </div>
                ${statusBadge(o.accepted ? 'ACCEPTED' : 'OFFERED')}
              </div>
              <div class="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span class="text-xs text-slate-400">Compensation</span>
                <span class="text-xl font-black text-emerald-400">₹${o.package_lpa} LPA</span>
              </div>
              <div class="text-[11px] text-slate-500 font-mono">Letter Key: ${esc(o.offer_letter_key)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

// ═════════════════════════════════════════════════════════════
// 3. ADMIN / PLACEMENT OFFICER PORTAL VIEWS
// ═════════════════════════════════════════════════════════════
async function renderAdminDashboard(el) {
  try {
    const stats = await api.get('/dashboard');
    el.innerHTML = `
      <div class="space-y-6">
        
        <!-- Welcome Card -->
        <div class="glass-panel rounded-3xl p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">Placement Coordinator Console</div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Central Placement Analytics</h1>
              <p class="text-sm text-slate-400 mt-1">Overview of institute placement statistics, company drives, student counts & offers.</p>
            </div>
            <div class="flex gap-2">
              <button onclick="navigateView('students')" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors">
                Students
              </button>
              <button onclick="navigateView('companies')" class="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg shadow-purple-600/30 transition-all">
                Companies
              </button>
            </div>
          </div>
        </div>

        <!-- 7-Metric Dashboard Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-indigo-500">
            <div class="text-3xl font-black text-white">${stats.students || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Registered Students</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-emerald-500">
            <div class="text-3xl font-black text-emerald-300">${stats.companies || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Partner Companies</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-amber-500">
            <div class="text-3xl font-black text-amber-300">${stats.jobs || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Total Drives (${stats.open_jobs || 0} Open)</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-purple-500">
            <div class="text-3xl font-black text-purple-300">${stats.applications || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Applications Processed</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-sky-500">
            <div class="text-3xl font-black text-sky-300">${stats.offers || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Offers Extended</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border-l-4 border-l-teal-500">
            <div class="text-3xl font-black text-teal-300">${stats.accepted_offers || 0}</div>
            <div class="text-xs text-slate-400 mt-1">Accepted Placements</div>
          </div>
          <div class="glass-panel rounded-2xl p-5 col-span-2 border-l-4 border-l-pink-500">
            <div class="text-3xl font-black text-pink-300">
              ${stats.students ? Math.round(((stats.accepted_offers || 0) / stats.students) * 100) : 0}%
            </div>
            <div class="text-xs text-slate-400 mt-1">Cohort Placement Rate</div>
          </div>
        </div>

      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderAdminStudents(el) {
  try {
    const students = await api.get('/students');
    el.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">Student Directory</h2>
            <p class="text-xs text-slate-400 mt-1">Official database of student academics and placement statuses.</p>
          </div>
          <button onclick="showAddStudentModal()" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5">
            <span class="w-4 h-4">${icon.plus}</span> Register Student
          </button>
        </div>

        <div class="glass-panel rounded-3xl p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm">
              <thead>
                <tr class="text-left text-slate-500 border-b border-slate-800 text-xs uppercase tracking-wider">
                  <th class="pb-3">USN</th>
                  <th class="pb-3">Student Name</th>
                  <th class="pb-3">Branch</th>
                  <th class="pb-3">CGPA</th>
                  <th class="pb-3">Active Backlogs</th>
                  <th class="pb-3">Placement</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                ${students.map(s => `
                  <tr>
                    <td class="py-3 font-mono font-semibold text-slate-300">${esc(s.usn)}</td>
                    <td class="py-3 font-semibold text-white">${esc(s.full_name)} <span class="text-slate-500 block text-xs">${esc(s.email)}</span></td>
                    <td class="py-3 text-indigo-400 font-medium">${esc(s.branch)}</td>
                    <td class="py-3 font-semibold text-emerald-400">${s.cgpa}</td>
                    <td class="py-3 text-slate-300">${s.active_backlogs}</td>
                    <td class="py-3">${s.has_accepted_offer ? statusBadge('ACCEPTED') : '<span class="text-slate-500 text-xs">—</span>'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderAdminCompanies(el) {
  try {
    const companies = await api.get('/companies');
    el.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">Partner Companies</h2>
            <p class="text-xs text-slate-400 mt-1">Manage recruiting partners registered for campus drives.</p>
          </div>
          <button onclick="showCompanyModal()" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5">
            <span class="w-4 h-4">${icon.plus}</span> Add Partner Company
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${companies.map(c => `
            <div class="glass-panel rounded-3xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div class="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-2 text-indigo-400 flex items-center justify-center mb-3">
                  ${icon.building}
                </div>
                <h3 class="text-base font-bold text-white">${esc(c.name)}</h3>
                <div class="text-xs text-slate-400 mt-1">${c.job_count || 0} Campus Drives</div>
              </div>
              <div class="flex justify-end pt-2 border-t border-slate-800">
                <button onclick="showCompanyModal(${c.id}, '${esc(c.name)}')" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderAdminJobs(el) {
  try {
    const [jobs, companies] = await Promise.all([
      api.get('/jobs'),
      api.get('/companies')
    ]);

    el.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">All Campus Placement Drives</h2>
            <p class="text-xs text-slate-400 mt-1">Cross-company listings, criteria settings and drive dates.</p>
          </div>
          <button onclick="showPostJobModal(${JSON.stringify(companies).replace(/"/g, '&quot;')})"
            class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5">
            <span class="w-4 h-4">${icon.plus}</span> Post Drive
          </button>
        </div>

        <div class="glass-panel rounded-3xl p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm">
              <thead>
                <tr class="text-left text-slate-500 border-b border-slate-800 text-xs uppercase tracking-wider">
                  <th class="pb-3">Company</th>
                  <th class="pb-3">Role</th>
                  <th class="pb-3">Eligibility (CGPA / Backlogs)</th>
                  <th class="pb-3">Branches</th>
                  <th class="pb-3">Drive Date</th>
                  <th class="pb-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                ${jobs.map(j => `
                  <tr>
                    <td class="py-3 font-semibold text-white">${esc(j.company_name)}</td>
                    <td class="py-3 text-slate-300">${esc(j.role)}</td>
                    <td class="py-3 text-slate-300">${j.min_cgpa}+ CGPA &bull; max ${j.max_backlogs} bl</td>
                    <td class="py-3 text-slate-400">${j.allowed_branches ? esc(j.allowed_branches) : 'All Branches'}</td>
                    <td class="py-3 text-slate-300 font-mono text-xs">${j.drive_date ? j.drive_date.slice(0, 10) : 'TBD'}</td>
                    <td class="py-3">${statusBadge(j.is_open ? 'OPEN' : 'CLOSED')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderAdminApplications(el) {
  try {
    const apps = await api.get('/applications');
    el.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-white">Central Application Master List</h2>
          <p class="text-xs text-slate-400 mt-1">All applications registered across all active drives.</p>
        </div>

        <div class="glass-panel rounded-3xl p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm">
              <thead>
                <tr class="text-left text-slate-500 border-b border-slate-800 text-xs uppercase tracking-wider">
                  <th class="pb-3">Student</th>
                  <th class="pb-3">Company</th>
                  <th class="pb-3">Role</th>
                  <th class="pb-3">Applied On</th>
                  <th class="pb-3">Current Status</th>
                  <th class="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                ${apps.map(a => `
                  <tr>
                    <td class="py-3 font-semibold text-white">${esc(a.full_name)} <span class="text-slate-500 font-mono text-xs block">${esc(a.usn)}</span></td>
                    <td class="py-3 text-slate-300">${esc(a.company_name)}</td>
                    <td class="py-3 text-slate-300">${esc(a.role)}</td>
                    <td class="py-3 text-slate-400">${new Date(a.applied_at).toLocaleDateString()}</td>
                    <td class="py-3">${statusBadge(a.status)}</td>
                    <td class="py-3 text-right">
                      <button onclick="showCandidateStatusModal(${a.id}, '${a.status}', '${esc(a.full_name)}')"
                        class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors">
                        Update
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

async function renderAdminOffers(el) {
  try {
    const offers = await api.get('/offers');
    el.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-white">Placement Offer Archive</h2>
          <p class="text-xs text-slate-400 mt-1">All issued offers and official acceptance statuses.</p>
        </div>

        <div class="glass-panel rounded-3xl p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm">
              <thead>
                <tr class="text-left text-slate-500 border-b border-slate-800 text-xs uppercase tracking-wider">
                  <th class="pb-3">Student</th>
                  <th class="pb-3">Hiring Company</th>
                  <th class="pb-3">Offered Role</th>
                  <th class="pb-3">Package (CTC)</th>
                  <th class="pb-3">Offer Key</th>
                  <th class="pb-3">Student Acceptance</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                ${offers.map(o => `
                  <tr>
                    <td class="py-3 font-semibold text-white">${esc(o.full_name)} <span class="text-slate-500 font-mono text-xs block">${esc(o.usn)}</span></td>
                    <td class="py-3 text-slate-300">${esc(o.company_name)}</td>
                    <td class="py-3 text-slate-300 font-semibold">${esc(o.role)}</td>
                    <td class="py-3 text-emerald-400 font-bold">₹${o.package_lpa} LPA</td>
                    <td class="py-3 font-mono text-xs text-slate-400">${esc(o.offer_letter_key)}</td>
                    <td class="py-3">${statusBadge(o.accepted ? 'ACCEPTED' : 'OFFERED')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = renderErrorBox(err.message);
  }
}

// ═════════════════════════════════════════════════════════════
// MODAL DIALOGS
// ═════════════════════════════════════════════════════════════
function showModal(title, html, onReady) {
  const backdrop = document.createElement('div');
  backdrop.id = 'modal-backdrop';
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="glass-panel rounded-3xl p-6 sm:p-8 w-full max-w-lg mx-4 relative max-h-[92vh] overflow-y-auto glow-indigo border border-slate-700/80">
      <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <h3 class="text-lg font-bold text-white">${esc(title)}</h3>
        <button onclick="closeModal()" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xl leading-none">&times;</button>
      </div>
      ${html}
    </div>
  `;
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
  document.body.appendChild(backdrop);
  if (onReady) onReady();
}

function closeModal() {
  const el = document.getElementById('modal-backdrop');
  if (el) el.remove();
}

// Post Job Modal
async function showPostJobModal(companiesList = null) {
  let companies = companiesList;
  if (!companies && user.role === 'ADMIN') {
    companies = await api.get('/companies');
  }

  const companyField = user.role === 'ADMIN' ? `
    <div>
      <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Company</label>
      <select name="company_id" required class="inp w-full">
        ${companies.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}
      </select>
    </div>
  ` : '';

  showModal('Post Campus Placement Drive', `
    <form id="post-job-form" class="space-y-4">
      ${companyField}
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Role Title</label>
        <input name="role" required placeholder="e.g. Associate Software Engineer" class="inp w-full" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Recruitment Season</label>
          <input name="season" value="2026" required class="inp w-full" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Drive Date</label>
          <input name="drive_date" type="date" required value="${new Date().toISOString().slice(0, 10)}" class="inp w-full" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Minimum CGPA</label>
          <input name="min_cgpa" type="number" step="0.01" min="0" max="10" value="6.5" required class="inp w-full" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Max Active Backlogs</label>
          <input name="max_backlogs" type="number" min="0" value="0" required class="inp w-full" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Allowed Branches (Comma separated, blank = all)</label>
        <input name="allowed_branches" placeholder="CSE, ISE, ECE" class="inp w-full" />
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white shadow-lg shadow-indigo-600/30 transition-all mt-2">
        Publish Placement Drive
      </button>
    </form>
  `, () => {
    document.getElementById('post-job-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      d.allowed_branches = d.allowed_branches ? d.allowed_branches.split(',').map(x => x.trim()).filter(Boolean) : [];
      try {
        await api.post('/jobs', d);
        closeModal();
        toast('Placement drive posted successfully!');
        loadCurrentView();
      } catch (err) {
        toast(err.message, false);
      }
    });
  });
}

// Edit Job Modal
async function showEditJobModal(jobId) {
  const job = await api.get(`/jobs/${jobId}`);
  showModal(`Edit Drive — ${job.role}`, `
    <form id="edit-job-form" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Role Title</label>
        <input name="role" value="${esc(job.role)}" required class="inp w-full" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Min CGPA</label>
          <input name="min_cgpa" type="number" step="0.01" min="0" max="10" value="${job.min_cgpa}" required class="inp w-full" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Max Backlogs</label>
          <input name="max_backlogs" type="number" min="0" value="${job.max_backlogs}" required class="inp w-full" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Status</label>
        <select name="is_open" class="inp w-full">
          <option value="1" ${job.is_open ? 'selected' : ''}>OPEN (Accepting Applications)</option>
          <option value="0" ${!job.is_open ? 'selected' : ''}>CLOSED</option>
        </select>
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white shadow-lg transition-all">
        Save Drive Changes
      </button>
    </form>
  `, () => {
    document.getElementById('edit-job-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      d.is_open = d.is_open === '1';
      try {
        await api.put(`/jobs/${jobId}`, d);
        closeModal();
        toast('Drive updated successfully.');
        loadCurrentView();
      } catch (err) {
        toast(err.message, false);
      }
    });
  });
}

// Candidate Status Stage Modal
function showCandidateStatusModal(appId, currentStatus, studentName) {
  const allStages = ['APPLIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'INTERVIEWED', 'OFFERED', 'REJECTED'];
  showModal(`Candidate Stage: ${studentName}`, `
    <form id="candidate-stage-form" class="space-y-4">
      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
        <span class="text-slate-400">Current Stage:</span>
        ${statusBadge(currentStatus)}
      </div>
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Move Candidate to Next Stage</label>
        <select name="status" class="inp w-full">
          ${allStages.map(s => `<option value="${s}" ${s === currentStatus ? 'selected' : ''}>${s.replaceAll('_', ' ')}</option>`).join('')}
        </select>
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white shadow-lg transition-all">
        Update Candidate Stage
      </button>
    </form>
  `, () => {
    document.getElementById('candidate-stage-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await api.patch(`/applications/${appId}/status`, { status: e.target.status.value });
        closeModal();
        toast('Application stage updated!');
        loadCurrentView();
      } catch (err) {
        toast(err.message, false);
      }
    });
  });
}

// Issue Offer Modal
function showCreateOfferModal(applicationId, studentName, roleTitle) {
  showModal(`Extend Offer to ${studentName}`, `
    <form id="issue-offer-form" class="space-y-4">
      <div class="text-xs text-slate-400">Position: <strong class="text-slate-200">${esc(roleTitle)}</strong></div>
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">CTC Package (in LPA)</label>
        <input name="package_lpa" type="number" step="0.1" min="1" required placeholder="e.g. 12.5" class="inp w-full" />
      </div>
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Offer Letter Key / Reference</label>
        <input name="offer_letter_key" value="OL-${Date.now().toString().slice(-6)}" required class="inp w-full font-mono" />
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-sm text-white shadow-lg shadow-emerald-600/30 transition-all">
        Confirm & Issue Offer Letter
      </button>
    </form>
  `, () => {
    document.getElementById('issue-offer-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      d.application_id = applicationId;
      try {
        await api.post('/offers', d);
        closeModal();
        toast('Official offer extended to candidate!');
        loadCurrentView();
      } catch (err) {
        toast(err.message, false);
      }
    });
  });
}

// Add Student Modal (Admin)
function showAddStudentModal() {
  const branches = ['CSE', 'ECE', 'ISE', 'MECH', 'CIVIL'];
  showModal('Register Student Profile', `
    <form id="add-student-form" class="space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">College USN</label>
          <input name="usn" required placeholder="1VB22CS010" class="inp w-full font-mono uppercase" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
          <input name="full_name" required placeholder="Rohan Varma" class="inp w-full" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
        <input name="email" type="email" required placeholder="rohan@example.com" class="inp w-full" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Branch</label>
          <select name="branch" class="inp w-full">
            ${branches.map(b => `<option>${b}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">CGPA</label>
          <input name="cgpa" type="number" step="0.01" min="0" max="10" placeholder="8.50" required class="inp w-full" />
        </div>
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white shadow-lg transition-all">
        Save Student Record
      </button>
    </form>
  `, () => {
    document.getElementById('add-student-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      try {
        await api.post('/students', d);
        closeModal();
        toast('Student record saved successfully.');
        loadCurrentView();
      } catch (err) {
        toast(err.message, false);
      }
    });
  });
}

// Add/Edit Company Modal
function showCompanyModal(id = null, name = '') {
  showModal(id ? 'Edit Partner Company' : 'Add Corporate Partner', `
    <form id="company-form" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Company Name</label>
        <input name="name" value="${esc(name)}" required placeholder="e.g. Google India" class="inp w-full" />
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-sm text-white shadow-lg transition-all">
        Save Company
      </button>
    </form>
  `, () => {
    document.getElementById('company-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = { name: e.target.name.value };
      try {
        if (id) await api.put(`/companies/${id}`, d);
        else await api.post('/companies', d);
        closeModal();
        toast('Company record saved!');
        loadCurrentView();
      } catch (err) {
        toast(err.message, false);
      }
    });
  });
}

// ─── Utilities ────────────────────────────────────────────────
function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function renderErrorBox(msg) {
  return `
    <div class="glass-panel border-rose-800/80 rounded-2xl p-6 text-rose-300 text-sm">
      <div class="font-bold text-rose-200 mb-1">Failed to load content</div>
      <div>${esc(msg)}</div>
    </div>
  `;
}
