'use strict';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const ICONS = {
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 5.5a3.5 3.5 0 0 1 0 6.5"/><path d="M17.5 14.5c2.4.7 4 2.7 4 5.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
  printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="9" rx="2"/><path d="M7 14h10v7H7z"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/><path d="M10 11v6M14 11v6"/></svg>',
  warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2.5 20h19L12 3z"/><path d="M12 9.5v5"/><path d="M12 17.6v.1"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8.5-5.3-10.4-10C.2 7.4 2.6 4 6.2 4c2.2 0 3.9 1.2 5.8 3.4C13.9 5.2 15.6 4 17.8 4c3.6 0 6 3.4 4.6 7-1.9 4.7-10.4 10-10.4 10z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7v.1"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z"/><path d="m9 12 2 2 4-4.5"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
  login: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.5 17.5 0 0 1-3 3.9M6.6 6.6A16.7 16.7 0 0 0 2 12s3.5 7 10 7c1.9 0 3.6-.6 5-1.5"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>',
  sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h10M18 18h2"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="18" r="2"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  utensils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16h16"/><rect x="7" y="12" width="3" height="5" rx="1"/><rect x="12" y="8" width="3" height="9" rx="1"/><rect x="17" y="6" width="3" height="11" rx="1"/></svg>'
};

/* ---------- contas na nuvem (Supabase) ---------- */
// Preencha com os dados do seu projeto Supabase (ver supabase-setup.sql).
// A chave abaixo é a chave pública "anon/publishable"; ela pode ficar no site.
const CLOUD_URL = 'https://uanrqgnsrfvcxdwtenjy.supabase.co';
const CLOUD_KEY = 'sb_publishable_fG0B8csKs73RiZwcEQoOAg_zT_Jx2jE';
function cloudReady() { return /^https:\/\/.+\.supabase\.co$/.test(CLOUD_URL) && CLOUD_KEY.length > 20; }
async function rpc(fn, args) {
  const res = await fetch(CLOUD_URL + '/rest/v1/rpc/' + fn, {
    method: 'POST',
    headers: {
      apikey: CLOUD_KEY,
      Authorization: 'Bearer ' + CLOUD_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args || {})
  });
  if (!res.ok) throw new Error('cloud-' + res.status);
  const txt = await res.text();
  return txt ? JSON.parse(txt) : null;
}
function cloudError(r) {
  const map = {
    email: 'Este e-mail já está cadastrado.',
    password: 'A senha precisa ter pelo menos 6 caracteres.',
    name: 'Informe o nome do usuário.',
    inactive: 'Usuário desativado. Fale com um administrador.',
    self: 'Você não pode alterar o próprio papel ou status.',
    lastadmin: 'Este é o único administrador ativo. Promova outro administrador antes de alterá-lo.',
    forbidden: 'Sua sessão expirou. Entre novamente.',
    notfound: 'Usuário não encontrado. Atualize a lista e tente de novo.',
    exists: 'Já existe uma conta cadastrada.'
  };
  return (r && map[r.error]) || 'Não foi possível concluir. Tente novamente.';
}

/* ---------- storage ---------- */
const LS_RECORDS = 'ak-records-v1';
const LS_META = 'ak-meta-v1';
const LS_SEED = 'ak-seeded-v1';
const LS_SESSION = 'ak-session-v1';
const LS_SETTINGS = 'ak-settings-v1';
const LS_VIEW = 'ak-view-v1';
const LS_LESSONS = 'ak-lessons-v1';
const REL = { pai: 'Pai', mae: 'Mãe', outros: 'Outros' };
const GROUPS = {
  bercario: { label: 'Berçário', ages: '0 a 3 anos' },
  junior: { label: 'Junior', ages: '4 a 6 anos' },
  bigger: { label: 'Bigger', ages: '7 a 12 anos' }
};
const ROLES = { admin: 'Administrador', prof: 'Professor', apoio: 'Apoio', user: 'Credenciamento' };

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
let records = loadJSON(LS_RECORDS, []);
let meta = loadJSON(LS_META, { next: 1 });
let users = [];
let settings = Object.assign({ ministry: 'Ministério Infantil', phoneRequired: true, userCanEdit: true, userCanDelete: false }, loadJSON(LS_SETTINGS, {}));
let lessons = loadJSON(LS_LESSONS, {});
let lessonTab = 'bercario';
let session = loadJSON(LS_SESSION, null);
let authHasUsers = true;
let authConnError = false;
let editingId = null;
let drawerId = null;
let adminOpen = false;
let adminEditingId = null;
const selected = new Set();
const state = { query: '', filter: 'all', sort: 'recent' };
const savedView = loadJSON(LS_VIEW, null);
if (savedView) {
  if (['all', 'allergy', 'noallergy'].includes(savedView.filter)) state.filter = savedView.filter;
  if (['recent', 'name', 'code'].includes(savedView.sort)) state.sort = savedView.sort;
}

function saveRecords() {
  localStorage.setItem(LS_RECORDS, JSON.stringify(records));
  localStorage.setItem(LS_META, JSON.stringify(meta));
}
function saveSettings() { localStorage.setItem(LS_SETTINGS, JSON.stringify(settings)); }
function saveLessons() { localStorage.setItem(LS_LESSONS, JSON.stringify(lessons)); }
function saveView() { localStorage.setItem(LS_VIEW, JSON.stringify({ filter: state.filter, sort: state.sort })); }
function uid() {
  return (crypto.randomUUID && crypto.randomUUID()) || 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2);
}
function normalizeUser(u) {
  return {
    id: u.id,
    name: u.name,
    username: u.email,
    role: u.role,
    active: u.active,
    createdAt: Date.parse(u.createdAt) || Date.now()
  };
}
function currentUser() {
  return session && session.user && session.user.active ? session.user : null;
}
function saveSession() {
  if (session) localStorage.setItem(LS_SESSION, JSON.stringify(session));
  else localStorage.removeItem(LS_SESSION);
}
function isAdmin() { const u = currentUser(); return !!u && u.role === 'admin'; }
function isTeacher() { const u = currentUser(); return !!u && (u.role === 'admin' || u.role === 'prof'); }
function isStaff() { const u = currentUser(); return !!u && (u.role === 'user' || u.role === 'apoio'); }
function canEdit() { const u = currentUser(); return !!u && (u.role === 'admin' || (isStaff() && settings.userCanEdit)); }
function canDelete() { const u = currentUser(); return !!u && (u.role === 'admin' || (isStaff() && settings.userCanDelete)); }
function roleText(role) { return ROLES[role] || 'Credenciamento'; }
function activeAdmins() { return users.filter((u) => u.role === 'admin' && u.active); }
function initials(name) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase() || '?';
}
function nextCode() { return 'AK-' + String(meta.next).padStart(3, '0'); }
function relText(r) {
  if (r.relationship === 'outros' && r.otherRel) return 'Outros — ' + r.otherRel;
  return REL[r.relationship] || 'Outros';
}
function groupLabel(r) { return r.group && GROUPS[r.group] ? GROUPS[r.group].label : ''; }
function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
function maskPhone(v) {
  const d = String(v).replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return '(' + d;
  if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
  if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
  return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
}
function phoneDigits(v) { return String(v || '').replace(/\D/g, ''); }
function waNumber(phone) {
  let d = phoneDigits(phone);
  if (!d) return '';
  if (!(d.length === 12 || d.length === 13) || !d.startsWith('55')) d = '55' + d;
  return d;
}
function waLink(r) {
  const first = (r.guardianName || '').trim().split(/\s+/)[0] || 'responsável';
  const msg = 'Olá, ' + first + '! Aqui é da ' + settings.ministry + ' (Credenciamento AMi Kinder). Precisamos falar com você sobre ' + r.childName + '. Se possível, venha até a sala das crianças.';
  return 'https://wa.me/' + waNumber(r.guardianPhone) + '?text=' + encodeURIComponent(msg);
}
function openWhatsApp(id) {
  const r = records.find((x) => x.id === id);
  if (!r) return;
  if (phoneDigits(r.guardianPhone).length < 10) {
    toast('Este cadastro não tem telefone válido para o WhatsApp.', { danger: true });
    return;
  }
  window.open(waLink(r), '_blank', 'noopener');
  toast('Abrindo o WhatsApp de ' + r.guardianName.split(/\s+/)[0] + '.');
}

