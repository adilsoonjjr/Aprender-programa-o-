/* ============ STATE ============ */
const STATE = {
  xp: 0,
  level: 1,
  streak: 0,
  lastStudyDate: null,
  completed: {},   // { topicId: { score: n, total: n, xp: n } }
  currentLang: null,
  currentTopic: null,
  quiz: { questions: [], idx: 0, score: 0, answered: false }
};

const XP_PER_LEVEL = 100;
const LEVELS = ['Iniciante', 'Aprendiz', 'Desenvolvedor', 'Pleno', 'Sênior', 'Expert', 'Mestre', 'Arquiteto'];

/* ============ PERSISTENCE ============ */
function saveState() {
  const data = { xp: STATE.xp, level: STATE.level, streak: STATE.streak, lastStudyDate: STATE.lastStudyDate, completed: STATE.completed };
  try { localStorage.setItem('devquest', JSON.stringify(data)); } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('devquest');
    if (!raw) return;
    const d = JSON.parse(raw);
    STATE.xp = d.xp || 0;
    STATE.level = d.level || 1;
    STATE.streak = d.streak || 0;
    STATE.lastStudyDate = d.lastStudyDate || null;
    STATE.completed = d.completed || {};
  } catch(e) {}
}

/* ============ XP & LEVEL ============ */
function getLevelName() {
  return LEVELS[Math.min(STATE.level - 1, LEVELS.length - 1)];
}

function getXpInLevel() { return STATE.xp % XP_PER_LEVEL; }
function getXpToNext() { return XP_PER_LEVEL; }

function addXP(amount) {
  STATE.xp += amount;
  const newLevel = Math.floor(STATE.xp / XP_PER_LEVEL) + 1;
  if (newLevel > STATE.level) {
    STATE.level = newLevel;
    showToast('🎉', `Level ${STATE.level}!`, getLevelName());
  }
  updateStreakOnStudy();
  saveState();
  updatePlayerCard();
}

function updateStreakOnStudy() {
  const today = new Date().toDateString();
  if (STATE.lastStudyDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (STATE.lastStudyDate === yesterday) {
    STATE.streak++;
    if (STATE.streak > 1) showToast('🔥', `${STATE.streak} dias seguidos!`, 'Continue assim!');
  } else {
    STATE.streak = 1;
  }
  STATE.lastStudyDate = today;
}

/* ============ SCREENS ============ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); el.scrollTop = 0; }
}

/* ============ LANGUAGES DATA ============ */
function getAllLangs() {
  return [
    window.PYTHON_DATA,
    window.ANGULAR_DATA,
    window.SPRING_DATA,
    window.SQL_DATA,
    window.POWERBI_DATA,
    window.EXCEL_DATA,
    window.GIT_DATA,
    window.CONCEITOS_DATA
  ].filter(Boolean);
}

function getLangById(id) {
  return getAllLangs().find(l => l.id === id);
}

/* ============ HOME SCREEN ============ */
function renderHome() {
  updatePlayerCard();
  renderLangCards();
  checkInstallBanner();
  showScreen('screen-home');
}

function updatePlayerCard() {
  const xpInLevel = getXpInLevel();
  const pct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);

  setEl('player-xp', `${STATE.xp} XP total`);
  setEl('player-level', `Nível ${STATE.level} · ${getLevelName()}`);
  setEl('stat-xp', STATE.xp);
  setEl('stat-level', STATE.level);
  setEl('stat-streak', `${STATE.streak}🔥`);
  setEl('xp-progress-label-left', `Nível ${STATE.level} · ${xpInLevel} XP`);
  setEl('xp-progress-label-right', `${XP_PER_LEVEL} XP para Nível ${STATE.level + 1}`);
  const fill = document.getElementById('xp-progress-fill');
  if (fill) fill.style.width = pct + '%';

  // mini header bar
  const miniXp = document.getElementById('mini-xp-fill');
  if (miniXp) miniXp.style.width = pct + '%';
}

