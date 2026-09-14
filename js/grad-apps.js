/* =============================================================================
   Grad Apps Tracker — localStorage dashboard (no backend)
============================================================================= */
(function () {
  "use strict";

  const STORAGE_KEY = "eg-grad-apps-v1";
  const TAB_KEY = "eg-grad-apps-tab";

  const TABS = [
    { id: "gatech", label: "Georgia Tech" },
    { id: "purdue", label: "Purdue" },
    { id: "recommenders", label: "Letters" }
  ];

  let activeTab = loadTab();

  function loadTab() {
    try {
      const t = localStorage.getItem(TAB_KEY);
      if (t === "gatech" || t === "purdue" || t === "recommenders") return t;
    } catch (_) { /* ignore */ }
    return "gatech";
  }

  function saveTab(id) {
    activeTab = id;
    try {
      localStorage.setItem(TAB_KEY, id);
    } catch (_) { /* ignore */ }
  }

  const THEME_KEY = "eg-grad-apps-theme";

  function currentTheme() {
    const t = document.documentElement.getAttribute("data-theme");
    return t === "light" ? "light" : "dark";
  }

  function logoFor(cfg) {
    return currentTheme() === "light" ? cfg.logoLight : cfg.logoDark;
  }

  function syncThemeControls() {
    const theme = currentTheme();
    document.querySelectorAll("[data-theme-set]").forEach((btn) => {
      const on = btn.getAttribute("data-theme-set") === theme;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function syncThemeLogos() {
    document.querySelectorAll("[data-school-logo]").forEach((img) => {
      const id = img.getAttribute("data-school-logo");
      const cfg = SCHOOLS[id];
      if (!cfg) return;
      const next = logoFor(cfg);
      if (img.getAttribute("src") !== next) img.setAttribute("src", next);
    });
  }

  function setTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) { /* ignore */ }
    syncThemeControls();
    syncThemeLogos();
  }

  const STATUS_OPTIONS = [
    { value: "not_started", label: "Not Started" },
    { value: "in_progress", label: "In Progress" },
    { value: "complete", label: "Complete" },
    { value: "submitted", label: "Submitted" }
  ];

  const REC_STATUS_OPTIONS = [
    { value: "needed", label: "Needed" },
    { value: "requested", label: "Requested" },
    { value: "confirmed", label: "Confirmed" },
    { value: "submitted", label: "Submitted" }
  ];

  const SCHOOLS = {
    gatech: {
      id: "gatech",
      name: "Georgia Tech",
      short: "GT",
      program: "M.S. Aerospace Engineering (thesis)",
      concentration: "Aircraft Flight Mechanics and Control",
      logoDark: "assets/images/schools/gatech-dark.svg",
      logoLight: "assets/images/schools/gatech-light.svg",
      accent: "#B3A369",
      accentSoft: "rgba(179, 163, 105, 0.08)",
      border: "rgba(179, 163, 105, 0.28)",
      navy: "#003057",
      deadlineISO: "2026-12-01T23:59:59-05:00",
      deadlineLabel: "Dec 1, 2026",
      deadlineNote: "Aid / full consideration · Final: Mar 1, 2027",
      checklist: [
        { id: "transcripts", label: "Transcripts" },
        { id: "cv", label: "CV / Resume" },
        { id: "fee", label: "Application fee" },
        { id: "lor", label: "Letters of recommendation" },
        { id: "essays", label: "Essays / statements" }
      ],
      essays: [
        {
          id: "motivation",
          label: "Academic / professional motivation",
          prompt: "Why pursue graduate study in this field, and what prepared you?",
          wordLimit: 500
        },
        {
          id: "why_gt",
          label: "Why Georgia Tech",
          prompt: "Why this program / school specifically?",
          wordLimit: 500
        },
        {
          id: "trajectory",
          label: "Post-degree career trajectory",
          prompt: "Where do you want to go after the M.S.?",
          wordLimit: 100
        },
        {
          id: "discrepancies",
          label: "Discrepancies / weaknesses (optional)",
          prompt: "Optional — address gaps or context admissions should know.",
          wordLimit: null,
          optional: true
        }
      ]
    },
    purdue: {
      id: "purdue",
      name: "Purdue",
      short: "PU",
      program: "M.S. Mechanical Engineering (thesis)",
      concentration: "Systems, Measurement, and Controls",
      logoDark: "assets/images/schools/purdue-dark.svg",
      logoLight: "assets/images/schools/purdue-light.svg",
      accent: "#CFB991",
      accentSoft: "rgba(207, 185, 145, 0.07)",
      border: "rgba(207, 185, 145, 0.28)",
      navy: "#111111",
      deadlineISO: "2026-12-01T23:59:59-05:00",
      deadlineLabel: "Dec 1, 2026",
      deadlineNote: "Research / fellowship priority deadline",
      checklist: [
        { id: "personal_background", label: "Personal Background" },
        { id: "emergency_contact", label: "Emergency Contact" },
        { id: "residency", label: "Residency" },
        { id: "campus_program", label: "Campus and Program" },
        { id: "first_choice", label: "First Choice Program Details" },
        { id: "me_questionnaire", label: "Mechanical Engineering Questionnaire" },
        { id: "education", label: "Education Background" },
        { id: "additional_info", label: "Additional Information" },
        { id: "employment", label: "Employment" },
        { id: "asop_section", label: "Academic Statement of Purpose" },
        { id: "phs_section", label: "Personal History Statement" },
        { id: "test_scores", label: "Test Scores" },
        { id: "resume", label: "Resume" },
        { id: "recommendations", label: "Recommendations" },
        { id: "acknowledgements", label: "Acknowledgements" },
        { id: "signature", label: "Signature" },
        { id: "review", label: "Review" }
      ],
      essays: [
        {
          id: "asop",
          label: "Academic Statement of Purpose",
          intro:
            "Help reviewers understand your academic interests and objectives, assess your background and preparation, and judge fit for Purdue ME. Address:",
          bullets: [
            "What are your professional plans and career goals? How will attending graduate school assist you in reaching those goals?",
            "Describe your research, scholarly, or creative interests. What topics are of particular interest to you? Be as specific as possible (interests can change).",
            "Discuss how your experiences, skills, and abilities have prepared you for graduate study (coursework, work/research, internships, presentations, publications, community service). For research experiences: topic, mentor, your role, and outcomes.",
            "Describe how your skills, preparation, and interests match this program. Identify faculty who share your research interests — show you researched the program, faculty, and focus areas."
          ],
          note: "Keep it concise and error-free. Complement — do not duplicate — the Personal History Statement.",
          wordLimit: null
        },
        {
          id: "phs",
          label: "Personal History Statement",
          intro:
            "Help reviewers learn more about you as a whole person and potential graduate student (community service, leadership, diverse teams, barriers overcome). Required:",
          bullets: [
            "Describe how your background and life experiences contribute to your ability to be both persistent and resourceful in graduate school.",
            "Describe how your life experiences have prepared you to contribute to an academic community where scholars with diverse research interests, abilities, backgrounds, and experiences are supported, respected, and valued."
          ],
          note: "Optional: address concerns if your academic record does not reflect your true capabilities, and discuss mitigating factors. Complement — do not duplicate — the Academic Statement of Purpose.",
          wordLimit: null
        }
      ]
    }
  };

  function defaultState() {
    const schools = {};
    Object.keys(SCHOOLS).forEach((id) => {
      const cfg = SCHOOLS[id];
      const checklist = {};
      cfg.checklist.forEach((item) => {
        checklist[item.id] = "not_started";
      });
      const essays = {};
      cfg.essays.forEach((item) => {
        essays[item.id] = { text: "", status: "not_started" };
      });
      schools[id] = { checklist, essays };
    });

    return {
      schools,
      recommenders: [
        {
          id: "rec-shin",
          name: "Dr. Hee-Sup Shin",
          status: "submitted",
          schools: ["gatech", "purdue"]
        },
        {
          id: "rec-slot-2",
          name: "",
          status: "needed",
          schools: []
        },
        {
          id: "rec-slot-3",
          name: "",
          status: "needed",
          schools: []
        }
      ]
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return mergeState(defaultState(), parsed);
    } catch (_) {
      return defaultState();
    }
  }

  function mergeState(base, incoming) {
    if (!incoming || typeof incoming !== "object") return base;

    Object.keys(base.schools).forEach((schoolId) => {
      const src = incoming.schools && incoming.schools[schoolId];
      if (!src) return;
      Object.keys(base.schools[schoolId].checklist).forEach((k) => {
        if (typeof src.checklist?.[k] === "string") {
          base.schools[schoolId].checklist[k] = src.checklist[k];
        }
      });
      Object.keys(base.schools[schoolId].essays).forEach((k) => {
        const e = src.essays?.[k];
        if (!e) return;
        if (typeof e.text === "string") base.schools[schoolId].essays[k].text = e.text;
        if (typeof e.status === "string") base.schools[schoolId].essays[k].status = e.status;
      });
    });

    if (Array.isArray(incoming.recommenders) && incoming.recommenders.length) {
      base.recommenders = incoming.recommenders.slice(0, 3).map((rec, i) => ({
        id: rec.id || base.recommenders[i]?.id || `rec-${i + 1}`,
        name: typeof rec.name === "string" ? rec.name : "",
        status: typeof rec.status === "string" ? rec.status : "needed",
        schools: Array.isArray(rec.schools) ? rec.schools.filter((s) => SCHOOLS[s]) : []
      }));
      while (base.recommenders.length < 3) {
        base.recommenders.push({
          id: `rec-slot-${base.recommenders.length + 1}`,
          name: "",
          status: "needed",
          schools: []
        });
      }
    }

    return base;
  }

  let state = loadState();
  let saveTimer = null;

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      flashSaved();
    } catch (_) {
      /* private mode / quota */
    }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 220);
  }

  function flashSaved() {
    const el = document.getElementById("save-indicator");
    if (!el) return;
    el.textContent = "Saved";
    el.classList.add("is-visible");
    clearTimeout(flashSaved._t);
    flashSaved._t = setTimeout(() => el.classList.remove("is-visible"), 1200);
  }

  function countWords(text) {
    const t = (text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }

  function daysRemaining(deadlineISO) {
    const end = new Date(deadlineISO).getTime();
    const now = Date.now();
    const ms = end - now;
    const dayMs = 24 * 60 * 60 * 1000;
    if (ms < 0) return { days: Math.ceil(ms / dayMs), overdue: true };
    return { days: Math.ceil(ms / dayMs), overdue: false };
  }

  function statusClass(status) {
    return `status-${status || "not_started"}`;
  }

  function progressForSchool(schoolId) {
    const cfg = SCHOOLS[schoolId];
    const data = state.schools[schoolId];
    const items = [];
    cfg.checklist.forEach((c) => items.push(data.checklist[c.id]));
    cfg.essays.forEach((e) => {
      if (e.optional && data.essays[e.id].status === "not_started" && !data.essays[e.id].text) {
        return;
      }
      items.push(data.essays[e.id].status);
    });
    const done = items.filter((s) => s === "complete" || s === "submitted").length;
    const total = Math.max(items.length, 1);
    return { done, total, pct: Math.round((done / total) * 100) };
  }

  function optionHtml(options, selected) {
    return options
      .map(
        (o) =>
          `<option value="${o.value}"${o.value === selected ? " selected" : ""}>${o.label}</option>`
      )
      .join("");
  }

  function renderCountdown(schoolId) {
    const cfg = SCHOOLS[schoolId];
    const { days, overdue } = daysRemaining(cfg.deadlineISO);
    const label = overdue
      ? `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} past`
      : `${days} day${days === 1 ? "" : "s"} left`;
    return `
      <div class="countdown ${overdue ? "is-overdue" : days <= 30 ? "is-urgent" : ""}">
        <span class="countdown-value">${label}</span>
        <span class="countdown-meta">Deadline ${cfg.deadlineLabel}</span>
        <span class="countdown-note">${cfg.deadlineNote}</span>
      </div>
    `;
  }

  function renderEssayPrompt(essay) {
    if (essay.bullets && essay.bullets.length) {
      const intro = essay.intro
        ? `<p class="essay-prompt">${escapeHtml(essay.intro)}</p>`
        : "";
      const list = `<ul class="essay-bullets">${essay.bullets
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join("")}</ul>`;
      const note = essay.note
        ? `<p class="essay-note">${escapeHtml(essay.note)}</p>`
        : "";
      return `
        <details class="prompt-drawer">
          <summary>Writing guidance</summary>
          <div class="prompt-drawer-body">${intro}${list}${note}</div>
        </details>
      `;
    }
    if (essay.prompt) {
      return `
        <details class="prompt-drawer">
          <summary>Writing guidance</summary>
          <div class="prompt-drawer-body"><p class="essay-prompt">${escapeHtml(essay.prompt)}</p></div>
        </details>
      `;
    }
    return "";
  }

  function renderSchoolCard(schoolId) {
    const cfg = SCHOOLS[schoolId];
    const data = state.schools[schoolId];
    const prog = progressForSchool(schoolId);

    const checklistHtml = cfg.checklist
      .map((item) => {
        const st = data.checklist[item.id];
        return `
          <li class="check-row ${statusClass(st)}">
            <span class="check-label">${item.label}</span>
            <select class="status-select" data-school="${schoolId}" data-kind="checklist" data-id="${item.id}" aria-label="${item.label} status">
              ${optionHtml(STATUS_OPTIONS, st)}
            </select>
          </li>
        `;
      })
      .join("");

    const essaysHtml = cfg.essays
      .map((essay) => {
        const entry = data.essays[essay.id];
        const words = countWords(entry.text);
        const over =
          essay.wordLimit != null && words > essay.wordLimit ? "is-over" : "";
        const near =
          essay.wordLimit != null &&
          words > essay.wordLimit * 0.9 &&
          words <= essay.wordLimit
            ? "is-near"
            : "";
        const counter =
          essay.wordLimit != null
            ? `<span class="word-counter ${over} ${near}" data-counter="${schoolId}:${essay.id}">
                 <strong>${words}</strong> / ${essay.wordLimit} words
               </span>`
            : `<span class="word-counter" data-counter="${schoolId}:${essay.id}">
                 <strong>${words}</strong> words
               </span>`;

        const promptBlock = renderEssayPrompt(essay);

        return `
          <article class="essay-block ${statusClass(entry.status)}" data-essay="${schoolId}:${essay.id}">
            <header class="essay-head">
              <div>
                <h4>${essay.label}${essay.optional ? ' <span class="optional-tag">Optional</span>' : ""}</h4>
                ${promptBlock}
              </div>
              <select class="status-select" data-school="${schoolId}" data-kind="essay-status" data-id="${essay.id}" aria-label="${essay.label} status">
                ${optionHtml(STATUS_OPTIONS, entry.status)}
              </select>
            </header>
            <textarea
              class="essay-draft"
              data-school="${schoolId}"
              data-kind="essay-text"
              data-id="${essay.id}"
              rows="14"
              spellcheck="true"
              placeholder="Start writing…">${escapeHtml(entry.text)}</textarea>
            <div class="essay-foot">${counter}</div>
          </article>
        `;
      })
      .join("");

    return `
      <section class="school-card" data-school="${schoolId}" style="--school-accent:${cfg.accent}; --school-accent-soft:${cfg.accentSoft}; --school-border:${cfg.border}; --school-navy:${cfg.navy || '#111'}">
        <div class="school-logo-plate">
          <img src="${logoFor(cfg)}" alt="${cfg.name} official mark" class="school-logo-img" data-school-logo="${schoolId}">
        </div>
        <header class="school-header">
          <div class="school-brand-text">
            <p class="school-kicker font-mono">Fall 2027 · Thesis M.S.</p>
            <h2>${cfg.name}</h2>
            <p class="school-program">${cfg.program}</p>
            <p class="school-concentration">${cfg.concentration}</p>
          </div>
          ${renderCountdown(schoolId)}
        </header>

        <div class="progress-row">
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="width:${prog.pct}%"></div>
          </div>
          <p class="progress-label font-mono">${prog.done}/${prog.total} tracked items done · ${prog.pct}%</p>
        </div>

        <div class="school-body">
          <section class="write-panel" aria-label="Written materials">
            <div class="write-panel-head">
              <h3 class="panel-title">Write</h3>
              <p class="write-hint">Prompts stay tucked away until you need them. Everything autosaves.</p>
            </div>
            <div class="essay-stack">${essaysHtml}</div>
          </section>

          <details class="reqs-drawer">
            <summary>
              <span class="panel-title">Application checklist</span>
              <span class="reqs-meta font-mono">${Object.values(data.checklist).filter((s) => s === "complete" || s === "submitted").length}/${cfg.checklist.length} done</span>
            </summary>
            <ul class="check-list">${checklistHtml}</ul>
          </details>
        </div>
      </section>
    `;
  }

  function renderRecommenders() {
    const rows = state.recommenders
      .map((rec, index) => {
        const schoolChecks = Object.keys(SCHOOLS)
          .map((sid) => {
            const checked = rec.schools.includes(sid) ? " checked" : "";
            return `
              <label class="school-chip">
                <input type="checkbox" data-rec="${index}" data-kind="rec-school" data-school="${sid}"${checked}>
                <span>${SCHOOLS[sid].short}</span>
              </label>
            `;
          })
          .join("");

        return `
          <li class="rec-row ${statusClass(rec.status)}">
            <div class="rec-main">
              <span class="rec-index font-mono">0${index + 1}</span>
              <input
                type="text"
                class="rec-name"
                data-rec="${index}"
                data-kind="rec-name"
                placeholder="Recommender name — Needed"
                value="${escapeAttr(rec.name)}"
                aria-label="Recommender ${index + 1} name">
              <select class="status-select" data-rec="${index}" data-kind="rec-status" aria-label="Recommender ${index + 1} status">
                ${optionHtml(REC_STATUS_OPTIONS, rec.status)}
              </select>
            </div>
            <div class="rec-schools" aria-label="Schools for recommender ${index + 1}">
              <span class="rec-schools-label font-mono">Sent to</span>
              ${schoolChecks}
            </div>
          </li>
        `;
      })
      .join("");

    return `
      <section class="rec-panel">
        <header class="rec-header">
          <div>
            <p class="panel-kicker font-mono">Shared across applications</p>
            <h2>Recommenders</h2>
            <p class="rec-sub">Same three letters likely cover both schools. Track request → confirm → submit.</p>
          </div>
        </header>
        <ul class="rec-list">${rows}</ul>
      </section>
    `;
  }

  function renderOverview() {
    const parts = Object.keys(SCHOOLS).map((id) => {
      const cfg = SCHOOLS[id];
      const { days, overdue } = daysRemaining(cfg.deadlineISO);
      const prog = progressForSchool(id);
      const dayLabel = overdue ? `${Math.abs(days)}d past` : `${days}d`;
      return `
        <button type="button" class="overview-chip" style="--school-accent:${cfg.accent}" data-tab="${id}" aria-label="Open ${cfg.name}">
          <div class="overview-logo">
            <img src="${logoFor(cfg)}" alt="" data-school-logo="${id}">
          </div>
          <div>
            <p class="font-mono">${cfg.short}</p>
            <p><strong>${dayLabel}</strong> · ${prog.pct}%</p>
          </div>
        </button>
      `;
    });

    const nearest = Object.keys(SCHOOLS)
      .map((id) => ({ id, ...daysRemaining(SCHOOLS[id].deadlineISO) }))
      .sort((a, b) => a.days - b.days)[0];

    const nearestLabel = nearest.overdue
      ? `Nearest deadline is overdue (${SCHOOLS[nearest.id].name})`
      : `Nearest deadline: ${nearest.days} day${nearest.days === 1 ? "" : "s"} (${SCHOOLS[nearest.id].name})`;

    return `
      <div class="overview-bar">
        <div>
          <p class="panel-kicker font-mono">Fall 2027 cycle</p>
          <p class="overview-headline">${nearestLabel}</p>
        </div>
        <div class="overview-chips">${parts.join("")}</div>
      </div>
    `;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, "&quot;");
  }

  function renderSwitcher() {
    const buttons = TABS.map((tab) => {
      const active = activeTab === tab.id ? "is-active" : "";
      const accent =
        tab.id === "gatech"
          ? SCHOOLS.gatech.accent
          : tab.id === "purdue"
            ? SCHOOLS.purdue.accent
            : "#a8a29e";
      const prog = tab.id === "recommenders" ? null : progressForSchool(tab.id);
      const meta = prog ? `${prog.pct}%` : "3 slots";
      return `
        <button type="button"
                class="switch-btn ${active}"
                data-tab="${tab.id}"
                style="--tab-accent:${accent}"
                aria-pressed="${activeTab === tab.id}">
          <span class="switch-label">${tab.label}</span>
          <span class="switch-meta font-mono">${meta}</span>
        </button>
      `;
    }).join("");

    return `<nav class="school-switcher" aria-label="Application sections">${buttons}</nav>`;
  }

  function applyActiveTab() {
    document.querySelectorAll("[data-panel]").forEach((panel) => {
      const on = panel.getAttribute("data-panel") === activeTab;
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
    });
    document.querySelectorAll(".switch-btn, .overview-chip[data-tab]").forEach((btn) => {
      const on = btn.getAttribute("data-tab") === activeTab;
      btn.classList.toggle("is-active", on);
      if (btn.classList.contains("switch-btn")) {
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      }
    });
    document.querySelectorAll(".switch-btn").forEach((btn) => {
      const id = btn.getAttribute("data-tab");
      const meta = btn.querySelector(".switch-meta");
      if (!meta) return;
      if (id === "recommenders") {
        meta.textContent = "3 slots";
      } else if (SCHOOLS[id]) {
        meta.textContent = `${progressForSchool(id).pct}%`;
      }
    });
  }

  function setActiveTab(id) {
    if (!TABS.some((t) => t.id === id)) return;
    saveTab(id);
    applyActiveTab();
    const rootTop = document.getElementById("grad-apps-root");
    if (rootTop) {
      const y = rootTop.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  }

  function autoGrow(el) {
    if (!el || el.tagName !== "TEXTAREA") return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 280)}px`;
  }

  function hydrateTextareas(root) {
    root.querySelectorAll(".essay-draft").forEach((ta) => autoGrow(ta));
  }

  function render() {
    const root = document.getElementById("grad-apps-root");
    if (!root) return;
    root.innerHTML = `
      ${renderOverview()}
      ${renderSwitcher()}
      <div class="panel-stack">
        <div data-panel="gatech" class="panel-pane">${renderSchoolCard("gatech")}</div>
        <div data-panel="purdue" class="panel-pane">${renderSchoolCard("purdue")}</div>
        <div data-panel="recommenders" class="panel-pane">
          ${renderRecommenders()}
          <div class="danger-zone">
            <button type="button" id="reset-local" class="reset-btn">Reset local drafts &amp; statuses</button>
            <p class="font-mono">Stored only in this browser · not uploaded</p>
          </div>
        </div>
      </div>
    `;
    bindEvents(root);
    applyActiveTab();
    hydrateTextareas(root);
  }

  function updateWordCounter(schoolId, essayId) {
    const cfg = SCHOOLS[schoolId].essays.find((e) => e.id === essayId);
    if (!cfg) return;
    const words = countWords(state.schools[schoolId].essays[essayId].text);
    const el = document.querySelector(`[data-counter="${schoolId}:${essayId}"]`);
    if (!el) return;
    if (cfg.wordLimit != null) {
      el.innerHTML = `<strong>${words}</strong> / ${cfg.wordLimit} words`;
      el.classList.toggle("is-over", words > cfg.wordLimit);
      el.classList.toggle(
        "is-near",
        words > cfg.wordLimit * 0.9 && words <= cfg.wordLimit
      );
    } else {
      el.innerHTML = `<strong>${words}</strong> words`;
      el.classList.remove("is-over", "is-near");
    }
  }

  function refreshProgress(schoolId) {
    const card = document.querySelector(`.school-card[data-school="${schoolId}"]`);
    if (!card) return;
    const prog = progressForSchool(schoolId);
    const fill = card.querySelector(".progress-fill");
    const label = card.querySelector(".progress-label");
    if (fill) fill.style.width = `${prog.pct}%`;
    if (label) {
      label.textContent = `${prog.done}/${prog.total} tracked items done · ${prog.pct}%`;
    }

    const overview = document.querySelector(".overview-bar");
    if (overview) {
      const wrap = document.createElement("div");
      wrap.innerHTML = renderOverview();
      overview.replaceWith(wrap.firstElementChild);
    }
    applyActiveTab();
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      const tabBtn = e.target.closest("[data-tab]");
      if (tabBtn && root.contains(tabBtn)) {
        e.preventDefault();
        setActiveTab(tabBtn.getAttribute("data-tab"));
      }
    });

    root.addEventListener("focusin", (e) => {
      if (e.target.classList.contains("essay-draft")) {
        document.body.classList.add("is-writing");
        e.target.closest(".essay-block")?.classList.add("is-focused");
      }
    });

    root.addEventListener("focusout", (e) => {
      if (!e.target.classList.contains("essay-draft")) return;
      e.target.closest(".essay-block")?.classList.remove("is-focused");
      requestAnimationFrame(() => {
        if (!document.activeElement?.classList?.contains("essay-draft")) {
          document.body.classList.remove("is-writing");
        }
      });
    });

    root.addEventListener("change", (e) => {
      const t = e.target;
      const kind = t.dataset.kind;
      if (!kind) return;

      if (kind === "checklist") {
        state.schools[t.dataset.school].checklist[t.dataset.id] = t.value;
        t.closest(".check-row")?.classList.remove(
          "status-not_started",
          "status-in_progress",
          "status-complete",
          "status-submitted"
        );
        t.closest(".check-row")?.classList.add(statusClass(t.value));
        const cfg = SCHOOLS[t.dataset.school];
        const data = state.schools[t.dataset.school];
        const done = Object.values(data.checklist).filter(
          (s) => s === "complete" || s === "submitted"
        ).length;
        const meta = document.querySelector(
          `.school-card[data-school="${t.dataset.school}"] .reqs-meta`
        );
        if (meta && cfg) meta.textContent = `${done}/${cfg.checklist.length} done`;
        scheduleSave();
        refreshProgress(t.dataset.school);
        return;
      }

      if (kind === "essay-status") {
        state.schools[t.dataset.school].essays[t.dataset.id].status = t.value;
        t.closest(".essay-block")?.classList.remove(
          "status-not_started",
          "status-in_progress",
          "status-complete",
          "status-submitted"
        );
        t.closest(".essay-block")?.classList.add(statusClass(t.value));
        scheduleSave();
        refreshProgress(t.dataset.school);
        return;
      }

      if (kind === "rec-status") {
        const i = Number(t.dataset.rec);
        state.recommenders[i].status = t.value;
        t.closest(".rec-row")?.classList.remove(
          "status-needed",
          "status-requested",
          "status-confirmed",
          "status-submitted",
          "status-not_started",
          "status-in_progress",
          "status-complete"
        );
        t.closest(".rec-row")?.classList.add(statusClass(t.value));
        scheduleSave();
        return;
      }

      if (kind === "rec-school") {
        const i = Number(t.dataset.rec);
        const sid = t.dataset.school;
        const set = new Set(state.recommenders[i].schools);
        if (t.checked) set.add(sid);
        else set.delete(sid);
        state.recommenders[i].schools = Array.from(set);
        scheduleSave();
      }
    });

    root.addEventListener("input", (e) => {
      const t = e.target;
      const kind = t.dataset.kind;
      if (!kind) return;

      if (kind === "essay-text") {
        const schoolId = t.dataset.school;
        const essayId = t.dataset.id;
        const entry = state.schools[schoolId].essays[essayId];
        entry.text = t.value;
        if (t.value.trim() && entry.status === "not_started") {
          entry.status = "in_progress";
          const sel = t
            .closest(".essay-block")
            ?.querySelector('select[data-kind="essay-status"]');
          if (sel) sel.value = "in_progress";
          t.closest(".essay-block")?.classList.remove("status-not_started");
          t.closest(".essay-block")?.classList.add("status-in_progress");
          refreshProgress(schoolId);
        }
        updateWordCounter(schoolId, essayId);
        autoGrow(t);
        scheduleSave();
        return;
      }

      if (kind === "rec-name") {
        const i = Number(t.dataset.rec);
        state.recommenders[i].name = t.value;
        if (t.value.trim() && state.recommenders[i].status === "needed") {
          state.recommenders[i].status = "requested";
          const sel = t.closest(".rec-row")?.querySelector('select[data-kind="rec-status"]');
          if (sel) sel.value = "requested";
          t.closest(".rec-row")?.classList.remove("status-needed");
          t.closest(".rec-row")?.classList.add("status-requested");
        }
        scheduleSave();
      }
    });

    const resetBtn = root.querySelector("#reset-local");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (
          !confirm(
            "Clear all saved essay drafts and statuses for this tracker on this browser?"
          )
        ) {
          return;
        }
        localStorage.removeItem(STORAGE_KEY);
        state = defaultState();
        render();
        flashSaved();
      });
    }
  }

  function tickCountdowns() {
    Object.keys(SCHOOLS).forEach((id) => {
      const card = document.querySelector(`.school-card[data-school="${id}"]`);
      if (!card) return;
      const host = card.querySelector(".countdown");
      if (!host) return;
      const wrap = document.createElement("div");
      wrap.innerHTML = renderCountdown(id);
      host.replaceWith(wrap.firstElementChild);
    });
    const overview = document.querySelector(".overview-bar");
    if (overview) {
      const wrap = document.createElement("div");
      wrap.innerHTML = renderOverview();
      overview.replaceWith(wrap.firstElementChild);
    }
    applyActiveTab();
  }

  document.addEventListener("DOMContentLoaded", () => {
    syncThemeControls();
    document.querySelectorAll("[data-theme-set]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTheme(btn.getAttribute("data-theme-set"));
      });
    });
    render();
    setInterval(tickCountdowns, 60 * 60 * 1000);
  });
})();