function isLoginOk(v) { return /^[a-z0-9._@+-]{3,60}$/.test(v); }

function seedIfNeeded() {
  if (localStorage.getItem(LS_SEED)) return;
  localStorage.setItem(LS_SEED, '1');
  if (records.length) return;
  const now = Date.now();
  const seed = [
    { childName: 'Ana Beatriz Souza', guardianName: 'Marcos Souza', guardianPhone: '(11) 98765-4321', relationship: 'pai', otherRel: '', hasAllergy: false, allergyDesc: '', group: 'junior', foodNote: 'Leva garrafinha de água' },
    { childName: 'Miguel Oliveira', guardianName: 'Juliana Oliveira', guardianPhone: '(11) 97654-3210', relationship: 'mae', otherRel: '', hasAllergy: true, allergyDesc: 'Amendoim e frutos do mar', group: 'junior', foodNote: '' },
    { childName: 'Sofia Lima', guardianName: 'Carla Lima', guardianPhone: '(11) 96543-2109', relationship: 'mae', otherRel: '', hasAllergy: true, allergyDesc: 'Leite / lactose', group: 'bercario', foodNote: 'Só leite sem lactose; lancheira própria' },
    { childName: 'Davi Fernandes', guardianName: 'Roberto Fernandes', guardianPhone: '(11) 95432-1098', relationship: 'pai', otherRel: '', hasAllergy: false, allergyDesc: '', group: 'bigger', foodNote: '' },
    { childName: 'Helena Castro', guardianName: 'Regina Castro', guardianPhone: '(11) 94321-0987', relationship: 'outros', otherRel: 'avó', hasAllergy: false, allergyDesc: '', group: 'bigger', foodNote: 'Jantar leve antes das 19h' }
  ];
  records = seed.map((s, i) => ({ ...s, id: uid(), code: 'AK-' + String(i + 1).padStart(3, '0'), createdAt: now - (seed.length - i) * 3600000, example: true }));
  meta.next = seed.length + 1;
  saveRecords();
}

/* ---------- auth ---------- */
function syncScrollLock() {
  document.body.style.overflow = (drawerId || adminOpen) ? 'hidden' : '';
}
function showAuth() {
  $('#app').hidden = true;
  $('#authScreen').hidden = false;
  const first = !authHasUsers;
  $('#loginForm').hidden = first;
  $('#setupForm').hidden = !first;
  $('#authSub').textContent = first
    ? 'Primeiro acesso: crie a conta de administrador.'
    : 'Entre com seu e-mail e senha para acessar os cadastros.';
  if (first) {
    $('#authNote').textContent = 'A conta fica salva na nuvem e funciona em qualquer aparelho. Depois você cadastra administradores, professores, apoio e credenciamento em Administração.';
  } else if (!cloudReady()) {
    $('#authNote').textContent = 'Banco de contas ainda não configurado neste site.';
  } else if (authConnError) {
    $('#authNote').textContent = 'Sem conexão com o banco de contas. Verifique a internet e tente novamente.';
  } else {
    $('#authNote').textContent = 'Sua conta funciona em qualquer aparelho ou navegador com internet.';
  }
  $('#errLogin').textContent = '';
  $('#errSetup').textContent = '';
  $('#loginPass').value = '';
  syncScrollLock();
}
function enterApp() {
  const u = currentUser();
  if (!u) { showAuth(); return; }
  $('#authScreen').hidden = true;
  $('#app').hidden = false;
  $('#userName').textContent = u.name;
  $('#userRole').textContent = roleText(u.role);
  $('#userAvatar').textContent = initials(u.name);
  $('#userAvatar').classList.toggle('av-admin', u.role === 'admin');
  $('#userAvatar').classList.toggle('av-prof', u.role === 'prof');
  $('#userAvatar').classList.toggle('av-apoio', u.role === 'apoio');
  $('#adminBtn').hidden = u.role !== 'admin';
  applySettingsText();
  render();
  renderLesson();
  syncScrollLock();
}
function applySettingsText() {
  $('#topSub').textContent = settings.ministry;
  $('#foot').textContent = 'Credenciamento AMi Kinder · ' + settings.ministry;
  $('#phoneReq').hidden = !settings.phoneRequired;
}
function logout() {
  const token = session && session.token;
  if (token && cloudReady()) rpc('ak_logout', { p_token: token }).catch(() => {});
  session = null;
  saveSession();
  closeDrawer();
  closeAdmin();
  showAuth();
  $('#loginUser').value = '';
  $('#loginUser').focus();
}

$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const uname = $('#loginUser').value.trim().toLowerCase();
  const pass = $('#loginPass').value;
  const fail = (msg) => {
    $('#errLogin').textContent = msg;
    $('#loginUser').classList.add('invalid');
    $('#loginPass').classList.add('invalid');
    const card = $('.auth-card');
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  };
  if (!cloudReady()) return fail('Banco de contas ainda não configurado neste site.');
  const btn = $('#loginBtn');
  btn.disabled = true;
  try {
    const r = await rpc('ak_login', { p_email: uname, p_pass: pass });
    if (!r || !r.ok) {
      authConnError = false;
      return fail(r && r.error === 'inactive' ? 'Usuário desativado. Fale com um administrador.' : 'E-mail ou senha incorretos.');
    }
    session = { token: r.token, user: r.user };
    saveSession();
    authHasUsers = true;
    enterApp();
    toast('Bem-vindo(a), ' + r.user.name + '!');
  } catch {
    authConnError = true;
    fail('Não foi possível conectar ao banco de contas. Verifique a internet.');
  } finally {
    btn.disabled = false;
  }
});

$('#setupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = $('#setupName').value.trim();
  const uname = $('#setupUser').value.trim().toLowerCase();
  const pass = $('#setupPass').value;
  const pass2 = $('#setupPass2').value;
  const err = $('#errSetup');
  const fail = (sel, msg) => {
    ['#setupName', '#setupUser', '#setupPass', '#setupPass2'].forEach((s) => $(s).classList.remove('invalid'));
    if (sel) { $(sel).classList.add('invalid'); $(sel).focus(); }
    err.textContent = msg;
  };
  if (name.length < 2) return fail('#setupName', 'Informe seu nome.');
  if (!isLoginOk(uname)) return fail('#setupUser', 'E-mail inválido: use de 3 a 60 caracteres, sem espaços (ex.: nome@email.com).');
  if (pass.length < 6) return fail('#setupPass', 'A senha precisa ter pelo menos 6 caracteres.');
  if (pass !== pass2) return fail('#setupPass2', 'As senhas não conferem: digite exatamente a mesma senha nos dois campos.');
  if (!cloudReady()) return fail(null, 'Banco de contas ainda não configurado neste site.');
  const btn = $('#setupBtn');
  btn.disabled = true;
  try {
    const r = await rpc('ak_bootstrap', { p_name: name, p_email: uname, p_pass: pass });
    if (!r || !r.ok) {
      if (r && r.error === 'exists') {
        authHasUsers = true;
        showAuth();
        $('#errLogin').textContent = 'Este sistema já tem contas. Entre com seu e-mail e senha.';
        return;
      }
      return fail(null, cloudError(r));
    }
    session = { token: r.token, user: r.user };
    saveSession();
    authHasUsers = true;
    enterApp();
    confetti($('#submitBtn'));
    toast('Administrador criado. Você já pode cadastrar a equipe em Administração.');
  } catch {
    fail(null, 'Não foi possível conectar ao banco de contas. Verifique a internet.');
  } finally {
    btn.disabled = false;
  }
});

