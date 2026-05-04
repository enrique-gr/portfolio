/* =============================================================================
   ENRIQUE GARCIA — Main Site Script
   Sections:
     1. Data — projects, hw items, skill descriptions, coursework
     2. Hardware Log Ticker
     3. Featured Section
     4. Archive Tabs
     5. Skill Detail Pills
     6. Coursework Terminal
     7. Anomalies Scroll & Drag
     8. Engineering Skills Radar
     9. Mission Panel — Internship toggle
    10. Utilities — toast, email copy, profile scan, scroll progress
    11. Live Footer Metrics
    12. Init
============================================================================= */

/* =============================================================================
   1. DATA
============================================================================= */

/** @type {Object.<string, Object>} */
const PROJECTS = {
  "washu-vtol": {
    title: "WashU VTOL",
    category: "featured",
    logoUrl: "images/vtol.png",
    role: "Avionics & Systems Integration Lead",
    dates: "Sept 2025 - Present",
    tags: ["Pixhawk 6C", "PX4", "HIL Testing"],
    summary: "Architected the avionics and control system for WashU's semi-autonomous VTOL aircraft.",
    metric: "Outcome: Stable Autonomous Flight",
    problem: "Need reliable autonomous transition/hover behavior on a student-built VTOL platform.",
    contribution: "Owned avionics architecture, PX4 configuration, wiring reliability, and HIL validation loop.",
    result: "Achieved repeatable stable hover envelope and reduced integration regressions before flight days.",
    constraint: "Noisy embedded buses under mixed power loads",
    tradeoff: "Rapid feature tuning vs robust pre-flight validation",
    decision: "Prioritized HIL-first regression gates before field tests",
    outcome: "Reduced integration regressions and stabilized hover behavior",
    proof: ["PX4 + Pixhawk 6C full stack bring-up", "HIL scenarios validated pre-flight", "I2C noise fault resolved (VTOL-01)"],
    externalLink: "washu-vtol.html"
  },
  "washu-dbf": {
    title: "WashU Design/Build/Fly",
    category: "featured",
    logoUrl: "images/dbf.png",
    role: "Aerodynamics & Payload Engineer",
    dates: "Sept 2024 - Jan 2026",
    tags: ["ANSYS CFX", "XFLR5", "Composites"],
    summary: "Designed NACA-series wings using XFLR5/CFD and performed structural 2.5g load analysis.",
    metric: "Status: Flight Hardware Validated",
    problem: "Optimize aerodynamic efficiency while keeping structure manufacturable and competition-ready.",
    contribution: "Ran XFLR5 + ANSYS CFX iteration loops and coordinated wing geometry with structural constraints.",
    result: "Validated wing section performance and supported hardware configuration ready for flight testing.",
    constraint: "Competing aero efficiency and manufacturing practicality",
    tradeoff: "Aggressive airfoil targets vs structural reliability margins",
    decision: "Used iterative CFD + structural checks for final geometry",
    outcome: "Flight-ready wing configuration with validated trends",
    proof: ["XFLR5 polar sweeps across operating envelope", "CFD cross-checks on lift/drag trends", "2.5g structural load-informed geometry"],
    externalLink: "washu-dbf.html"
  },
  "sentinel-cv": {
    title: "Sentinel Computer Vision",
    category: "featured",
    logoUrl: "images/sentinel.png",
    role: "Algorithm Engineer",
    dates: "Winter 2025",
    tags: ["C++", "OpenCV", "Kalman Filter"],
    summary: "Real-time computer vision pipeline for autonomous target tracking and intercept prediction.",
    metric: "Capability: Zero-Latency Tracking",
    problem: "Track dynamic targets robustly with low-latency estimates for downstream guidance logic.",
    contribution: "Built CV detection pipeline and Kalman-based state estimation under noisy measurements.",
    result: "Delivered stable real-time tracking output suitable for closed-loop intercept simulation.",
    constraint: "Frame noise and target jitter at real-time rates",
    tradeoff: "Detection sensitivity vs false-positive stability",
    decision: "Paired contour filtering with Kalman smoothing",
    outcome: "Low-latency stable state estimates for guidance logic",
    proof: ["Frame-by-frame contour extraction pipeline", "Kalman filter for smoothed state estimates", "Low-latency C++ implementation"],
    externalLink: "sentinel.html"
  },
  "miro-lab": {
    title: "Multiplatform Interactive Robotics Lab",
    category: "featured",
    logoUrl: "images/mirolab.png",
    role: "Research Intern",
    dates: "Summer 2025",
    tags: ["Python", "MATLAB", "Sensor Fusion"],
    summary: "Developed a wearable sensor fusion system (IMU + EMG) and visual tracking pipeline.",
    metric: "Result: High-Fidelity Motion Sync",
    problem: "Synchronize noisy wearable sensor streams with visual tracking for reliable motion interpretation.",
    contribution: "Implemented fusion workflow for IMU + EMG + camera signals and analysis tooling.",
    result: "Improved signal coherence and produced repeatable motion signatures for research trials.",
    constraint: "Asynchronous multi-sensor timing and drift",
    tradeoff: "Pipeline complexity vs reproducible synchronization",
    decision: "Built deterministic alignment and validation tooling",
    outcome: "Repeatable motion signatures across test trials",
    proof: ["IMU + EMG synchronization pipeline", "Python/MATLAB analysis stack", "Research-oriented validation datasets"],
    externalLink: "miro-lab.html"
  },

  /* ---------- Personal Projects ---------- */
  "ekf-nav": {
    title: "Multi-Sensor Flight Nav",
    category: "personal",
    logoUrl: "images/sensor_fusion.png",
    role: "Independent Dev",
    tags: ["C++", "Embedded", "EKF"],
    summary: "Real-time 12-state Extended Kalman Filter fusing IMU, GPS, and vision data.",
    externalLink: "ekf-nav.html",
    fileSize: "2.4 MB"
  },
  "webtunnel-cfd": {
    title: "WebTunnel CFD",
    category: "personal",
    logoUrl: "images/cfd_v2.png",
    role: "Independent Dev",
    tags: ["JS", "Navier-Stokes", "Physics"],
    summary: "Zero-dependency real-time fluid simulation running in the browser.",
    externalLink: "webtunnel-cfd.html",
    fileSize: "1.8 MB"
  },
  "hyperion-engine": {
    title: "Hyperion 6-DOF",
    category: "personal",
    logoUrl: "images/hyperion.png",
    role: "Systems Architect",
    tags: ["C++20", "Multithreading"],
    summary: "High-frequency (10kHz) rigid body physics engine for flight software validation.",
    externalLink: "hyperion.html",
    fileSize: "14 MB"
  },
  "gnc-sim": {
    title: "GNC Lander Sim",
    category: "personal",
    logoUrl: "images/gnc.png",
    role: "Sim Engineer",
    tags: ["Control Theory", "PID"],
    summary: "Interactive rocket landing simulator with real-time PID tuning.",
    externalLink: "lander.html",
    fileSize: "3.2 MB"
  },
  "faultline": {
    title: "FAULTLINE",
    category: "personal",
    logoUrl: "images/faultline.png",
    role: "Systems Engineer",
    tags: ["State Machines", "Diagnostics"],
    summary: "Deterministic fault-detection console for robotic subsystems.",
    externalLink: "faultline.html",
    fileSize: "4.1 MB"
  },

  /* ---------- Coursework ---------- */
  "cad-foosball": {
    title: "Regulation Foosball",
    category: "coursework",
    logoUrl: "images/foosball.png",
    role: "Mechanical Design",
    tags: ["SolidWorks", "DFM"],
    summary: "Bottom-up CAD design of a playable table with 200+ part assembly.",
    externalLink: "cad-foosball.html",
    fileSize: "128 MB"
  },
  "cruise-control": {
    title: "Adaptive Cruise Control",
    category: "coursework",
    logoUrl: "images/acc.png",
    role: "Control Systems",
    tags: ["MATLAB", "Simulink"],
    summary: "Simulated longitudinal vehicle control using PID loops and radar logic.",
    externalLink: "cruise-control.html",
    fileSize: "8 MB"
  },
  "ambulance-system": {
    title: "RF Priority System",
    category: "coursework",
    logoUrl: "images/amb.png",
    role: "Embedded Systems",
    tags: ["Arduino", "RF Comms"],
    summary: "Wireless traffic preemption system for emergency vehicles.",
    externalLink: "ambulance-system.html",
    fileSize: "150 KB"
  },
  "solid-mechanics": {
    title: "Landing Gear FEA",
    category: "coursework",
    logoUrl: "images/solids.png",
    role: "Solid Mechanics",
    tags: ["ANSYS", "FEA"],
    summary: "Designing a nose landing gear built to withstand 3g impacts through focused structural modeling.",
    externalLink: "solid-mechanics.html",
    fileSize: "450 MB"
  }
};