function renderLangCards() {
  const grid = document.getElementById('lang-grid');
  if (!grid) return;
  grid.innerHTML = '';
  getAllLangs().forEach(lang => {
    const done = lang.topics.filter(t => STATE.completed[t.id]).length;
    const total = lang.topics.length;
    const pct = Math.round((done / total) * 100);
    const card = document.createElement('div');
    card.className = 'lang-card fade-in';
    card.style.setProperty('--lang-color', lang.color);
    card.innerHTML = `
      <div class="lang-card-inner">
        <div class="lang-icon" style="background:${lang.gradient}">${lang.icon}</div>
        <div class="lang-info">
          <h3>${lang.name}</h3>
          <p>${done}/${total} tópicos concluídos</p>
          <div class="lang-progress-bar">
            <div class="lang-progress-fill" style="width:${pct}%;background:${lang.gradient}"></div>
          </div>
        </div>
        <span class="lang-arrow">›</span>
      </div>`;
    card.addEventListener('click', () => showTopics(lang.id));
    grid.appendChild(card);
  });
}

/* ============ TOPICS SCREEN ============ */
function showTopics(langId) {
  const lang = getLangById(langId);
  if (!lang) return;
  STATE.currentLang = langId;

  setEl('topics-lang-name', lang.name);
  setEl('topics-lang-icon', lang.icon);

  const list = document.getElementById('topics-list');
  list.innerHTML = '';

  lang.topics.forEach((topic, i) => {
    const done = STATE.completed[topic.id];
    const item = document.createElement('div');
    item.className = 'topic-item fade-in';
    item.style.animationDelay = (i * 0.04) + 's';
    const icons = ['📝', '⚡', '🔥', '🧠', '💡', '🎯', '🚀', '✨'];
    const icon = icons[i % icons.length];
    item.innerHTML = `
      <div class="topic-icon" style="background:${lang.gradient}">${icon}</div>
      <div class="topic-info">
        <h4>${topic.title}</h4>
        <small>${topic.lesson.examples.length} exemplo${topic.lesson.examples.length > 1 ? 's' : ''} · ${topic.quiz.length} perguntas</small>
      </div>
      <div class="topic-status">
        <span class="topic-xp">+${topic.xp} XP</span>
        ${done ? `<span class="topic-done">✓ ${done.score}/${done.total}</span>` : '<span class="topic-locked">Novo</span>'}
      </div>`;
    item.addEventListener('click', () => showLesson(langId, topic.id));
    list.appendChild(item);
  });

  showScreen('screen-topics');
}

/* ============ LESSON SCREEN ============ */
function showLesson(langId, topicId) {
  const lang = getLangById(langId);
  const topic = lang.topics.find(t => t.id === topicId);
  if (!lang || !topic) return;

  STATE.currentLang = langId;
  STATE.currentTopic = topicId;

  setEl('lesson-title', topic.lesson.title);
  setEl('lesson-lang', `${lang.icon} ${lang.name}`);

  const body = document.getElementById('lesson-body');
  body.innerHTML = `
    <div class="lesson-theory fade-in">${topic.lesson.theory}</div>
    ${topic.lesson.examples.map((ex, i) => `
      <div class="example-block fade-in" style="animation-delay:${i * 0.07}s">
        <h4>Exemplo ${i + 1}</h4>
        <h3>${ex.title}</h3>
        <div class="code-box">
          <pre>${escapeHtml(ex.code)}</pre>
          <button class="copy-btn" onclick="copyCode(this)">Copiar</button>
        </div>
        <div class="explanation-box">💡 ${ex.explanation}</div>
      </div>
    `).join('')}
    <button class="btn-start-quiz" onclick="startQuiz()">
      🎯 Fazer Quiz — +${topic.xp} XP
    </button>
  `;

  showScreen('screen-lesson');
}

function copyCode(btn) {
  const pre = btn.parentElement.querySelector('pre');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(pre.textContent).then(() => {
      btn.textContent = 'Copiado!';
      setTimeout(() => btn.textContent = 'Copiar', 2000);
    });
  }
}

/* ============ QUIZ ============ */
function startQuiz() {
  const lang = getLangById(STATE.currentLang);
  const topic = lang.topics.find(t => t.id === STATE.currentTopic);
  if (!lang || !topic) return;

  STATE.quiz = {
    questions: shuffleArray([...topic.quiz]),
    idx: 0,
    score: 0,
    answered: false
  };

  setEl('quiz-title', topic.title);
  renderQuestion();
  showScreen('screen-quiz');
}