document.querySelectorAll('#loginForm input').forEach((inp) => {
  inp.addEventListener('input', () => {
    inp.classList.remove('invalid');
    $('#errLogin').textContent = '';
  });
});

document.querySelectorAll('#setupForm input').forEach((inp) => {
  inp.addEventListener('input', () => {
    inp.classList.remove('invalid');
    $('#errSetup').textContent = '';
  });
});

document.querySelectorAll('.eye').forEach((btn) => {
  btn.innerHTML = ICONS.eye;
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.eye);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.innerHTML = show ? ICONS.eyeOff : ICONS.eye;
    input.focus();
  });
});

$('#logoutBtn').addEventListener('click', logout);

/* ---------- rendering ---------- */
function filtered() {
  const q = state.query.trim().toLowerCase();
  const qd = phoneDigits(state.query);
  let list = records.filter((r) => {
    if (state.filter === 'allergy' && !r.hasAllergy) return false;
    if (state.filter === 'noallergy' && r.hasAllergy) return false;
    if (q && !(r.childName.toLowerCase().includes(q) || r.guardianName.toLowerCase().includes(q) || r.code.toLowerCase().includes(q) || (r.guardianPhone || '').toLowerCase().includes(q) || (qd.length >= 4 && phoneDigits(r.guardianPhone).includes(qd)))) return false;
    return true;
  });
  if (state.sort === 'name') list.sort((a, b) => a.childName.localeCompare(b.childName, 'pt-BR'));
  else if (state.sort === 'code') list.sort((a, b) => a.code.localeCompare(b.code, 'pt-BR', { numeric: true }));
  else list.sort((a, b) => b.createdAt - a.createdAt);
  return list;
}

function labelHTML(r) {
  const phone = r.guardianPhone
    ? '<div class="label-phone">' + ICONS.phone + '<span>Tel.: ' + esc(r.guardianPhone) + '</span></div>'
    : '';
  const group = groupLabel(r)
    ? '<span class="label-group">' + esc(groupLabel(r)) + '</span>'
    : '';
  const food = r.foodNote && r.foodNote.trim()
    ? '<div class="label-food">' + ICONS.utensils + '<span>ALIM.: ' + esc(r.foodNote.trim()) + '</span></div>'
    : '';
  const allergy = r.hasAllergy
    ? '<div class="label-allergy">' + ICONS.warn + '<span>ALERGIA: ' + esc(r.allergyDesc) + '</span></div>'
    : '<div class="label-allergy none">' + ICONS.check + '<span>Sem alergias registradas</span></div>';
  return '<div class="label">' +
    '<div class="label-top"><span class="label-brand">AMi KINDER</span><span class="label-tags">' + group + '<span class="label-code">' + esc(r.code) + '</span></span></div>' +
    '<div class="label-name">' + esc(r.childName) + '</div>' +
    '<div class="label-guardian">Resp.: ' + esc(r.guardianName) + ' (' + esc(relText(r)) + ')</div>' +
    phone +
    food +
    allergy +
    '</div>';
}

function rowHTML(r) {
  const group = groupLabel(r)
    ? '<span class="badge badge-' + esc(r.group) + '">' + esc(groupLabel(r)) + '</span>'
    : '';
  const badgeRel = '<span class="badge badge-' + esc(r.relationship) + '">' + esc(REL[r.relationship]) + '</span>';
  const badgeAl = r.hasAllergy
    ? '<span class="badge badge-allergy" title="' + esc(r.allergyDesc) + '">' + ICONS.warn + 'Alergia</span>'
    : '<span class="badge badge-ok">' + ICONS.check + 'Sem alergia</span>';
  const phonePart = r.guardianPhone ? ' · ' + esc(r.guardianPhone) : '';
  let actions = '<button class="icon-btn act-print" data-action="print" title="Ver e imprimir etiqueta" aria-label="Etiqueta de ' + esc(r.childName) + '">' + ICONS.printer + '</button>';
  if (phoneDigits(r.guardianPhone).length >= 10) actions += '<button class="icon-btn act-zap" data-action="zap" title="Chamar no WhatsApp" aria-label="Chamar ' + esc(r.guardianName) + ' no WhatsApp">' + ICONS.whatsapp + '</button>';
  if (canEdit()) actions += '<button class="icon-btn act-edit" data-action="edit" title="Editar cadastro" aria-label="Editar ' + esc(r.childName) + '">' + ICONS.pencil + '</button>';
  if (canDelete()) actions += '<button class="icon-btn act-del" data-action="delete" title="Excluir cadastro" aria-label="Excluir ' + esc(r.childName) + '">' + ICONS.trash + '</button>';
  return '<article class="row' + (selected.has(r.id) ? ' selected' : '') + '" data-id="' + esc(r.id) + '" tabindex="0" aria-label="' + esc(r.childName) + '">' +
    '<input type="checkbox" class="row-check" data-check="' + esc(r.id) + '"' + (selected.has(r.id) ? ' checked' : '') + ' aria-label="Selecionar ' + esc(r.childName) + ' para impressão">' +
    '<div class="row-main"><div class="row-title"><span class="row-name">' + esc(r.childName) + '</span><span class="row-code">' + esc(r.code) + '</span></div>' +
    '<div class="row-sub">Resp.: ' + esc(r.guardianName) + ' (' + esc(relText(r)) + ')' + phonePart + '</div></div>' +
    '<div class="row-badges">' + group + badgeRel + badgeAl + '</div>' +
    '<div class="row-actions">' + actions + '</div></article>';
}

function render() {
  for (const id of [...selected]) if (!records.some((r) => r.id === id)) selected.delete(id);
  const list = filtered();
  const allergyCount = records.filter((r) => r.hasAllergy).length;
  $('#statTotal').textContent = records.length + (records.length === 1 ? ' criança' : ' crianças');
  $('#statAllergy').textContent = allergyCount + ' com alergia';
  $('#listCount').textContent = list.length + ' de ' + records.length + (records.length === 1 ? ' registro' : ' registros');
  $('#rows').innerHTML = list.map(rowHTML).join('');
  $('#emptyState').hidden = list.length > 0;
  $('#emptyMsg').textContent = records.length === 0
    ? 'Cadastre a primeira criança no formulário para gerar a etiqueta.'
    : 'Nenhum resultado para a busca ou filtro atual. Ajuste os campos acima.';
  $('#exampleBanner').hidden = !records.some((r) => r.example);
  $('#allCount').textContent = list.length;
  $('#printAll').disabled = list.length === 0;
  $('#selCount').textContent = selected.size;
  $('#printSelected').disabled = selected.size === 0;
}