/** Hardware Log ticker items */
const HW_ITEMS = [
  { type: "Avionics",   title: "VTOL Airframe Integration",        sub: "Frame Assembly · Power Layout · Bench Prep",         src: "images/hw_vtol_assembly.jpg",   date: "2026-02", status: "verified",  link: "washu-vtol.html" },
  { type: "Structural", title: "DBF Wing Layup",                   sub: "NACA 4415 · Carbon Spar",                            src: "images/hw_dbf_wing.jpg",        date: "2025-11", status: "verified",  link: "washu-dbf.html" },
  { type: "Firmware",   title: "EKF Navigation Board",             sub: "Teensy 4.1 · IMU · GPS",                             src: "images/hw_ekf_board.jpg",       date: "2025-10", status: "validated", link: "ekf-nav.html" },
  { type: "Vision",     title: "Sentinel CV Rig",                  sub: "OpenCV · Kalman Tracker",                            src: "images/hw_sentinel_rig.jpg",    date: "2025-12", status: "verified",  link: "sentinel.html" },
  { type: "Research",   title: "MIRO Wearable Sensor",             sub: "IMU Array · EMG Electrodes",                         src: "images/hw_miro_wearable.jpg",   date: "2025-08", status: "validated", link: "miro-lab.html" },
  { type: "Simulation", title: "Hyperion Test Loop",               sub: "6-DOF · 10 kHz · C++20",                            src: "images/hw_hyperion_sim.jpg",    date: "2025-12", status: "verified",  link: "hyperion.html" },
  { type: "CFD",        title: "Wing Section CFD",                 sub: "ANSYS CFX · Cp Distribution",                       src: "images/hw_cfd_result.jpg",      date: "2025-11", status: "validated", link: "washu-dbf.html" },
  { type: "Embedded",   title: "Flight Electronics Debug Bench",   sub: "Controller Bring-Up · Wiring Validation · Multimeter Test", src: "images/hw_vtol_test_bench.jpg", date: "2026-01", status: "verified",  link: "washu-vtol.html" }
];

