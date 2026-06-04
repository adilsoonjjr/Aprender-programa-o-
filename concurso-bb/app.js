/* ============================================================
   BB Concurso — App JS
   Complete single-page application logic
   ============================================================ */

'use strict';

// ── STATE ──────────────────────────────────────────────────
const STATE = {
  xp: 0,
  level: 1,
  streak: 0,
  lastStudyDate: '',
  completed: {},          // { 'subjectId/topicId': true }
  currentSubject: null,
  currentTopic: null,
  quiz: {
    questions: [],
    idx: 0,
    score: 0,
    answered: false,
    topicXP: 0
  }
};

const XP_PER_LEVEL = 150;

const LEVELS = [
  { min: 0,    name: 'Candidato',    icon: '📚' },
  { min: 150,  name: 'Estudante',    icon: '✏️' },
  { min: 400,  name: 'Preparado',    icon: '📖' },
  { min: 750,  name: 'Destaque',     icon: '⭐' },
  { min: 1200, name: 'Aprovado BB',  icon: '🏆' },
  { min: 2000, name: 'Servidor BB',  icon: '🏦' },
];

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// ── PERSISTENCE ──────────────────────────────────────────────

function loadState() {
  try {
    const raw = localStorage.getItem('bbconcurso-state');
    if (raw) {
      const saved = JSON.parse(raw);
      Object.assign(STATE, saved);
      if (!STATE.quiz) {
        STATE.quiz = { questions: [], idx: 0, score: 0, answered: false, topicXP: 0 };
      }
      if (!STATE.completed) STATE.completed = {};
    }
  } catch (e) {
    console.warn('loadState error:', e);
  }
  updateStreak();
}

function saveState() {
  try {
    const toSave = {
      xp: STATE.xp,
      level: STATE.level,
      streak: STATE.streak,
      lastStudyDate: STATE.lastStudyDate,
      completed: STATE.completed
    };
    localStorage.setItem('bbconcurso-state', JSON.stringify(toSave));
  } catch (e) {
    console.warn('saveState error:', e);
  }
}

function updateStreak() {
  const today = getTodayString();
  const last = STATE.lastStudyDate;
  if (!last) return;
  const yesterday = getYesterdayString();
  if (last === yesterday) {
    // streak continues
  } else if (last !== today) {
    STATE.streak = 0;
    saveState();
  }
}

function markStudyToday() {
  const today = getTodayString();
  if (STATE.lastStudyDate === today) return;
  const yesterday = getYesterdayString();
  if (STATE.lastStudyDate === yesterday) {
    STATE.streak += 1;
  } else if (!STATE.lastStudyDate) {
    STATE.streak = 1;
  } else {
    STATE.streak = 1;
  }
  STATE.lastStudyDate = today;
  saveState();
}

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ── LEVEL HELPERS ──────────────────────────────────────────

function getLevelInfo(xp) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.min) current = lvl;
    else break;
  }
  return current;
}

function getLevelNumber(xp) {
  let n = 1;
  for (const lvl of LEVELS) {
    if (xp >= lvl.min) n = LEVELS.indexOf(lvl) + 1;
    else break;
  }
  return n;
}

function getNextLevelMin(xp) {
  for (const lvl of LEVELS) {
    if (xp < lvl.min) return lvl.min;
  }
  return LEVELS[LEVELS.length - 1].min + XP_PER_LEVEL;
}

function getPrevLevelMin(xp) {
  let prev = 0;
  for (const lvl of LEVELS) {
    if (xp < lvl.min) return prev;
    prev = lvl.min;
  }
  return prev;
}

// ── DATA ACCESSORS ───────────────────────────────────────────

function getAllSubjects() {
  return [
    window.PORTUGUES_DATA,
    window.MATEMATICA_DATA,
    window.BANCARIO_DATA,
    window.INFORMATICA_DATA,
    window.ATUALIDADES_DATA,
    window.LEGISLACAO_DATA,
    window.VENDAS_DATA
  ].filter(Boolean);
}