/* ---------- drawer ---------- */
function openDrawer(id) {
  const r = records.find((x) => x.id === id);
  if (!r) return;
  drawerId = id;
  const badgeGroup = groupLabel(r)
    ? '<span class="badge badge-' + esc(r.group) + '">' + esc(groupLabel(r)) + '</span>'
    : '';
  const badgeRel = '<span class="badge badge-' + esc(r.relationship) + '">' + esc(REL[r.relationship]) + '</span>';
  const badgeAl = r.hasAllergy
    ? '<span class="badge badge-allergy">' + ICONS.warn + 'Alergia</span>'
    : '<span class="badge badge-ok">' + ICONS.check + 'Sem alergia</span>';
  let actions = '<button class="btn btn-blue" data-action="print">' + ICONS.printer + 'Imprimir etiqueta</button>';
  if (phoneDigits(r.guardianPhone).length >= 10) actions += '<button class="btn btn-zap" data-action="zap">' + ICONS.whatsapp + 'Chamar no WhatsApp</button>';
  const second = [];
  if (canEdit()) second.push('<button class="btn btn-ghost" data-action="edit">' + ICONS.pencil + 'Editar</button>');
  if (canDelete()) second.push('<button class="btn btn-danger" data-action="delete">' + ICONS.trash + 'Excluir</button>');
  if (second.length) actions += '<div class="row2">' + second.join('') + '</div>';
  $('#drawer').innerHTML =
    '<div class="drawer-head"><div class="grow"><h2>' + esc(r.childName) + '</h2>' +
    '<div class="drawer-meta"><span class="row-code">' + esc(r.code) + '</span>' + badgeGroup + badgeRel + badgeAl + '</div></div>' +
    '<button class="icon-btn drawer-close" data-action="close" aria-label="Fechar detalhes">' + ICONS.x + '</button></div>' +
    '<div class="detail-grid">' +
    (groupLabel(r) ? '<div class="detail"><small>Turma</small><strong>' + esc(groupLabel(r)) + ' · ' + esc(GROUPS[r.group].ages) + '</strong></div>' : '') +
    '<div class="detail"><small>Responsável</small><strong>' + esc(r.guardianName) + ' (' + esc(relText(r)) + ')</strong></div>' +
    '<div class="detail"><small>Telefone do responsável</small><strong>' + (r.guardianPhone ? esc(r.guardianPhone) : 'Não informado') + '</strong></div>' +
    (r.hasAllergy
      ? '<div class="detail alert"><small>Alergia</small><strong>' + esc(r.allergyDesc) + '</strong></div>'
      : '<div class="detail safe"><small>Alergia</small><strong>Sem alergias registradas</strong></div>') +
    (r.foodNote && r.foodNote.trim() ? '<div class="detail"><small>Observação alimentar</small><strong>' + esc(r.foodNote.trim()) + '</strong></div>' : '') +
    '<div class="detail"><small>Cadastrado em</small><strong>' + esc(fmtDate(r.createdAt)) + '</strong></div>' +
    '</div>' +
    '<div class="label-preview-wrap">' + labelHTML(r) + '</div>' +
    '<p class="preview-note">Tamanho real: 100 × 30 mm. Na impressora, use papel 100×30 mm (o navegador já define o tamanho da página).</p>' +
    '<div class="drawer-actions">' + actions + '</div>';
  $('#drawer').classList.add('open');
  $('#drawerOverlay').classList.add('show');
  syncScrollLock();
}
function closeDrawer() {
  drawerId = null;
  $('#drawer').classList.remove('open');
  $('#drawerOverlay').classList.remove('show');
  syncScrollLock();
}

/* ---------- print ---------- */
function printRecords(list) {
  if (!list.length) {
    toast('Nenhuma etiqueta para imprimir.', { danger: true });
    return;
  }
  $('#print-root').innerHTML = list.map(labelHTML).join('');
  window.print();
}

/* ---------- toast & confetti ---------- */
function toast(msg, opts = {}) {
  const el = document.createElement('div');
  el.className = 'toast' + (opts.danger ? ' toast-danger' : '');
  el.innerHTML = (opts.danger ? ICONS.warn : ICONS.check) + '<span class="toast-msg">' + esc(msg) + '</span>';
  let done = false;
  const dismiss = () => {
    if (done) return;
    done = true;
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  };
  if (opts.actionLabel) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = opts.actionLabel;
    btn.addEventListener('click', () => { opts.onAction && opts.onAction(); dismiss(); });
    el.appendChild(btn);
  }
  $('#toasts').appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(dismiss, opts.duration || (opts.actionLabel ? 6500 : 3200));
}

const CONF_COLORS = ['#8338ec', '#1e88e5', '#7ac943', '#ffb703', '#fb8500', '#e5383b', '#ff5d8f'];
function confetti(anchor) {
  const rect = anchor.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const host = $('#confetti');
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('span');
    const size = 5 + Math.random() * 6;
    p.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + size + 'px;height:' + (size * (Math.random() > .5 ? 1 : .5)) + 'px;background:' + CONF_COLORS[i % CONF_COLORS.length] + ';border-radius:' + (Math.random() > .5 ? '50%' : '2px');
    host.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 110;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist - 60;
    const anim = p.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: 'translate(' + dx + 'px,' + (dy + 90) + 'px) rotate(' + (Math.random() * 720 - 360) + 'deg)', opacity: 0 }
    ], { duration: 750 + Math.random() * 500, easing: 'cubic-bezier(.2,.6,.3,1)' });
    anim.onfinish = () => p.remove();
  }
}