/** Skill detail content indexed by pill key */
const SKILL_DATA = {
  cpp:       { title: "C++",              body: "Used for performance-critical engineering projects: flight simulators, EKF state estimators, and embedded sensor platforms. Working knowledge with growing experience in real-time systems.",      used: "Used in: Hyperion 6-DOF, Sentinel, EKF Nav" },
  python:    { title: "Python",           body: "Primary language for data analysis, sensor-fusion scripting, and rapid prototyping. Used for post-flight log processing and research data pipelines.",                                            used: "Used in: MIRO Lab, GNC tooling, data analysis" },
  matlab:    { title: "MATLAB",           body: "Mathematical modeling, control-loop design, and simulation scripting. Used alongside Simulink to build and validate plant models.",                                                               used: "Used in: Control Systems coursework, DBF analysis" },
  simulink:  { title: "Simulink",         body: "Block-diagram modeling of dynamic systems. Built adaptive cruise control PID loops and explored VTOL attitude controller response before HIL validation.",                                       used: "Used in: Adaptive Cruise Control, VTOL controls" },
  js:        { title: "JavaScript",       body: "Browser-based simulations and interactive engineering tools. Built WebTunnel CFD as a personal project to explore fluid flow visualization.",                                                    used: "Used in: WebTunnel CFD, GNC Lander Sim" },
  teensy:    { title: "Teensy 4.0 / 4.1", body: "Primary embedded platform for sensor fusion work at MIRO Lab and personal navigation projects. Handled synchronized IMU and EMG data acquisition at 1 kHz for robotics experiments.",         used: "Used in: MIRO Lab sensor platform, EKF Nav" },
  stm32:     { title: "STM32",            body: "Exposure to STM32 series through VTOL avionics work. Familiar with basic peripheral configuration and interrupt-driven sensor polling.",                                                        used: "Used in: VTOL flight control stack" },
  pixhawk:   { title: "Pixhawk 6C",       body: "Flight management unit for WashU VTOL. Responsible for full integration: ESC wiring, power distribution, GPS antenna placement, and PX4 parameter tuning for stable hover.",                  used: "Used in: WashU VTOL" },
  px4:       { title: "PX4 Autopilot",    body: "Open-source flight stack running on Pixhawk 6C. Tuned attitude controllers, configured HIL simulation, and worked through telemetry and sensor integration issues.",                           used: "Used in: WashU VTOL" },
  protocols: { title: "I2C · SPI · UART", body: "Embedded communication protocols used across sensor integration work. Experience debugging signal issues and configuring peripherals for IMU and GPS communication.",                           used: "Used in: All embedded projects" },
  solidworks:{ title: "SolidWorks",       body: "Primary CAD platform for mechanical design. Experience with part modeling, assemblies, and basic tolerance considerations. Used on DBF payload mechanisms and foosball table design.",           used: "Used in: Foosball CAD, DBF payload design" },
  ansys:     { title: "ANSYS FEA",        body: "Structural analysis for flight hardware. Performed static analysis on wing spar geometry to verify load capacity under expected flight loading conditions.",                                    used: "Used in: DBF structural analysis" },
  cfx:       { title: "ANSYS CFX",        body: "CFD solver used to explore airfoil flow behavior and cross-validate XFLR5 results on DBF wing sections.",                                                                                      used: "Used in: WashU DBF, wing section analysis" },
  xflr5:     { title: "XFLR5",            body: "Panel-method aerodynamics tool for wing analysis. Generated lift and drag polars across flight conditions to support configuration selection on DBF aircraft.",                                used: "Used in: WashU DBF aerodynamics" },
  opencv:    { title: "OpenCV",           body: "Computer vision library used in the Sentinel prototype for object tracking and contour detection feeding a state estimator.",                                                                   used: "Used in: Sentinel prototype" },
  ekf:       { title: "EKF / UKF",        body: "Extended Kalman Filter for nonlinear state estimation. Implemented a navigation EKF fusing IMU, GPS, and barometer data as a personal project to understand sensor fusion in practice.",      used: "Used in: EKF Nav, MIRO Lab support" },
  pid:       { title: "PID Control",      body: "Classical feedback control design and tuning. Applied to VTOL attitude loops, adaptive cruise longitudinal control, and GNC lander simulation.",                                               used: "Used in: VTOL, Cruise Control, GNC Sim" },
  hil:       { title: "HIL Testing",      body: "Hardware-in-Loop validation using Gazebo and PX4 SITL for WashU VTOL. Enabled autopilot parameter tuning and failure-mode testing before physical flight.",                                   used: "Used in: WashU VTOL" },
  sixdof:    { title: "6-DOF Dynamics",   body: "Rigid-body equations of motion implemented in the Hyperion orbital physics simulator as a personal project to study spacecraft dynamics and numerical integration.",                           used: "Used in: Hyperion Engine" },
  fusion:    { title: "Sensor Fusion",    body: "Multi-sensor data integration combining IMU, GPS, EMG, and camera data. Experience building pipelines that handle noisy, asynchronous sensor streams.",                                       used: "Used in: EKF Nav, MIRO Lab, VTOL" },
  dfm:       { title: "DFM",              body: "Design for Manufacturability considerations applied during DBF wing design and foosball table fabrication — tolerances, material constraints, and assembly fit.",                              used: "Used in: DBF, Foosball CAD" }
};