function getSubjectById(id) {
  return getAllSubjects().find(s => s.id === id) || null;
}

function getTopicById(subjectId, topicId) {
  const subject = getSubjectById(subjectId);
  if (!subject) return null;
  return subject.topics.find(t => t.id === topicId) || null;
}

function isTopicDone(subjectId, topicId) {
  return Boolean(STATE.completed[`${subjectId}/${topicId}`]);
}

function countDoneTopics() {
  return Object.keys(STATE.completed).length;
}

// ── Get questions from a topic (handles both data formats) ──────

function getTopicQuestions(topic) {
  if (Array.isArray(topic.questions) && topic.questions.length > 0) {
    return topic.questions;
  }
  if (Array.isArray(topic.quiz) && topic.quiz.length > 0) {
    return topic.quiz;
  }
  return [];
}

// ── Get theory HTML from topic ──────────────────────────────

function getTopicTheory(topic) {
  if (typeof topic.theory === 'string') return topic.theory;
  if (topic.lesson && typeof topic.lesson.theory === 'string') return topic.lesson.theory;
  return '<p>Conteúdo em desenvolvimento.</p>';
}

// ── Get videos for topic ────────────────────────────────────

function getTopicVideos(topicId) {
  if (window.VIDEOS_DATA && window.VIDEOS_DATA[topicId]) {
    return window.VIDEOS_DATA[topicId];
  }
  return [];
}

// ── Get examples from topic ─────────────────────────────────

function getTopicExamples(topic) {
  if (Array.isArray(topic.examples) && topic.examples.length > 0) {
    return topic.examples.map(ex => ({
      title: ex.header || ex.title || 'Exemplo',
      code: ex.code || '',
      explanation: ex.explanation || ''
    }));
  }
  if (topic.lesson && Array.isArray(topic.lesson.examples) && topic.lesson.examples.length > 0) {
    return topic.lesson.examples.map(ex => ({
      title: ex.title || ex.header || 'Exemplo',
      code: ex.code || '',
      explanation: ex.explanation || ''
    }));
  }
  return [];
}

// ── DOM HELPERS ──────────────────────────────────────────