/* ---------- registration form ---------- */
const form = $('#regForm');
function setErr(inputSel, errSel, msg) {
  const input = inputSel ? $(inputSel) : null;
  const err = $(errSel);
  if (msg) {
    err.textContent = msg;
    if (input) input.classList.add('invalid');
  } else {
    err.textContent = '';
    if (input) input.classList.remove('invalid');
  }
}
function syncAllergyUI() {
  const on = $('#hasAllergy').checked;
  $('#allergyBox').classList.toggle('on', on);
  $('#allergyDetails').hidden = !on;
  if (!on) setErr('#allergyDesc', '#errAllergy', '');
}
function syncQuickChips() {
  const parts = $('#allergyDesc').value.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  document.querySelectorAll('#quickChips button').forEach((b) => {
    b.classList.toggle('active', parts.includes(b.dataset.al.toLowerCase()));
  });
}
function resetForm() {
  form.reset();
  editingId = null;
  $('#otherWrap').hidden = true;
  syncAllergyUI();
  syncQuickChips();
  setErr('#childName', '#errChild', '');
  setErr('#guardianName', '#errGuardian', '');
  setErr('#guardianPhone', '#errPhone', '');
  setErr(null, '#errRel', '');
  setErr(null, '#errGroup', '');
  $('#formTitle').textContent = 'Cadastro de criança';
  $('#formSub').textContent = 'Preencha os dados e gere a etiqueta na hora.';
  $('#submitLabel').textContent = 'Cadastrar criança';
  $('#formIcon').innerHTML = ICONS.plus;
  $('#cancelEdit').hidden = true;
}
function startEdit(id) {
  if (!canEdit()) return;
  const r = records.find((x) => x.id === id);
  if (!r) return;
  closeDrawer();
  editingId = id;
  $('#childName').value = r.childName;
  $('#guardianName').value = r.guardianName;
  $('#guardianPhone').value = r.guardianPhone || '';
  const groupRadio = r.group ? form.querySelector('input[name="group"][value="' + r.group + '"]') : null;
  form.querySelectorAll('input[name="group"]').forEach((g) => { g.checked = !!groupRadio && g === groupRadio; });
  $('#foodNote').value = r.foodNote || '';
  setErr(null, '#errGroup', '');
  const radio = form.querySelector('input[name="relationship"][value="' + r.relationship + '"]');
  if (radio) radio.checked = true;
  $('#otherWrap').hidden = r.relationship !== 'outros';
  $('#otherRel').value = r.otherRel || '';
  $('#hasAllergy').checked = r.hasAllergy;
  $('#allergyDesc').value = r.allergyDesc || '';
  syncAllergyUI();
  syncQuickChips();
  $('#formTitle').textContent = 'Editar cadastro';
  $('#formSub').textContent = 'Alterando o registro ' + r.code + '.';
  $('#submitLabel').textContent = 'Salvar alterações';
  $('#formIcon').innerHTML = ICONS.pencil;
  $('#cancelEdit').hidden = false;
  $('#formCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#childName').focus({ preventScroll: true });
}
function removeRecord(id) {
  if (!canDelete()) return;
  const idx = records.findIndex((r) => r.id === id);
  if (idx < 0) return;
  const rec = records[idx];
  records.splice(idx, 1);
  selected.delete(id);
  if (drawerId === id) closeDrawer();
  if (editingId === id) resetForm();
  saveRecords();
  render();
  toast('Cadastro de ' + rec.childName + ' excluído.', {
    danger: true,
    actionLabel: 'Desfazer',
    onAction: () => {
      records.splice(Math.min(idx, records.length), 0, rec);
      saveRecords();
      render();
      toast('Cadastro de ' + rec.childName + ' restaurado.');
    }
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const childName = $('#childName').value.trim();
  const guardianName = $('#guardianName').value.trim();
  const phoneRaw = $('#guardianPhone').value;
  const pd = phoneDigits(phoneRaw);
  const relInput = form.querySelector('input[name="relationship"]:checked');
  const relationship = relInput ? relInput.value : '';
  const otherRel = $('#otherRel').value.trim();
  const groupInput = form.querySelector('input[name="group"]:checked');
  const group = groupInput ? groupInput.value : '';
  const foodNote = $('#foodNote').value.trim();
  const hasAllergy = $('#hasAllergy').checked;
  const allergyDesc = $('#allergyDesc').value.trim();

  let firstBad = null;
  setErr('#childName', '#errChild', childName.length >= 2 ? '' : 'Informe o nome da criança.');
  if (childName.length < 2) firstBad = firstBad || $('#childName');
  setErr('#guardianName', '#errGuardian', guardianName.length >= 2 ? '' : 'Informe o nome do responsável.');
  if (guardianName.length < 2) firstBad = firstBad || $('#guardianName');
  const phoneOk = pd.length === 10 || pd.length === 11;
  const phoneMsg = settings.phoneRequired && !phoneOk
    ? 'Informe o telefone com DDD (10 ou 11 dígitos).'
    : (!settings.phoneRequired && pd.length > 0 && !phoneOk ? 'Telefone incompleto: use DDD + número (10 ou 11 dígitos).' : '');
  setErr('#guardianPhone', '#errPhone', phoneMsg);
  if (phoneMsg) firstBad = firstBad || $('#guardianPhone');
  setErr(null, '#errRel', relationship ? '' : 'Selecione Pai, Mãe ou Outros.');
  if (!relationship) firstBad = firstBad || form.querySelector('input[name="relationship"]');
  setErr(null, '#errGroup', group ? '' : 'Selecione a turma: Berçário, Junior ou Bigger.');
  if (!group) firstBad = firstBad || form.querySelector('input[name="group"]');
  setErr('#allergyDesc', '#errAllergy', hasAllergy && !allergyDesc ? 'Descreva a alergia para destacar na etiqueta.' : '');
  if (hasAllergy && !allergyDesc) firstBad = firstBad || $('#allergyDesc');
  if (firstBad) { firstBad.focus(); return; }

  const guardianPhone = pd.length ? maskPhone(phoneRaw) : '';
  let saved;
  if (editingId) {
    saved = records.find((r) => r.id === editingId);
    Object.assign(saved, { childName, guardianName, guardianPhone, relationship, otherRel: relationship === 'outros' ? otherRel : '', group, foodNote, hasAllergy, allergyDesc: hasAllergy ? allergyDesc : '' });
    toast('Cadastro de ' + childName + ' atualizado.');
  } else {
    saved = { id: uid(), code: nextCode(), createdAt: Date.now(), example: false, childName, guardianName, guardianPhone, relationship, otherRel: relationship === 'outros' ? otherRel : '', group, foodNote, hasAllergy, allergyDesc: hasAllergy ? allergyDesc : '' };
    meta.next += 1;
    records.unshift(saved);
    toast(childName + ' cadastrada! Etiqueta ' + saved.code + ' pronta.');
    confetti($('#submitBtn'));
  }
  saveRecords();
  render();
  resetForm();
  openDrawer(saved.id);
});

$('#cancelEdit').addEventListener('click', resetForm);
$('#childName').addEventListener('input', () => setErr('#childName', '#errChild', ''));
$('#guardianName').addEventListener('input', () => setErr('#guardianName', '#errGuardian', ''));
$('#guardianPhone').addEventListener('input', (e) => {
  e.target.value = maskPhone(e.target.value);
  setErr('#guardianPhone', '#errPhone', '');
});
form.querySelectorAll('input[name="relationship"]').forEach((r) => r.addEventListener('change', () => {
  $('#otherWrap').hidden = r.value !== 'outros' || !r.checked;
  setErr(null, '#errRel', '');
}));
form.querySelectorAll('input[name="group"]').forEach((r) => r.addEventListener('change', () => setErr(null, '#errGroup', '')));
$('#hasAllergy').addEventListener('change', syncAllergyUI);
$('#allergyDesc').addEventListener('input', () => { setErr('#allergyDesc', '#errAllergy', ''); syncQuickChips(); });
$('#quickChips').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-al]');
  if (!btn) return;
  const parts = $('#allergyDesc').value.split(',').map((s) => s.trim()).filter(Boolean);
  const i = parts.findIndex((p) => p.toLowerCase() === btn.dataset.al.toLowerCase());
  if (i >= 0) parts.splice(i, 1); else parts.push(btn.dataset.al);
  $('#allergyDesc').value = parts.join(', ');
  setErr('#allergyDesc', '#errAllergy', '');
  syncQuickChips();
});

/* ---------- list events ---------- */
$('#search').addEventListener('input', (e) => { state.query = e.target.value; render(); });
$('#filterAllergy').addEventListener('change', (e) => { state.filter = e.target.value; saveView(); render(); });
$('#sortBy').addEventListener('change', (e) => { state.sort = e.target.value; saveView(); render(); });

$('#rows').addEventListener('click', (e) => {
  const row = e.target.closest('.row');
  if (!row) return;
  const id = row.dataset.id;
  const actionBtn = e.target.closest('[data-action]');
  if (actionBtn) {
    const action = actionBtn.dataset.action;
    if (action === 'print') openDrawer(id);
    else if (action === 'zap') openWhatsApp(id);
    else if (action === 'edit') startEdit(id);
    else if (action === 'delete') removeRecord(id);
    return;
  }
  if (e.target.closest('.row-check')) return;
  openDrawer(id);
});
$('#rows').addEventListener('change', (e) => {
  const check = e.target.closest('.row-check');
  if (!check) return;
  const id = check.dataset.check;
  if (check.checked) selected.add(id); else selected.delete(id);
  check.closest('.row').classList.toggle('selected', check.checked);
  $('#selCount').textContent = selected.size;
  $('#printSelected').disabled = selected.size === 0;
});
$('#rows').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains('row')) openDrawer(e.target.dataset.id);
});