/** Coursework terminal rows */
const COURSEWORK = {
  active: [
    { pid: "4320", name: "Modeling_Simulation_Control", status: "RUNNING" },
    { pid: "3430", name: "Thermal_Systems_Design",       status: "RUNNING" },
    { pid: "3420", name: "Heat_Transfer",                status: "RUNNING" },
    { pid: "3110", name: "Machine_Elements",             status: "RUNNING" },
    { pid: "3050", name: "Fluids_Heat_Lab",              status: "RUNNING" }
  ],
  fall2026: [
    { pid: "5707", name: "Flight_Dynamics",           status: "QUEUED" },
    { pid: "4050", name: "Vibrations_Lab",            status: "QUEUED" },
    { pid: "4110", name: "Mechanical_Design_Project", status: "QUEUED" },
    { pid: "4410", name: "Control_Systems",           status: "QUEUED" },
    { pid: "5412", name: "Computational_Fluid_Dynamics", status: "QUEUED" }
  ],
  history: [
    { pid: "4310", name: "Vibrations",    status: "COMPLETE" },
    { pid: "3400", name: "Thermodynamics", status: "COMPLETE" },
    { pid: "3410", name: "Fluid_Mechanics", status: "COMPLETE" },
    { pid: "3530", name: "Solid_Mechanics", status: "COMPLETE" },
    { pid: "3280", name: "Prob_&_Stats",   status: "COMPLETE" }
  ]
};