function setEl(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function getEl(id) {
  return document.getElementById(id);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── SCREEN NAVIGATION ────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${id}`);
  if (target) {
    target.classList.add('active');
    target.scrollTo(0, 0);
    setEl('headerXP', STATE.xp);
    setEl('lessonHeaderXP', STATE.xp);
  }
}

// ── NEXT TOPIC HELPER ────────────────────────────────────

function getNextTopic() {
  for (const subject of getAllSubjects()) {
    for (const topic of subject.topics) {
      if (!isTopicDone(subject.id, topic.id)) {
        return { subject, topic };
      }
    }
  }
  return null;
}

// ── ONBOARDING ───────────────────────────────────────────

function finishOnboarding() {
  localStorage.setItem('bbconcurso-visited', '1');
  renderHome();
}

// ── HOME SCREEN ──────────────────────────────────────────

function renderHome() {
  const levelInfo = getLevelInfo(STATE.xp);
  const nextItem = getNextTopic();
  const totalDone = countDoneTopics();

  const prevMin = getPrevLevelMin(STATE.xp);
  const nextMin = getNextLevelMin(STATE.xp);
  const pct = (nextMin > prevMin)
    ? Math.min(100, Math.round(((STATE.xp - prevMin) / (nextMin - prevMin)) * 100))
    : 100;

  const nextCardHTML = nextItem ? `
    <div class="next-lesson-card"
         tabindex="0" role="button"
         onclick="showLesson('${escapeHtml(nextItem.subject.id)}','${escapeHtml(nextItem.topic.id)}')"
         onkeydown="if(event.key==='Enter'){showLesson('${escapeHtml(nextItem.subject.id)}','${escapeHtml(nextItem.topic.id)}')}">
      <div class="nlc-tag">${totalDone === 0 ? '🚀 Por onde começar' : '📍 Continue de onde parou'}</div>
      <div class="nlc-title">${escapeHtml(nextItem.topic.title)}</div>
      <div class="nlc-row">
        <span class="nlc-sub">${escapeHtml(nextItem.subject.name)} · ~10 min · ${nextItem.topic.xp || 30} XP</span>
        <span class="nlc-cta">Estudar →</span>
      </div>
    </div>
  ` : `
    <div class="next-lesson-card done-card">
      <div class="nlc-tag">🏆 Missão cumprida!</div>
      <div class="nlc-title">Você completou toda a trilha de estudos!</div>
      <div class="nlc-row"><span class="nlc-sub">${STATE.xp.toLocaleString('pt-BR')} XP conquistados</span></div>
    </div>
  `;

  const homeContent = getEl('homeContent');
  if (!homeContent) { showScreen('home'); return; }

  homeContent.innerHTML = `
    <div class="level-row">
      <span class="level-row-icon">${levelInfo.icon}</span>
      <span class="level-row-name">${escapeHtml(levelInfo.name)}</span>
      <div class="level-row-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso de nível">
        <div class="level-row-fill" style="width:${pct}%"></div>
      </div>
      <span class="level-row-xp">⚡ ${STATE.xp.toLocaleString('pt-BR')}</span>
    </div>

    ${nextCardHTML}

    <section class="subjects-section" aria-label="Trilha de Estudos">
      <h2 class="section-title">Trilha de Estudos</h2>
      <div id="subjectGrid" role="list"></div>
    </section>

    <footer class="home-footer">
      <div class="footer-tip">
        <span class="footer-tip-icon">📵</span>
        <span>Funciona 100% offline após o primeiro acesso</span>
      </div>
      <div class="footer-copy">BB Concurso © 2025</div>
    </footer>
  `;

  renderSubjectGrid();

  // animate level bar after render
  setTimeout(() => {
    const fill = homeContent.querySelector('.level-row-fill');
    if (fill) { fill.style.width = '0'; requestAnimationFrame(() => { fill.style.width = pct + '%'; }); }
  }, 80);

  showScreen('home');
}

function renderSubjectGrid() {
  const subjects = getAllSubjects();
  const grid = getEl('subjectGrid');
  if (!grid) return;

  grid.innerHTML = subjects.map(subject => {
    const total = subject.topics.length;
    const done = subject.topics.filter(t => isTopicDone(subject.id, t.id)).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const allDone = done === total && total > 0;

    return `
      <div class="subject-row${allDone ? ' all-done' : ''}"
           role="listitem" tabindex="0"
           onclick="showTopics('${escapeHtml(subject.id)}')"
           onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();showTopics('${escapeHtml(subject.id)}')}"
           aria-label="${escapeHtml(subject.name)}, ${done} de ${total} tópicos concluídos">
        <div class="sr-icon" style="background:${escapeHtml(subject.color)}22">${subject.icon}</div>
        <div class="sr-body">
          <div class="sr-top">
            <span class="sr-name">${escapeHtml(subject.name)}</span>
            <span class="sr-count">${done}/${total}</span>
          </div>
          <div class="sr-bar"><div class="sr-fill" style="width:${pct}%;background:${escapeHtml(subject.color)}"></div></div>
        </div>
        <div class="sr-arrow">${allDone ? '✅' : '›'}</div>
      </div>`;
  }).join('');
}

// ── TOPICS SCREEN ──────────────────────────────────────────

function showTopics(subjectId) {
  const subject = getSubjectById(subjectId);
  if (!subject) return;

  STATE.currentSubject = subjectId;

  setEl('topicsTitle', escapeHtml(subject.name));
  setEl('headerXP', STATE.xp);
  setEl('topicsHeroIcon', subject.icon);
  setEl('topicsHeroName', escapeHtml(subject.name));

  const total = subject.topics.length;
  const done = subject.topics.filter(t => isTopicDone(subjectId, t.id)).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  setEl('topicsHeroDesc', `
    <div class="tprog-info">
      <span>${done} de ${total} aulas concluídas</span>
      <span>${pct}%</span>
    </div>
    <div class="tprog-track">
      <div class="tprog-fill" style="width:${pct}%;background:rgba(255,255,255,0.9)"></div>
    </div>
  `);

  const list = getEl('topicsList');
  if (list) {
    list.innerHTML = subject.topics.map((topic, idx) => {
      const isDone = isTopicDone(subjectId, topic.id);
      const qCount = getTopicQuestions(topic).length;

      return `
        <div class="topic-item${isDone ? ' done' : ''}"
             role="listitem" tabindex="0"
             onclick="showLesson('${escapeHtml(subjectId)}','${escapeHtml(topic.id)}')"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();showLesson('${escapeHtml(subjectId)}','${escapeHtml(topic.id)}')}"
             aria-label="Aula ${idx+1}: ${escapeHtml(topic.title)}${isDone ? ', concluída' : ''}">
          <div class="topic-num${isDone ? ' done' : ''}">${isDone ? '✓' : idx + 1}</div>
          <div class="topic-info">
            <div class="topic-title">${escapeHtml(topic.title)}</div>
            <div class="topic-sub">
              <span class="tbadge">⏱ ~10 min</span>
              <span class="tbadge accent">⚡ ${topic.xp || 30} XP</span>
              <span class="tbadge">${qCount} questões</span>
            </div>
          </div>
          <div class="topic-end">
            ${isDone
              ? '<span class="t-done-chip">Concluído</span>'
              : '<span class="t-arrow">›</span>'}
          </div>
        </div>`;
    }).join('');
  }

  showScreen('topics');
}

// ── LESSON SCREEN ──────────────────────────────────────────

function showLesson(subjectId, topicId) {
  const subject = getSubjectById(subjectId);
  const topic = getTopicById(subjectId, topicId);
  if (!subject || !topic) return;

  STATE.currentSubject = subjectId;
  STATE.currentTopic = topicId;

  markStudyToday();

  setEl('lessonTitle', escapeHtml(topic.title));
  setEl('lessonHeaderXP', STATE.xp);

  const theory = getTopicTheory(topic);
  const examples = getTopicExamples(topic);
  const videos = getTopicVideos(topic.id);
  const questions = getTopicQuestions(topic);
  const qCount = questions.length;

  const examplesHTML = examples.map((ex, i) => `
    <div class="example-card">
      <div class="ex-badge">📋 Exemplo ${i + 1}</div>
      <div class="ex-title">${escapeHtml(ex.title)}</div>
      <div class="ex-body"><pre class="ex-pre">${escapeHtml(ex.code)}</pre></div>
      <div class="ex-explanation">
        <span class="ex-exp-icon">💡</span>
        <div class="ex-exp-text">${ex.explanation}</div>
      </div>
    </div>`).join('');

  const videosHTML = videos.length > 0 ? `
    <div class="lesson-section-label">Videoaulas Recomendadas</div>
    <div class="video-list">
      ${videos.map(v => `
        <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="video-card" aria-label="${escapeHtml(v.title)}">
          <div class="video-thumb" aria-hidden="true">
            <svg class="video-play-icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="12" fill="#FF0000" opacity="0.9"/><polygon points="9.5,7 18,12 9.5,17" fill="white"/></svg>
          </div>
          <div class="video-info">
            <div class="video-title">${escapeHtml(v.title)}</div>
            <div class="video-channel">📺 ${escapeHtml(v.channel)}</div>
            <div class="video-desc">${escapeHtml(v.desc)}</div>
          </div>
          <div class="video-ext" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
        </a>`).join('')}
    </div>` : '';

  const hasQuiz = qCount > 0;

  const lessonBodyHTML = `
    <div class="lesson-step-bar" aria-label="Etapas da aula">
      <div class="step-node active" title="Teoria">1</div>
      <div class="step-connector"></div>
      <div class="step-node ${examples.length > 0 ? 'pending' : 'done'}" title="Exemplos">2</div>
      <div class="step-connector"></div>
      <div class="step-node pending" title="Quiz">3</div>
    </div>

    <div class="lesson-section-label">Teoria</div>
    <div class="lesson-theory">${theory}</div>

    ${videosHTML}

    ${examples.length > 0 ? `
      <div class="lesson-section-label">Exemplos Práticos</div>
      ${examplesHTML}
    ` : ''}

    ${hasQuiz ? `
      <div class="lesson-quiz-cta">
        <div class="lesson-quiz-cta-title">Pronto para testar?</div>
        <div class="lesson-quiz-cta-sub">${qCount} questão${qCount !== 1 ? 'ões' : ''} • Ganhe até ${topic.xp || 30} XP</div>
        <button class="btn-start-quiz" onclick="startQuiz()" aria-label="Iniciar quiz">
          🎯 Iniciar Quiz
        </button>
      </div>
    ` : `
      <div class="lesson-quiz-cta">
        <div class="lesson-quiz-cta-sub">Quiz em breve para este tópico.</div>
      </div>
    `}`;

  setEl('lessonBody', lessonBodyHTML);
  showScreen('lesson');
}

function goBackFromLesson() {
  if (STATE.currentSubject) {
    showTopics(STATE.currentSubject);
  } else {
    showScreen('home');
  }
}

// ── COPY CODE ──────────────────────────────────────────────

function copyCode(btn) {
  const pre = btn.closest('.example-block').querySelector('pre');
  if (!pre) return;
  const text = pre.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓ Copiado';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copiar';
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => fallbackCopy(text, btn));
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) { }
  document.body.removeChild(ta);
  btn.textContent = '✓ Copiado';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = 'Copiar';
    btn.classList.remove('copied');
  }, 2000);
}

// ── QUIZ ───────────────────────────────────────────────────────

function startQuiz() {
  const topic = getTopicById(STATE.currentSubject, STATE.currentTopic);
  if (!topic) return;

  const allQuestions = getTopicQuestions(topic);
  if (allQuestions.length === 0) {
    showToast('Sem questões', 'Quiz em breve!');
    return;
  }

  const shuffled = shuffleArray(allQuestions).slice(0, 5);

  STATE.quiz = {
    questions: shuffled,
    idx: 0,
    score: 0,
    answered: false,
    topicXP: topic.xp || 30
  };

  setEl('quizTitle', escapeHtml(topic.title));
  renderQuestion();
  showScreen('quiz');
}

function renderQuestion() {
  const { questions, idx } = STATE.quiz;
  const total = questions.length;
  const q = questions[idx];

  const qText = q.question || q.q || 'Questão sem texto';

  setEl('quizCounter', `${idx + 1}/${total}`);
  const pct = Math.round((idx / total) * 100);
  const bar = getEl('quizProgressBar');
  if (bar) bar.style.width = pct + '%';

  setEl('questionText', escapeHtml(qText));

  const optsList = getEl('optionsList');
  if (optsList) {
    const options = q.options || [];
    optsList.innerHTML = options.map((opt, i) => `
      <button class="option-btn"
              onclick="selectAnswer(${i})"
              aria-label="${LETTERS[i]}: ${escapeHtml(opt)}">
        <div class="option-letter">${LETTERS[i]}</div>
        <div class="option-text">${escapeHtml(opt)}</div>
      </button>`).join('');
  }

  const fb = getEl('feedbackBox');
  if (fb) { fb.classList.remove('show', 'wrong-fb'); fb.style.display = 'none'; }
  const btnNext = getEl('btnNext');
  if (btnNext) btnNext.classList.remove('show');

  STATE.quiz.answered = false;
}

function selectAnswer(selectedIdx) {
  if (STATE.quiz.answered) return;
  STATE.quiz.answered = true;

  const { questions, idx } = STATE.quiz;
  const q = questions[idx];
  const correctIdx = q.answer !== undefined ? q.answer : q.correct;
  const isCorrect = selectedIdx === correctIdx;

  if (isCorrect) STATE.quiz.score += 1;

  const btns = document.querySelectorAll('.option-btn');
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIdx) {
      btn.classList.add('correct');
    } else if (i === selectedIdx && !isCorrect) {
      btn.classList.add('wrong');
    } else {
      btn.classList.add('dimmed');
    }
  });

  const fb = getEl('feedbackBox');
  if (fb) {
    fb.style.display = 'flex';
    fb.classList.add('show');
    if (!isCorrect) fb.classList.add('wrong-fb');

    setEl('feedbackIcon', isCorrect ? '✓' : '✗');

    const titleEl = getEl('feedbackTitle');
    if (titleEl) {
      titleEl.textContent = isCorrect ? 'Correto! 🎉' : 'Incorreto';
      titleEl.className = 'feedback-title ' + (isCorrect ? 'correct-text' : 'wrong-text');
    }

    let explanationHTML = escapeHtml(q.explanation || '');
    if (!isCorrect) {
      explanationHTML = `<strong>Resposta correta: ${LETTERS[correctIdx]}.</strong> ${explanationHTML}`;
    }
    setEl('feedbackExplanation', explanationHTML);
  }

  const btnNext = getEl('btnNext');
  if (btnNext) {
    const isLast = idx === questions.length - 1;
    btnNext.textContent = isLast ? 'Ver Resultado ✓' : 'Próxima questão →';
    btnNext.classList.add('show');
  }
}

function nextQuestion() {
  const { questions, idx } = STATE.quiz;

  if (idx < questions.length - 1) {
    STATE.quiz.idx += 1;
    const pct = Math.round(((idx + 1) / questions.length) * 100);
    const bar = getEl('quizProgressBar');
    if (bar) bar.style.width = pct + '%';
    renderQuestion();
  } else {
    showResults();
  }
}

function confirmLeaveQuiz() {
  if (!STATE.quiz.answered && STATE.quiz.idx > 0) {
    if (!confirm('Sair do quiz? Seu progresso nesta sessão será perdido.')) return;
  }
  goBackFromLesson();
}

// ── RESULTS ──────────────────────────────────────────────

function showResults() {
  const { questions, score, topicXP } = STATE.quiz;
  const total = questions.length;
  const pct = total > 0 ? score / total : 0;

  let stars = 0;
  if (pct >= 0.4) stars = 1;
  if (pct >= 0.7) stars = 2;
  if (pct >= 0.9) stars = 3;

  const baseXP = Math.max(Math.round(pct * topicXP), Math.round(topicXP * 0.2));
  const earnedXP = stars === 3 ? topicXP : baseXP;

  const prevXP = STATE.xp;
  const prevLevel = getLevelNumber(STATE.xp);
  STATE.xp += earnedXP;
  STATE.level = getLevelNumber(STATE.xp);

  if (stars >= 1 && STATE.currentSubject && STATE.currentTopic) {
    STATE.completed[`${STATE.currentSubject}/${STATE.currentTopic}`] = true;
  }

  markStudyToday();
  saveState();

  let trophy = '😔';
  if (stars === 1) trophy = '🥉';
  if (stars === 2) trophy = '🥈';
  if (stars === 3) trophy = '🏆';

  setEl('resultsTrophy', trophy);

  let title = 'Continue estudando!';
  if (stars === 1) title = 'Bom início!';
  if (stars === 2) title = 'Muito bem!';
  if (stars === 3) title = 'Perfeito! 🎯';
  setEl('resultsTitle', title);

  setEl('resultsScore', `${score}/${total}`);

  const starsEl = getEl('resultsStars');
  if (starsEl) {
    starsEl.innerHTML = [1, 2, 3].map((s, i) => {
      const earned = i < stars;
      const delay = i * 0.15;
      return `<span class="star ${earned ? 'earned' : ''}"
                    style="${earned ? `animation-delay:${delay + 0.3}s` : ''}"
                    aria-label="${earned ? 'estrela ganhou' : 'estrela não ganhou'}">⭐</span>`;
    }).join('');
  }

  setEl('resultsXpValue', `+${earnedXP} XP`);

  const bar = getEl('quizProgressBar');
  if (bar) bar.style.width = '100%';

  // Inject next lesson button
  const nextItem = getNextTopic();
  const actionsEl = document.querySelector('.results-actions');
  if (actionsEl) {
    const nextBtn = nextItem
      ? `<button class="btn-next-lesson"
                 onclick="showLesson('${escapeHtml(nextItem.subject.id)}','${escapeHtml(nextItem.topic.id)}')"
                 aria-label="Ir para a próxima aula">
           📖 Próxima aula: ${escapeHtml(nextItem.topic.title)} →
         </button>`
      : `<button class="btn-next-lesson done-variant" onclick="showScreen('home')">
           🏆 Ver toda a trilha
         </button>`;
    actionsEl.innerHTML = `
      ${nextBtn}
      <button class="btn-secondary" onclick="retryQuiz()" aria-label="Tentar novamente">🔄 Tentar novamente</button>
      <button class="btn-outline" onclick="showScreen('home')" aria-label="Ir para o início">🏠 Início</button>
    `;
  }

  const newLevel = getLevelNumber(STATE.xp);
  if (newLevel > prevLevel) {
    setTimeout(() => {
      const lvlInfo = getLevelInfo(STATE.xp);
      showToast(`Subiu para Nível ${newLevel}!`, `${lvlInfo.icon} ${lvlInfo.name}`);
    }, 800);
  } else if (earnedXP > 0) {
    setTimeout(() => {
      showToast(`+${earnedXP} XP conquistados!`, stars === 3 ? 'Pontuação perfeita! 🌟' : `${score}/${total} corretas`);
    }, 600);
  }

  showScreen('results');
}

function retryQuiz() {
  startQuiz();
}

function backToTopics() {
  if (STATE.currentSubject) {
    showTopics(STATE.currentSubject);
  } else {
    showScreen('home');
  }
}

// ── TOAST ────────────────────────────────────────────────

let toastTimeout = null;

function showToast(msg, sub) {
  const toast = getEl('toast');
  if (!toast) return;

  setEl('toastMsg', escapeHtml(msg));
  setEl('toastSub', sub ? escapeHtml(sub) : '');

  const icon = msg.includes('XP') ? '⚡' :
               msg.includes('Nível') ? '🎖️' :
               msg.includes('Offline') ? '📵' : '🎉';
  setEl('toastIcon', icon);

  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ── OFFLINE BADGE ──────────────────────────────────────────

function updateOnlineStatus() {
  const badge = getEl('offlineBadge');
  if (!badge) return;
  if (navigator.onLine) {
    badge.classList.remove('visible');
  } else {
    badge.classList.add('visible');
    showToast('Modo Offline', 'Todo o conteúdo está disponível');
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ── INIT ───────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateOnlineStatus();

  const firstVisit = !localStorage.getItem('bbconcurso-visited');
  if (firstVisit) {
    showScreen('onboarding');
  } else {
    renderHome();
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const active = document.querySelector('.screen.active');
      if (!active) return;
      const id = active.id;
      if (id === 'screen-onboarding') finishOnboarding();
      else if (id === 'screen-topics') showScreen('home');
      else if (id === 'screen-lesson') goBackFromLesson();
      else if (id === 'screen-quiz') confirmLeaveQuiz();
      else if (id === 'screen-results') backToTopics();
    }
  });
});