$('#printSelected').addEventListener('click', () => {
  printRecords(filtered().filter((r) => selected.has(r.id)));
});
$('#printAll').addEventListener('click', () => printRecords(filtered()));
$('#removeExamples').addEventListener('click', () => {
  records = records.filter((r) => !r.example);
  saveRecords();
  render();
  toast('Dados de exemplo removidos. Pronto para os cadastros reais!');
});

/* ---------- drawer events ---------- */
$('#drawer').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn || !drawerId) return;
  const action = btn.dataset.action;
  if (action === 'close') closeDrawer();
  else if (action === 'print') printRecords(records.filter((r) => r.id === drawerId));
  else if (action === 'zap') openWhatsApp(drawerId);
  else if (action === 'edit') startEdit(drawerId);
  else if (action === 'delete') removeRecord(drawerId);
});
$('#drawerOverlay').addEventListener('click', closeDrawer);

/* ---------- admin ---------- */
async function refreshUsers() {
  if (!session || !cloudReady()) return false;
  try {
    const r = await rpc('ak_admin_list', { p_token: session.token });
    if (r && r.ok) {
      users = (r.users || []).map(normalizeUser);
      return true;
    }
  } catch {}
  return false;
}
async function openAdmin() {
  if (!isAdmin()) return;
  closeDrawer();
  adminOpen = true;
  adminEditingId = null;
  $('#adminPanel').classList.add('open');
  $('#adminOverlay').classList.add('show');
  switchTab('users');
  loadSettingsForm();
  $('#userListView').hidden = false;
  $('#userForm').hidden = true;
  $('#usersList').innerHTML = '<p class="user-loading">Carregando usuários…</p>';
  $('#usersCount').textContent = '';
  syncScrollLock();
  await refreshUsers();
  if (adminOpen) renderUsers();
}
function closeAdmin() {
  adminOpen = false;
  $('#adminPanel').classList.remove('open');
  $('#adminOverlay').classList.remove('show');
  syncScrollLock();
}
function switchTab(tab) {
  document.querySelectorAll('.admin-tabs .tab').forEach((t) => {
    const on = t.dataset.tab === tab;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  $('#tabUsers').hidden = tab !== 'users';
  $('#tabReport').hidden = tab !== 'report';
  $('#tabSettings').hidden = tab !== 'settings';
  if (tab === 'report') openReportTab();
}
document.querySelectorAll('.admin-tabs .tab').forEach((t) => t.addEventListener('click', () => switchTab(t.dataset.tab)));
$('#adminBtn').addEventListener('click', openAdmin);
$('#adminClose').addEventListener('click', closeAdmin);
$('#adminOverlay').addEventListener('click', closeAdmin);

function showUserList() {
  $('#userListView').hidden = false;
  $('#userForm').hidden = true;
  renderUsers();
}
function renderUsers() {
  const me = currentUser();
  const admins = activeAdmins().length;
  $('#usersCount').textContent = users.length + (users.length === 1 ? ' usuário' : ' usuários') + ' · ' + admins + (admins === 1 ? ' administrador ativo' : ' administradores ativos');
  $('#usersList').innerHTML = users.map((u) => {
    const self = me && u.id === me.id;
    const lastAdmin = u.role === 'admin' && u.active && admins === 1;
    const roleClass = u.role === 'admin' ? 'badge-admin' : u.role === 'prof' ? 'badge-prof' : u.role === 'apoio' ? 'badge-apoio' : 'badge-user';
    const avClass = u.role === 'admin' ? ' av-admin' : u.role === 'prof' ? ' av-prof' : u.role === 'apoio' ? ' av-apoio' : '';
    const badges = '<span class="badge ' + roleClass + '">' + roleText(u.role) + '</span>' +
      (u.active ? '' : '<span class="badge badge-off">Desativado</span>') +
      (self ? '<span class="badge badge-ok">Você</span>' : '');
    let actions = '<button class="icon-btn act-edit" data-uedit="' + esc(u.id) + '" title="Editar usuário" aria-label="Editar ' + esc(u.name) + '">' + ICONS.pencil + '</button>';
    if (!self && !lastAdmin) actions += '<button class="icon-btn act-del" data-udel="' + esc(u.id) + '" title="Excluir usuário" aria-label="Excluir ' + esc(u.name) + '">' + ICONS.trash + '</button>';
    return '<div class="user-row"><span class="avatar' + avClass + '">' + esc(initials(u.name)) + '</span>' +
      '<div class="user-main"><div class="user-name">' + esc(u.name) + '</div>' +
      '<div class="user-sub">' + esc(u.username) + ' · desde ' + esc(new Date(u.createdAt).toLocaleDateString('pt-BR')) + '</div></div>' +
      '<div class="user-badges">' + badges + '</div>' +
      '<div class="row-actions">' + actions + '</div></div>';
  }).join('');
}
$('#usersList').addEventListener('click', (e) => {
  const ed = e.target.closest('[data-uedit]');
  const del = e.target.closest('[data-udel]');
  if (ed) openUserForm(ed.dataset.uedit);
  else if (del) removeUser(del.dataset.udel);
});
$('#newUserBtn').addEventListener('click', () => openUserForm(null));

function openUserForm(id) {
  adminEditingId = id;
  $('#userListView').hidden = true;
  $('#userForm').hidden = false;
  const u = id ? users.find((x) => x.id === id) : null;
  const me = currentUser();
  const self = !!u && me && u.id === me.id;
  $('#userFormTitle').textContent = u ? 'Editar usuário' : 'Novo usuário';
  $('#ufName').value = u ? u.name : '';
  $('#ufUser').value = u ? u.username : '';
  $('#ufPass').value = '';
  $('#ufPass2').value = '';
  $('#ufPassLabel').innerHTML = u ? 'Nova senha <span class="opt">(em branco mantém a atual)</span>' : 'Senha <i class="req">*</i>';
  $('#ufPass2Label').innerHTML = u ? 'Confirme a nova senha' : 'Confirme a senha <i class="req">*</i>';
  const role = u ? u.role : 'user';
  $('#userForm').querySelector('input[name="ufRole"][value="' + role + '"]').checked = true;
  $('#ufActive').checked = u ? u.active : true;
  $('#userForm').querySelectorAll('input[name="ufRole"]').forEach((r) => { r.disabled = self; });
  $('#ufActive').disabled = self;
  $('#errUserForm').textContent = '';
  $('#ufName').focus();
}
$('#ufCancel').addEventListener('click', showUserList);

$('#userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!isAdmin()) return;
  const err = $('#errUserForm');
  const name = $('#ufName').value.trim();
  const uname = $('#ufUser').value.trim().toLowerCase();
  const pass = $('#ufPass').value;
  const pass2 = $('#ufPass2').value;
  const roleInput = $('#userForm').querySelector('input[name="ufRole"]:checked');
  const role = roleInput ? roleInput.value : 'user';
  const active = $('#ufActive').checked;
  const me = currentUser();
  const u = adminEditingId ? users.find((x) => x.id === adminEditingId) : null;
  const self = !!u && u.id === me.id;

  if (name.length < 2) { err.textContent = 'Informe o nome do usuário.'; return; }
  if (!isLoginOk(uname)) { err.textContent = 'Informe um e-mail válido (3 a 60 caracteres, sem espaços).'; return; }
  if (users.some((x) => x.username === uname && (!u || x.id !== u.id))) { err.textContent = 'Este e-mail já está cadastrado.'; return; }
  if (!u && pass.length < 6) { err.textContent = 'A senha precisa de pelo menos 6 caracteres.'; return; }
  if (u && pass && pass.length < 6) { err.textContent = 'A nova senha precisa de pelo menos 6 caracteres.'; return; }
  if (pass !== pass2) { err.textContent = 'As senhas não conferem.'; return; }
  const finalRole = self ? u.role : role;
  const finalActive = self ? u.active : active;
  if (u && u.role === 'admin' && u.active && activeAdmins().length === 1 && (finalRole !== 'admin' || !finalActive)) {
    err.textContent = 'Este é o único administrador ativo. Promova outro administrador antes de alterá-lo.';
    return;
  }
  const btn = $('#userForm button[type="submit"]');
  btn.disabled = true;
  try {
    let r;
    if (u) {
      r = await rpc('ak_admin_update', {
        p_token: session.token, p_id: u.id, p_name: name, p_email: uname,
        p_role: finalRole, p_active: finalActive, p_pass: pass || null
      });
    } else {
      r = await rpc('ak_admin_create', {
        p_token: session.token, p_name: name, p_email: uname, p_pass: pass, p_role: role
      });
    }
    if (!r || !r.ok) { err.textContent = cloudError(r); return; }
    if (u && u.id === me.id) {
      session.user = r.user;
      saveSession();
    }
    await refreshUsers();
    renderUsers();
    showUserList();
    enterApp();
    toast(u ? 'Usuário ' + name + ' atualizado.' : 'Usuário ' + name + ' criado com sucesso.');
  } catch {
    err.textContent = 'Não foi possível conectar ao banco de contas. Verifique a internet.';
  } finally {
    btn.disabled = false;
  }
});

async function removeUser(id) {
  if (!isAdmin()) return;
  const me = currentUser();
  const u = users.find((x) => x.id === id);
  if (!u || u.id === me.id) return;
  if (u.role === 'admin' && u.active && activeAdmins().length === 1) return;
  if (!window.confirm('Excluir o usuário ' + u.name + '? Ele perderá o acesso em todos os aparelhos.')) return;
  try {
    const r = await rpc('ak_admin_delete', { p_token: session.token, p_id: id });
    if (!r || !r.ok) {
      toast(cloudError(r), { danger: true });
      return;
    }
    await refreshUsers();
    renderUsers();
    toast('Usuário ' + u.name + ' excluído.', { danger: true });
  } catch {
    toast('Não foi possível conectar ao banco de contas. Verifique a internet.', { danger: true });
  }
}

function loadSettingsForm() {
  $('#setMinistry').value = settings.ministry;
  $('#setPhoneReq').checked = settings.phoneRequired;
  $('#setCanEdit').checked = settings.userCanEdit;
  $('#setCanDelete').checked = settings.userCanDelete;
}
$('#saveSettings').addEventListener('click', () => {
  if (!isAdmin()) return;
  settings.ministry = $('#setMinistry').value.trim() || 'Ministério Infantil';
  settings.phoneRequired = $('#setPhoneReq').checked;
  settings.userCanEdit = $('#setCanEdit').checked;
  settings.userCanDelete = $('#setCanDelete').checked;
  saveSettings();
  applySettingsText();
  render();
  toast('Configurações salvas.');
});

/* ---------- monthly report (admin only) ---------- */
const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
let reportMonth = ymOf(Date.now());
function ymOf(ts) {
  const d = new Date(ts);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}
function monthTitle(ym) {
  const parts = ym.split('-').map(Number);
  return MONTH_NAMES[parts[1] - 1] + ' de ' + parts[0];
}
function reportMonthOptions() {
  const set = new Set([ymOf(Date.now())]);
  records.forEach((r) => { if (r.createdAt) set.add(ymOf(r.createdAt)); });
  return [...set].sort().reverse();
}
function recordsOfMonth(ym) {
  return records.filter((r) => r.createdAt && ymOf(r.createdAt) === ym).sort((a, b) => a.createdAt - b.createdAt);
}
function lastMonths(n) {
  const out = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'));
  }
  return out;
}
function reportStats(list) {
  const s = { total: list.length, allergy: 0, food: 0, whats: 0, groups: { bercario: 0, junior: 0, bigger: 0, none: 0 } };
  list.forEach((r) => {
    if (r.hasAllergy) s.allergy++;
    if (r.foodNote && r.foodNote.trim()) s.food++;
    if (phoneDigits(r.guardianPhone).length >= 10) s.whats++;
    s.groups[r.group && GROUPS[r.group] ? r.group : 'none']++;
  });
  return s;
}
function repStatCard(label, n) {
  return '<div class="rep-stat"><span class="rep-stat-n">' + n + '</span><span class="rep-stat-l">' + label + '</span></div>';
}
function barsHTML(ymList, activeYm) {
  const counts = ymList.map((ym) => records.filter((r) => r.createdAt && ymOf(r.createdAt) === ym).length);
  const max = Math.max(1, ...counts);
  return ymList.map((ym, i) => {
    const pct = Math.round((counts[i] / max) * 100);
    const parts = ym.split('-').map(Number);
    const lbl = MONTH_NAMES[parts[1] - 1].slice(0, 3) + (parts[1] === 1 ? '/' + String(parts[0]).slice(2) : '');
    return '<div class="rep-bar' + (ym === activeYm ? ' active' : '') + '" title="' + monthTitle(ym) + ': ' + counts[i] + ' cadastro(s)">' +
      '<span class="rep-bar-val">' + counts[i] + '</span>' +
      '<div class="rep-bar-track"><div class="rep-bar-fill" style="height:' + (counts[i] ? Math.max(pct, 4) : 2) + '%"></div></div>' +
      '<span class="rep-bar-lbl">' + lbl + '</span></div>';
  }).join('');
}
function classesHTML(list) {
  const s = reportStats(list);
  const rows = ['bercario', 'junior', 'bigger'].map((g) => ({ key: g, label: GROUPS[g].label, n: s.groups[g] }));
  if (s.groups.none) rows.push({ key: 'none', label: 'Sem turma', n: s.groups.none });
  const total = Math.max(1, list.length);
  return rows.map((r) => {
    const pct = Math.round((r.n / total) * 100);
    return '<div class="rep-class-row"><span class="rep-class-lbl">' + r.label + '</span>' +
      '<span class="rep-class-track"><span class="rep-class-fill g-' + r.key + '" style="width:' + (r.n ? Math.max(pct, 3) : 0) + '%"></span></span>' +
      '<span class="rep-class-n">' + r.n + '</span></div>';
  }).join('');
}
function repLessonsHTML() {
  return Object.keys(GROUPS).map((g) => {
    const l = lessons[g];
    return '<div class="rep-lesson"><span class="rep-lesson-tag g-' + g + '">' + GROUPS[g].label + '</span>' +
      (l ? '<span class="rep-lesson-text">' + esc(l.text) + '</span><span class="rep-lesson-meta">' + esc(l.by) + ' · ' + fmtDate(l.at) + '</span>'
        : '<span class="rep-lesson-text muted">Sem lição registrada</span>') + '</div>';
  }).join('');
}
function reportTableHTML(list) {
  const head = '<thead><tr><th>Data</th><th>Código</th><th>Criança</th><th>Turma</th><th>Responsável</th><th>Vínculo</th><th>Telefone</th><th>Alergia</th><th>Alimentação</th></tr></thead>';
  const rows = list.map((r) => {
    const d = new Date(r.createdAt);
    const when = d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const allergy = r.hasAllergy ? 'Sim — ' + esc(r.allergyDesc) : 'Não';
    const food = r.foodNote && r.foodNote.trim() ? esc(r.foodNote.trim()) : '—';
    return '<tr><td>' + when + '</td><td>' + esc(r.code) + '</td><td><strong>' + esc(r.childName) + '</strong></td>' +
      '<td>' + esc(groupLabel(r) || '—') + '</td><td>' + esc(r.guardianName) + '</td><td>' + esc(relText(r)) + '</td>' +
      '<td>' + esc(r.guardianPhone || '—') + '</td><td>' + allergy + '</td><td>' + food + '</td></tr>';
  }).join('');
  return head + '<tbody>' + (rows || '<tr><td colspan="9" class="rep-empty">Nenhum cadastro neste mês.</td></tr>') + '</tbody>';
}
function openReportTab() {
  if (!isAdmin()) return;
  const opts = reportMonthOptions();
  if (!opts.includes(reportMonth)) reportMonth = ymOf(Date.now());
  const sel = $('#reportMonth');
  sel.innerHTML = opts.map((ym) => '<option value="' + ym + '">' + monthTitle(ym) + '</option>').join('');
  sel.value = reportMonth;
  renderReport();
}
function renderReport() {
  if (!isAdmin()) return;
  const list = recordsOfMonth(reportMonth);
  const s = reportStats(list);
  $('#repCards').innerHTML = repStatCard('Crianças no mês', s.total) + repStatCard('Total cadastrado', records.length) +
    repStatCard('Com alergia', s.allergy) + repStatCard('Observação alimentar', s.food) + repStatCard('Com WhatsApp', s.whats);
  $('#repChart').innerHTML = barsHTML(lastMonths(12), reportMonth);
  $('#repClasses').innerHTML = classesHTML(list);
  $('#repLessons').innerHTML = repLessonsHTML();
  $('#repTableCount').textContent = list.length + (list.length === 1 ? ' cadastro' : ' cadastros');
  $('#repTable').innerHTML = reportTableHTML(list);
}
$('#reportMonth').addEventListener('change', () => {
  reportMonth = $('#reportMonth').value;
  renderReport();
});
$('#reportPrint').addEventListener('click', () => {
  if (!isAdmin()) return;
  const list = recordsOfMonth(reportMonth);
  const s = reportStats(list);
  const now = new Date();
  const stats = [
    ['Crianças no mês', s.total], ['Total cadastrado', records.length], ['Com alergia', s.allergy],
    ['Observação alimentar', s.food], ['Com WhatsApp', s.whats]
  ];
  $('#reportRoot').innerHTML =
    '<article class="report-print">' +
      '<header class="rpt-head"><img class="rpt-logo" src="assets/ami-kinder.jpg" alt="">' +
        '<div class="rpt-titles"><h1>Credenciamento AMi Kinder</h1><p>' + esc(settings.ministry) + '</p></div>' +
        '<div class="rpt-when"><strong>Relatório mensal</strong><span>' + monthTitle(reportMonth) + '</span>' +
        '<small>Gerado em ' + now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + '</small></div>' +
      '</header>' +
      '<section class="rpt-stats">' + stats.map((x) => '<div class="rpt-stat"><b>' + x[1] + '</b><span>' + x[0] + '</span></div>').join('') + '</section>' +
      '<section class="rpt-section"><h2>Crianças cadastradas por mês</h2><div class="rep-bars">' + barsHTML(lastMonths(12), reportMonth) + '</div></section>' +
      '<div class="rpt-two">' +
        '<section class="rpt-section"><h2>Por turma</h2><div class="rep-classes">' + classesHTML(list) + '</div></section>' +
        '<section class="rpt-section"><h2>Lição do dia</h2><div class="rep-lessons">' + repLessonsHTML() + '</div></section>' +
      '</div>' +
      '<section class="rpt-section"><h2>Detalhes dos cadastros — ' + monthTitle(reportMonth) + '</h2>' +
        '<table class="rep-table">' + reportTableHTML(list) + '</table></section>' +
      '<footer class="rpt-foot"><span>Credenciamento AMi Kinder · ' + esc(settings.ministry) + '</span>' +
        '<span>Total geral: ' + records.length + ' criança(s)</span></footer>' +
    '</article>';
  const cleanup = () => {
    document.body.classList.remove('printing-report');
    $('#reportRoot').innerHTML = '';
    window.removeEventListener('afterprint', cleanup);
  };
  document.body.classList.add('printing-report');
  window.addEventListener('afterprint', cleanup);
  window.print();
});