/* =============================================================================
   2. HARDWARE LOG TICKER
============================================================================= */
function renderHW() {
  const track = document.getElementById("hwtrack");
  // Duplicate items for seamless infinite scroll
  const allItems = [...HW_ITEMS, ...HW_ITEMS];

  track.innerHTML = allItems.map(card => {
    const typeClass = `hw-img-${String(card.type || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const cfdClass  = card.src.includes("hw_cfd_result") ? " hw-img-cfd" : "";

    return `
      <a href="${card.link}" class="hw-card">
        <img src="${card.src}" alt="${card.title}" loading="lazy" class="${typeClass}${cfdClass}">
        <div class="hw-meta">
          <span class="hw-chip">${card.date || "N/A"}</span>
          <span class="hw-chip status-ok">${card.status || "logged"}</span>
        </div>
        <div class="hw-overlay">
          <div class="hw-type"><span class="hw-dot"></span>${card.type}</div>
          <div class="hw-bottom">
            <div class="hw-title">${card.title}</div>
            <div class="hw-sub">${card.sub}</div>
            <div class="hw-link">View <i class="fas fa-arrow-right" style="font-size:7px;margin-left:3px"></i></div>
          </div>
        </div>
        <div class="hw-label-always">${card.title}</div>
      </a>`;
  }).join("");
}

/* =============================================================================
   3. FEATURED SECTION
============================================================================= */
function renderFeatured() {
  const container = document.getElementById("featured-container");
  let html = "";
  let idx  = 0;

  for (const [id, p] of Object.entries(PROJECTS)) {
    if (p.category !== "featured") continue;

    const isEven  = idx % 2 === 0;
    const rowDir  = isEven ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse";
    const textAlign = isEven ? "items-start" : "items-start md:items-end";
    const action  = p.externalLink
      ? `window.location.href='${p.externalLink}'`
      : `openProjectDetail('${id}')`;

    html += `
      <div id="${id}" onclick="${action}"
           class="flex ${rowDir} gap-12 items-center group cursor-pointer scroll-mt-32">

        <!-- Image panel -->
        <div class="w-full md:w-1/2 feat-img-wrap relative border border-white/10 bg-[#0a0a0a] overflow-hidden">
          <img src="${p.logoUrl}" loading="lazy"
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100">
          <div class="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none"></div>
          <div class="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/30"></div>
          <div class="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/30"></div>
          <div class="absolute bottom-0 left-0 px-3 py-1.5 bg-black/70 border-r border-t border-white/10 text-[9px] font-mono text-gray-500 tracking-widest uppercase">
            ${p.dates}
          </div>
        </div>

        <!-- Text panel -->
        <div class="w-full md:w-1/2 flex flex-col ${textAlign}">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border-l-2 border-blue-500 mb-4 role-badge">
            <i class="fas fa-id-badge text-blue-400 text-[10px]"></i>
            <span class="font-mono font-bold text-blue-400 text-xs tracking-wider uppercase">${p.role}</span>
          </div>
          <h3 class="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors tracking-tight">${p.title}</h3>
          <div class="mb-4 font-mono text-[10px] text-emerald-500 tracking-widest border border-emerald-500/20 bg-emerald-500/5 px-2 py-1 inline-block">
            ${p.metric}
          </div>
          <p class="text-gray-400 leading-relaxed mb-5 max-w-xl">${p.summary}</p>

          <!-- 2×2 proof grid -->
          <div class="proof-grid mb-5">
            <div class="proof-card"><div class="proof-k">Problem</div>    <div class="proof-v">${p.problem      || "Mission objective requiring robust engineering execution."}</div></div>
            <div class="proof-card"><div class="proof-k">Ownership</div>  <div class="proof-v">${p.contribution || p.role}</div></div>
            <div class="proof-card"><div class="proof-k">Stack</div>      <div class="proof-v">${p.tags.join(" · ")}</div></div>
            <div class="proof-card"><div class="proof-k">Result</div>     <div class="proof-v">${p.result       || p.metric}</div></div>
          </div>

          <div class="mt-6 text-[10px] font-mono text-white flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">
            <span>Initialize Protocol</span> <i class="fas fa-arrow-right text-blue-400"></i>
          </div>
        </div>
      </div>`;

    idx++;
  }

  container.innerHTML = html;
}

/* =============================================================================
   4. ARCHIVE TABS
============================================================================= */
function switchTab(tabName) {
  const grid    = document.getElementById("archive-grid");
  const tabPersonal    = document.getElementById("tab-personal");
  const tabCoursework  = document.getElementById("tab-coursework");

  const activeClass   = "pb-4 text-xs font-mono uppercase tracking-widest border-b-2 text-white transition-all hover:text-blue-400";
  const inactiveClass = "pb-4 text-xs font-mono uppercase tracking-widest border-b-2 border-transparent text-gray-500 hover:text-white hover:border-white/20 transition-all";

  // Determine active border color per tab
  tabPersonal.className   = tabName === "personal"
    ? `${activeClass} border-blue-500`
    : inactiveClass;
  tabCoursework.className = tabName === "coursework"
    ? `${activeClass} border-emerald-500`
    : inactiveClass;

  grid.innerHTML = "";

  for (const [id, p] of Object.entries(PROJECTS)) {
    if (p.category !== tabName) continue;

    const action = p.externalLink
      ? `window.location.href='${p.externalLink}'`
      : `openProjectDetail('${id}')`;

    const tagsHtml = p.tags.slice(0, 3)
      .map(t => `<span class="text-[9px] bg-white/5 border border-white/5 px-2 py-1 text-gray-500 font-mono uppercase tracking-wider">${t}</span>`)
      .join("");

    grid.innerHTML += `
      <div onclick="${action}"
           class="group relative bg-[#0a0a0a] border border-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full">
        <div class="corner-bracket tl"></div>
        <div class="corner-bracket tr"></div>
        <div class="corner-bracket bl"></div>
        <div class="corner-bracket br"></div>

        <!-- Card header bar -->
        <div class="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/10">
          <span class="font-mono text-[9px] text-gray-500 uppercase tracking-widest">FILE: ${id.split("-")[0].toUpperCase()}</span>
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-mono text-gray-600 group-hover:text-blue-400 transition-colors">${p.fileSize || "1.0 MB"}</span>
            <span class="w-1.5 h-1.5 bg-gray-700 group-hover:bg-blue-500 rounded-full transition-colors"></span>
          </div>
        </div>

        <!-- Thumbnail -->
        <div class="h-48 w-full bg-[#0a0a0a] relative overflow-hidden border-b border-white/5">
          <img src="${p.logoUrl}" loading="lazy"
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100">
          <!-- Scan sweep on hover -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none z-20"></div>
        </div>

        <!-- Card body -->
        <div class="p-6 flex flex-col flex-grow bg-[#0a0a0a]">
          <h4 class="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors tracking-tight">${p.title}</h4>
          <p class="text-[10px] font-mono text-blue-400 mb-4 uppercase tracking-wider font-bold">${p.role}</p>
          <p class="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-grow border-l border-white/10 pl-3">${p.summary}</p>
          <div class="flex flex-wrap gap-2 mt-auto">${tagsHtml}</div>
        </div>
      </div>`;
  }
}

/* =============================================================================
   5. SKILL DETAIL PILLS
============================================================================= */
let activeSkillEl = null;

/** Toggle the skill detail card when a pill is clicked.
 *  @param {HTMLElement} el  - the clicked pill element
 *  @param {string}      key - key into SKILL_DATA
 */
function showSkill(el, key) {
  const panel = document.getElementById("skill-detail");

  // Toggle off when clicking the already-active pill
  if (activeSkillEl === el) {
    el.classList.remove("active");
    activeSkillEl = null;
    panel.className = "skill-hidden border border-blue-500/30 bg-blue-500/5 p-4 font-mono text-xs text-gray-300 relative transition-all duration-300 overflow-hidden";
    return;
  }

  // Deactivate previous pill
  if (activeSkillEl) activeSkillEl.classList.remove("active");
  el.classList.add("active");
  activeSkillEl = el;

  const data = SKILL_DATA[key];
  if (!data) return;

  document.getElementById("sd-title").textContent = data.title;
  document.getElementById("sd-body").textContent  = data.body;
  document.getElementById("sd-used").textContent  = data.used;

  panel.className = "skill-visible border border-blue-500/30 bg-blue-500/5 p-4 font-mono text-xs text-gray-300 relative transition-all duration-300 overflow-hidden";
}

/* =============================================================================
   6. COURSEWORK TERMINAL
============================================================================= */
function switchCoursework(view) {
  const btnActive   = document.getElementById("btn-active");
  const btnFall2026 = document.getElementById("btn-fall2026");
  const btnHistory  = document.getElementById("btn-history");
  const list        = document.getElementById("coursework-list");

  const active   = "tab-active px-2 py-1 uppercase tracking-wider transition-colors";
  const inactive = "tab-inactive px-2 py-1 uppercase tracking-wider transition-colors";

  btnActive.className   = view === "active"   ? active : inactive;
  btnFall2026.className = view === "fall2026" ? active : inactive;
  btnHistory.className  = view === "history"  ? active : inactive;

  const rows = COURSEWORK[view] || COURSEWORK.active;

  list.innerHTML = rows.map(r => {
    // PID column color
    const pidColor = view === "active"
      ? "text-blue-500"
      : view === "fall2026"
        ? "text-amber-500"
        : "text-gray-700";

    // Status color
    const statusColor = r.status === "RUNNING"
      ? "text-emerald-500"
      : r.status === "QUEUED"
        ? "text-amber-500"
        : "text-gray-500";

    const rowTextColor = view === "history" ? "text-gray-600" : "text-gray-400";

    return `
      <div class="grid grid-cols-4 gap-4 text-sm font-mono py-3 border-b border-white/5 items-center ${rowTextColor}">
        <span class="${pidColor}">${r.pid}</span>
        <span class="col-span-2">${r.name}</span>
        <span class="${statusColor}">${r.status}</span>
      </div>`;
  }).join("");
}

/* =============================================================================
   7. ANOMALIES — Scroll controls & mouse-drag
============================================================================= */
function scrollAnomalies(direction) {
  document.getElementById("anomalies-scroll").scrollBy({ left: direction * 430, behavior: "smooth" });
}

function initAnomaliesDrag() {
  const el = document.getElementById("anomalies-scroll");
  if (!el) return;

  let isDragging = false;
  let startX, scrollLeft;

  el.addEventListener("mousedown", e => {
    isDragging = true;
    startX     = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
    el.style.cursor = "grabbing";
  });
  el.addEventListener("mouseleave", () => { isDragging = false; el.style.cursor = "grab"; });
  el.addEventListener("mouseup",    () => { isDragging = false; el.style.cursor = "grab"; });
  el.addEventListener("mousemove",  e => {
    if (!isDragging) return;
    e.preventDefault();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
  });
}

/* =============================================================================
   8. ENGINEERING SKILLS RADAR
============================================================================= */
function initRadar() {
  const ctx    = document.getElementById("skillsChart").getContext("2d");
  const isMob  = window.innerWidth < 768;

  new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "Dynamics & Vibrations",
        "Controls & Automation",
        "Modeling & Simulation",
        "Aero / Thermal-Fluids",
        "Mechanical Design",
        "Embedded / Test Systems"
      ],
      datasets: [{
        label: "Competency",
        data: [80, 70, 75, 75, 75, 70],
        backgroundColor:   "rgba(59,130,246,.1)",
        borderColor:       "#3b82f6",
        borderWidth:       2,
        pointBackgroundColor: "#000",
        pointBorderColor:     "#3b82f6",
        pointBorderWidth:     2,
        pointRadius:          5,
        pointHoverRadius:     7,
        pointStyle:           "crossRot"
      }]
    },
    options: {
      layout: { padding: 30 },
      scales: {
        r: {
          min: 0, max: 100,
          angleLines: { color: "rgba(255,255,255,.1)" },
          grid:       { color: "rgba(255,255,255,.05)" },
          pointLabels: {
            color: "#94a3b8",
            font: { size: isMob ? 9 : 11, family: "'JetBrains Mono'", weight: "bold" },
            padding: 10
          },
          ticks: { display: false, stepSize: 25, backdropColor: "transparent" }
        }
      },
      plugins: { legend: { display: false } },
      maintainAspectRatio: false
    }
  });
}

/* =============================================================================
   9. MISSION PANEL — Internship section accordion
============================================================================= */
function toggleInternshipMission() {
  const section = document.getElementById("internship-mission-details");
  const isOpen  = section.style.maxHeight && section.style.maxHeight !== "0px";
  section.style.maxHeight = isOpen ? "0px" : section.scrollHeight + "px";
}

/* =============================================================================
  10. UTILITIES
============================================================================= */

/** Show the toast notification with a given message, auto-hides after 3 s */
function showToast(message) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-message").innerText = message;
  toast.className = "show";
  setTimeout(() => { toast.className = ""; }, 3000);
}

/** Copy the contact email to clipboard and display a toast */
function copyEmail() {
  navigator.clipboard.writeText("e.garciarivera@wustl.edu");
  showToast("EMAIL_COPIED // e.garciarivera@wustl.edu");
}

/** Trigger identity-scan animation on the profile picture */
function triggerScan() {
  const pfp = document.getElementById("pfp-container");
  pfp.classList.add("animate-identity");
  showToast("IDENTITY_VERIFIED // ACCESS_GRANTED");
  setTimeout(() => pfp.classList.remove("animate-identity"), 2500);
}

/** Close a modal by id */
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

/** Scroll-progress bar */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + "%";
  }, { passive: true });
}

/* =============================================================================
  11. LIVE FOOTER METRICS
============================================================================= */
function initFooterMetrics() {
  // Uptime counter
  const start = Date.now();
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
    const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
    const s = String(elapsed % 60).padStart(2, "0");
    document.getElementById("uptime-counter").innerText = `T+ ${h}:${m}:${s}`;
  }, 1000);

  // Randomised load / memory bars
  function updateBars() {
    document.getElementById("sys-load-bar").style.width  = (30 + Math.random() * 40) + "%";
    document.getElementById("mem-usage-bar").style.width = (50 + Math.random() * 30) + "%";
  }
  updateBars();
  setInterval(updateBars, 2000);
}

/** Live clock sync label in the mission panel */
function initSyncClock() {
  function tick() {
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, "0");
    const mm  = String(now.getMinutes()).padStart(2, "0");
    const el  = document.getElementById("sync-counter");
    if (el) el.innerText = `SYNCED: ${hh}:${mm}`;
  }
  tick();
  setInterval(tick, 60_000);
}

/* =============================================================================
  12. INIT — runs after DOM is ready
============================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderHW();
  renderFeatured();
  switchTab("personal");
  switchCoursework("active");
  initRadar();
  initAnomaliesDrag();
  initScrollProgress();
  initFooterMetrics();
  initSyncClock();
});