function renderQuestion() {
  const q = STATE.quiz.questions[STATE.quiz.idx];
  const total = STATE.quiz.questions.length;
  const pct = Math.round((STATE.quiz.idx / total) * 100);

  setEl('quiz-progress-text', `${STATE.quiz.idx + 1} / ${total}`);
  setEl('quiz-score-text', `${STATE.quiz.score} acertos`);
  const fill = document.getElementById('quiz-fill');
  if (fill) fill.style.width = pct + '%';

  setEl('question-num', `Pergunta ${STATE.quiz.idx + 1} de ${total}`);
  setEl('question-text', q.question);

  const opts = document.getElementById('options-list');
  opts.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i));
    opts.appendChild(btn);
  });

  const fb = document.getElementById('feedback-box');
  fb.className = 'feedback-box';
  fb.innerHTML = '';

  const next = document.getElementById('btn-next');
  next.className = 'btn-next';
  next.textContent = STATE.quiz.idx === total - 1 ? 'Ver Resultado →' : 'Próxima →';

  STATE.quiz.answered = false;
}

function selectAnswer(idx) {
  if (STATE.quiz.answered) return;
  STATE.quiz.answered = true;

  const q = STATE.quiz.questions[STATE.quiz.idx];
  const correct = q.answer;
  const isCorrect = idx === correct;
  if (isCorrect) STATE.quiz.score++;

  const btns = document.querySelectorAll('.option-btn');
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === idx && !isCorrect) btn.classList.add('wrong');
  });

  const fb = document.getElementById('feedback-box');
  fb.className = `feedback-box show ${isCorrect ? 'correct' : 'wrong'}`;
  fb.innerHTML = `
    <div class="feedback-header">${isCorrect ? '✅ Correto!' : '❌ Incorreto'}</div>
    <div>${q.explanation}</div>`;

  document.getElementById('btn-next').classList.add('show');
}

function nextQuestion() {
  STATE.quiz.idx++;
  if (STATE.quiz.idx >= STATE.quiz.questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

/* ============ RESULTS ============ */
function showResults() {
  const lang = getLangById(STATE.currentLang);
  const topic = lang.topics.find(t => t.id === STATE.currentTopic);
  const score = STATE.quiz.score;
  const total = STATE.quiz.questions.length;
  const pct = score / total;

  let xpEarned = 0;
  if (pct === 1) xpEarned = topic.xp;
  else if (pct >= 0.75) xpEarned = Math.round(topic.xp * 0.75);
  else if (pct >= 0.5) xpEarned = Math.round(topic.xp * 0.5);
  else xpEarned = Math.round(topic.xp * 0.2);

  const stars = pct === 1 ? '⭐⭐⭐' : pct >= 0.75 ? '⭐⭐' : pct >= 0.5 ? '⭐' : '';
  const trophy = pct === 1 ? '🏆' : pct >= 0.75 ? '🥈' : pct >= 0.5 ? '🥉' : '📚';
  const title = pct === 1 ? 'Perfeito!' : pct >= 0.75 ? 'Muito bem!' : pct >= 0.5 ? 'Bom trabalho!' : 'Continue praticando!';

  STATE.completed[topic.id] = { score, total, xp: xpEarned };
  addXP(xpEarned);

  setEl('results-trophy', trophy);
  setEl('results-title', title);
  setEl('results-score', `${score} de ${total} corretas`);
  setEl('results-xp-num', `+${xpEarned}`);
  setEl('results-stars', stars);

  showScreen('screen-results');
}

/* ============ TOAST ============ */
let toastTimer = null;
function showToast(icon, text, sub) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.querySelector('.toast-text').textContent = text;
  toast.querySelector('.toast-sub').textContent = sub || '';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ============ INSTALL PWA ============ */
let deferredPrompt = null;
function checkInstallBanner() {
  const banner = document.getElementById('install-banner');
  if (!banner) return;
  const dismissed = localStorage.getItem('install-dismissed');
  if (deferredPrompt && !dismissed) {
    banner.classList.add('show');
  }
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  checkInstallBanner();
});

function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => {
    deferredPrompt = null;
    const banner = document.getElementById('install-banner');
    if (banner) banner.classList.remove('show');
  });
}

function dismissInstall() {
  localStorage.setItem('install-dismissed', '1');
  const banner = document.getElementById('install-banner');
  if (banner) banner.classList.remove('show');
}

/* ============ OFFLINE DETECTION ============ */
function updateOnlineStatus() {
  const badge = document.getElementById('offline-badge');
  if (!badge) return;
  if (!navigator.onLine) badge.classList.add('show');
  else badge.classList.remove('show');
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

/* ============ UTILS ============ */
function setEl(id, content) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = content;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============ SERVICE WORKER ============ */
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateOnlineStatus();
  registerSW();
  renderHome();
});