/* ---------- lesson of the day ---------- */
function renderLesson() {
  $('#lessonDate').textContent = 'Hoje · ' + new Date().toLocaleDateString('pt-BR');
  document.querySelectorAll('#lessonTabs .ltab').forEach((t) => {
    const on = t.dataset.lessonTab === lessonTab;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  const l = lessons[lessonTab];
  const canSet = isTeacher();
  $('#lessonEmpty').hidden = !!l;
  $('#lessonText').hidden = canSet || !l;
  $('#lessonText').textContent = l ? l.text : '';
  $('#lessonMeta').hidden = !l;
  $('#lessonMeta').textContent = l ? 'Atualizada por ' + l.by + ' · ' + fmtDate(l.at) : '';
  $('#lessonEdit').hidden = !canSet;
  $('#lessonInput').value = l ? l.text : '';
  $('#lessonDelete').hidden = !(canSet && l);
}
document.querySelectorAll('#lessonTabs .ltab').forEach((t) => t.addEventListener('click', () => {
  lessonTab = t.dataset.lessonTab;
  renderLesson();
}));
$('#lessonSave').addEventListener('click', () => {
  if (!isTeacher()) return;
  const text = $('#lessonInput').value.trim();
  if (!text) {
    toast('Escreva a lição do dia antes de salvar.', { danger: true });
    $('#lessonInput').focus();
    return;
  }
  lessons[lessonTab] = { text, by: currentUser().name, at: Date.now() };
  saveLessons();
  renderLesson();
  toast('Lição do ' + GROUPS[lessonTab].label + ' salva.');
});
$('#lessonInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); $('#lessonSave').click(); }
});
$('#lessonDelete').addEventListener('click', () => {
  if (!isTeacher()) return;
  const l = lessons[lessonTab];
  if (!l) return;
  delete lessons[lessonTab];
  saveLessons();
  renderLesson();
  toast('Lição do ' + GROUPS[lessonTab].label + ' removida.', {
    danger: true,
    actionLabel: 'Desfazer',
    onAction: () => {
      lessons[lessonTab] = l;
      saveLessons();
      renderLesson();
      toast('Lição do ' + GROUPS[lessonTab].label + ' restaurada.');
    }
  });
});

/* ---------- global keys ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (adminOpen) closeAdmin();
    else closeDrawer();
  }
});

/* ---------- init ---------- */
document.querySelectorAll('[data-ico]').forEach((el) => { el.innerHTML = ICONS[el.dataset.ico] || ''; });
$('#formIcon').innerHTML = ICONS.plus;
$('#filterAllergy').value = state.filter;
$('#sortBy').value = state.sort;

async function boot() {
  seedIfNeeded();
  render();
  if (cloudReady()) {
    try {
      const st = await rpc('ak_public_state');
      authHasUsers = !!(st && st.hasUsers);
      authConnError = false;
    } catch {
      authConnError = true;
      authHasUsers = true;
    }
  } else {
    authConnError = true;
    authHasUsers = true;
  }
  if (session && session.token && currentUser() && cloudReady()) {
    try {
      const u = await rpc('ak_session_user', { p_token: session.token });
      if (u) {
        session.user = u;
        saveSession();
      } else {
        session = null;
        saveSession();
      }
    } catch {}
  }
  if (currentUser()) enterApp();
  else showAuth();
}
boot();