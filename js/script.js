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
     9. Mission Panel — MIDE toggle
    10. Utilities — toast, email copy, profile scan, scroll progress
    11. Live Footer Metrics
    12. Navigation — mobile menu + active section
    13. Init
============================================================================= */

/* =============================================================================
   1. DATA
============================================================================= */

/** @type {Object.<string, Object>} */
const PROJECTS = {
  "mide": {
    title: "Missouri Institute for Defense and Energy",
    category: "featured",
    logoUrl: "assets/images/mide.png",
    role: "UAS Engineering Intern",
    dates: "May 2026 – Aug 2026",
    tags: ["UAS Systems", "Flight Test", "Hardware Integration"],
    summary: "Worked experimental unmanned aircraft as systems: returning vehicles to test-ready after structural work, supporting flight test, and using flight data to relate configuration to readiness. Brought platforms up through calibration and bench checks and verified that sensing, estimation, and actuation hung together on the vehicle.",
    metric: "Focus: Test-Readiness · Systems Integration",
    problem: "Experimental UAS needed to be restored, integrated, and judged flight-ready after structural work and configuration changes, without writing a new controller.",
    contribution: "Supported repair and flight-test operations; used flight data to assess readiness; brought platforms up as integrated systems and checked the sense-to-actuate path on hardware.",
    result: "Helped return aircraft to test-ready status and grounded readiness calls in configuration-linked flight data rather than assumption.",
    constraint: "Multiple experimental platforms with evolving hardware configurations",
    tradeoff: "Breadth across vehicles vs depth on a single controller redesign",
    decision: "Stayed on the systems path (integration, calibration, and readiness) instead of rewriting control laws",
    outcome: "Test-ready platforms with verified sensing-to-actuation paths and clearer readiness criteria from flight data",
    proof: [
      "Supported experimental UAS through repair, flight-test operations, and test-readiness",
      "Used flight data to relate vehicle configuration to whether an aircraft was ready to test",
      "Brought unmanned platforms up as integrated systems and checked the sense-to-actuate path on hardware"
    ],
    externalLink: "mide.html"
  },
  "washu-vtol": {
    title: "WashU VTOL",
    category: "featured",
    logoUrl: "assets/images/vtol.png",
    role: "Avionics & Systems Integration Lead",
    dates: "Sept 2025 - Present",
    tags: ["Pixhawk 6C", "PX4", "HIL Testing"],
    summary: "Architected the avionics and control system for WashU's semi-autonomous VTOL aircraft.",
    metric: "Outcome: Stable Flight",
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
    logoUrl: "assets/images/dbf.png",
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
  "miro-lab": {
    title: "Multiplatform Interactive Robotics Lab",
    category: "featured",
    logoUrl: "assets/images/miro-lab.png",
    role: "Research Intern · Advisor: Dr. Hee-Sup Shin",
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
  "sentinel-cv": {
    title: "Sentinel Computer Vision",
    category: "personal",
    logoUrl: "assets/images/sentinel.png",
    role: "Algorithm Engineer",
    dates: "Winter 2025",
    tags: ["C++", "OpenCV", "Kalman Filter"],
    summary: "Real-time computer vision pipeline for autonomous target tracking and intercept prediction.",
    externalLink: "sentinel.html",
    fileSize: "3.1 MB"
  },
  "ekf-nav": {
    title: "Multi-Sensor Flight Nav",
    category: "personal",
    logoUrl: "assets/images/sensor_fusion.png",
    role: "Independent Dev",
    tags: ["C++", "Embedded", "EKF"],
    summary: "Real-time 12-state Extended Kalman Filter fusing IMU, GPS, and vision data.",
    externalLink: "ekf-nav.html",
    fileSize: "2.4 MB"
  },
  "webtunnel-cfd": {
    title: "WebTunnel CFD",
    category: "personal",
    logoUrl: "assets/images/cfd_v2.png",
    role: "Independent Dev",
    tags: ["JS", "Navier-Stokes", "Physics"],
    summary: "Zero-dependency real-time fluid simulation running in the browser.",
    externalLink: "webtunnel-cfd.html",
    fileSize: "1.8 MB"
  },
  "hyperion-engine": {
    title: "Hyperion 6-DOF",
    category: "personal",
    logoUrl: "assets/images/hyperion.png",
    role: "Systems Architect",
    tags: ["C++20", "Multithreading"],
    summary: "High-frequency (10kHz) rigid body physics engine for flight software validation.",
    externalLink: "hyperion.html",
    fileSize: "14 MB"
  },
  "gnc-sim": {
    title: "Lander Control Sim",
    category: "personal",
    logoUrl: "assets/images/gnc.png",
    role: "Sim Engineer",
    tags: ["Control Theory", "PID"],
    summary: "Interactive rocket landing simulator with real-time PID tuning for thrust and descent control.",
    externalLink: "lander.html",
    fileSize: "3.2 MB"
  },
  "faultline": {
    title: "FAULTLINE",
    category: "personal",
    logoUrl: "assets/images/faultline.png",
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
    logoUrl: "assets/images/foosball.png",
    role: "Mechanical Design",
    tags: ["SolidWorks", "DFM"],
    summary: "Bottom-up CAD design of a playable table with 200+ part assembly.",
    externalLink: "cad-foosball.html",
    fileSize: "128 MB"
  },
  "cruise-control": {
    title: "Adaptive Cruise Control",
    category: "coursework",
    logoUrl: "assets/images/acc.png",
    role: "Control Systems",
    tags: ["MATLAB", "Simulink"],
    summary: "Simulated longitudinal vehicle control using PID loops and radar logic.",
    externalLink: "cruise-control.html",
    fileSize: "8 MB"
  },
  "ambulance-system": {
    title: "RF Priority System",
    category: "coursework",
    logoUrl: "assets/images/amb.png",
    role: "Embedded Systems",
    tags: ["Arduino", "RF Comms"],
    summary: "Wireless traffic preemption system for emergency vehicles.",
    externalLink: "ambulance-system.html",
    fileSize: "150 KB"
  },
  "solid-mechanics": {
    title: "Landing Gear FEA",
    category: "coursework",
    logoUrl: "assets/images/solids.png",
    role: "Solid Mechanics",
    tags: ["ANSYS", "FEA"],
    summary: "Designing a nose landing gear built to withstand 3g impacts through focused structural modeling.",
    externalLink: "solid-mechanics.html",
    fileSize: "450 MB"
  },
  "who-is-responsible": {
    title: "Who Is Responsible When an AI Kills?",
    category: "coursework",
    logoUrl: "assets/images/x62_vista.png",
    role: "Technical Writing & Policy Analysis",
    tags: ["Autonomous Systems", "AI Ethics", "Defense Policy"],
    summary: "A magazine-style technical writing piece examining the accountability gap in autonomous weapons systems, from the X-62A VISTA's live AI dogfight to the absence of binding international law.",
    externalLink: "who-is-responsible.html",
    fileSize: "14 pp."
  }
};

/** Hardware Log ticker items */
const HW_ITEMS = [
  { type: "Flight Test", title: "MIDE Experimental UAS",           sub: "Repair · Integration · Test-Readiness",             src: "assets/images/mide.png",               date: "2026-08", status: "complete",  link: "mide.html" },
  { type: "Avionics",   title: "VTOL Airframe Integration",        sub: "Frame Assembly · Power Layout · Bench Prep",         src: "assets/images/hw_vtol_assembly.jpg",   date: "2026-02", status: "verified",  link: "washu-vtol.html" },
  { type: "Structural", title: "DBF Wing Layup",                   sub: "NACA 4415 · Carbon Spar",                            src: "assets/images/hw_dbf_wing.jpg",        date: "2025-11", status: "verified",  link: "washu-dbf.html" },
  { type: "Firmware",   title: "EKF Navigation Board",             sub: "Teensy 4.1 · IMU · GPS",                             src: "assets/images/hw_ekf_board.jpg",       date: "2025-10", status: "validated", link: "ekf-nav.html" },
  { type: "Vision",     title: "Sentinel CV Rig",                  sub: "OpenCV · Kalman Tracker",                            src: "assets/images/hw_sentinel_rig.jpg",    date: "2025-12", status: "verified",  link: "sentinel.html" },
  { type: "Research",   title: "MIRO Wearable Sensor",             sub: "IMU Array · EMG Electrodes",                         src: "assets/images/hw_miro_wearable.jpg",   date: "2025-08", status: "validated", link: "miro-lab.html" },
  { type: "Simulation", title: "Hyperion Test Loop",               sub: "6-DOF · 10 kHz · C++20",                             src: "assets/images/hw_hyperion_sim.jpg",    date: "2025-12", status: "verified",  link: "hyperion.html" },
  { type: "CFD",        title: "Wing Section CFD",                 sub: "ANSYS CFX · Cp Distribution",                        src: "assets/images/hw_cfd_result.jpg",      date: "2025-11", status: "validated", link: "washu-dbf.html" },
  { type: "Embedded",   title: "Flight Electronics Debug Bench",   sub: "Controller Bring-Up · Wiring Validation · Multimeter Test", src: "assets/images/hw_vtol_test_bench.jpg", date: "2026-01", status: "verified",  link: "washu-vtol.html" },
  {
    type: "Writing",
    title: "Autonomous Weapons Analysis",
    sub: "LAWS · X-62A VISTA · Accountability Gap",
    src: "assets/images/x62_vista.png",
    date: "2026-05",
    status: "published",
    link: "who-is-responsible.html"
  }
];

/** Skill detail content indexed by pill key */
const SKILL_DATA = {
  cpp:       { title: "C++",              body: "Used for performance-critical engineering projects: flight simulators, EKF state estimators, and embedded sensor platforms. Working knowledge with growing experience in real-time systems.",      used: "Used in: Hyperion 6-DOF, Sentinel, EKF Nav" },
  python:    { title: "Python",           body: "Primary language for data analysis, sensor-fusion scripting, and rapid prototyping. Used for post-flight log processing and research data pipelines.",                                            used: "Used in: MIDE flight data, MIRO Lab, analysis tooling" },
  matlab:    { title: "MATLAB",           body: "Mathematical modeling, control-loop design, and simulation scripting. Used alongside Simulink to build and validate plant models.",                                                               used: "Used in: Control Systems coursework, DBF analysis" },
  simulink:  { title: "Simulink",         body: "Block-diagram modeling of dynamic systems. Built adaptive cruise control PID loops and explored VTOL attitude controller response before HIL validation.",                                       used: "Used in: Adaptive Cruise Control, VTOL controls" },
  js:        { title: "JavaScript",       body: "Browser-based simulations and interactive engineering tools. Built WebTunnel CFD as a personal project to explore fluid flow visualization.",                                                     used: "Used in: WebTunnel CFD, Lander Control Sim" },
  teensy:    { title: "Teensy 4.0 / 4.1", body: "Primary embedded platform for sensor fusion work at MIRO Lab and personal navigation projects. Handled synchronized IMU and EMG data acquisition at 1 kHz for robotics experiments.",         used: "Used in: MIRO Lab sensor platform, EKF Nav" },
  stm32:     { title: "STM32",            body: "Exposure to STM32 series through VTOL avionics work. Familiar with basic peripheral configuration and interrupt-driven sensor polling.",                                                        used: "Used in: VTOL flight control stack" },
  pixhawk:   { title: "Pixhawk 6C",       body: "Flight management unit for WashU VTOL. Responsible for full integration: ESC wiring, power distribution, GPS antenna placement, and PX4 parameter tuning for stable hover.",                  used: "Used in: WashU VTOL" },
  px4:       { title: "PX4 Autopilot",    body: "Open-source flight stack running on Pixhawk 6C. Tuned attitude controllers, configured HIL simulation, and worked through telemetry and sensor integration issues.",                            used: "Used in: WashU VTOL" },
  protocols: { title: "I2C · SPI · UART", body: "Embedded communication protocols used across sensor integration work. Experience debugging signal issues and configuring peripherals for IMU and GPS communication.",                           used: "Used in: All embedded projects" },
  solidworks:{ title: "SolidWorks",       body: "Primary CAD platform for mechanical design. Experience with part modeling, assemblies, and basic tolerance considerations. Used on DBF payload mechanisms and foosball table design.",           used: "Used in: Foosball CAD, DBF payload design" },
  ansys:     { title: "ANSYS FEA",        body: "Structural analysis for flight hardware. Performed static analysis on wing spar geometry to verify load capacity under expected flight loading conditions.",                                    used: "Used in: DBF structural analysis" },
  cfx:       { title: "ANSYS CFX",        body: "CFD solver used to explore airfoil flow behavior and cross-validate XFLR5 results on DBF wing sections.",                                                                                       used: "Used in: WashU DBF, wing section analysis" },
  xflr5:     { title: "XFLR5",            body: "Panel-method aerodynamics tool for wing analysis. Generated lift and drag polars across flight conditions to support configuration selection on DBF aircraft.",                               used: "Used in: WashU DBF aerodynamics" },
  opencv:    { title: "OpenCV",           body: "Computer vision library used in the Sentinel prototype for object tracking and contour detection feeding a state estimator.",                                                                   used: "Used in: Sentinel prototype" },
  ekf:       { title: "EKF / UKF",        body: "Extended Kalman Filter for nonlinear state estimation. Implemented a navigation EKF fusing IMU, GPS, and barometer data as a personal project to understand sensor fusion in practice.",      used: "Used in: EKF Nav, MIRO Lab support" },
  pid:       { title: "PID Control",      body: "Classical feedback control design and tuning. Applied to VTOL attitude loops, adaptive cruise longitudinal control, and a lander thrust simulation.",                                               used: "Used in: VTOL, Cruise Control, Lander Sim" },
  hil:       { title: "HIL Testing",      body: "Hardware-in-Loop validation using Gazebo and PX4 SITL for WashU VTOL. Enabled autopilot parameter tuning and failure-mode testing before physical flight.",                                 used: "Used in: WashU VTOL" },
  sixdof:    { title: "6-DOF Dynamics",   body: "Rigid-body equations of motion implemented in the Hyperion orbital physics simulator as a personal project to study spacecraft dynamics and numerical integration.",                          used: "Used in: Hyperion Engine" },
  fusion:    { title: "Sensor Fusion",    body: "Multi-sensor data integration combining IMU, GPS, EMG, and camera data. Experience building pipelines that handle noisy, asynchronous sensor streams.",                                       used: "Used in: EKF Nav, MIRO Lab, VTOL, MIDE" },
  dfm:       { title: "DFM",              body: "Design for Manufacturability considerations applied during DBF wing design and foosball table fabrication: tolerances, material constraints, and assembly fit.",                               used: "Used in: DBF, Foosball CAD" }
};

/** Coursework terminal rows */
const COURSEWORK = {
  active: [
    { pid: "5707", name: "Flight_Dynamics",     status: "RUNNING" },
    { pid: "5708", name: "Aircraft_Design",     status: "RUNNING" },
    { pid: "4050", name: "Vibrations_Lab",      status: "RUNNING" },
    { pid: "4110", name: "ME_Design_Project",      status: "RUNNING" },
    { pid: "4120", name: "Manufacturing_Processes",       status: "RUNNING" },
    { pid: "2020", name: "Earth_Planetary_Science", status: "RUNNING" }
  ],
  history: [
    { type: "header", label: ">_ SPRING 2026" },
    { pid: "4320", name: "Modeling_Simulation_Control", status: "COMPLETE" },
    { pid: "3430", name: "Design_of_Thermal_Systems",      status: "COMPLETE" },
    { pid: "3420", name: "Heat_Transfer",               status: "COMPLETE" },
    { pid: "3110", name: "Machine_Elements",            status: "COMPLETE" },
    { pid: "3050", name: "Fluids_Heat_Lab",             status: "COMPLETE" },
    { pid: "3100", name: "Technical_Writing",           status: "COMPLETE" },
    { type: "header", label: ">_ FALL 2025" },
    { pid: "4310", name: "Vibrations",                  status: "COMPLETE" },
    { pid: "3400", name: "Thermodynamics",              status: "COMPLETE" },
    { pid: "3410", name: "Fluid_Mechanics",             status: "COMPLETE" },
    { pid: "3530", name: "Solid_Mechanics",             status: "COMPLETE" },
    { pid: "3280", name: "Prob_&_Stats",                status: "COMPLETE" }
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
      ? `navigateTo('${p.externalLink}')`
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

  tabPersonal.setAttribute("aria-selected",   String(tabName === "personal"));
  tabCoursework.setAttribute("aria-selected", String(tabName === "coursework"));

  grid.innerHTML = "";

  for (const [id, p] of Object.entries(PROJECTS)) {
    if (p.category !== tabName) continue;

    const action = p.externalLink
      ? `navigateTo('${p.externalLink}')`
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
  const btnActive  = document.getElementById("btn-active");
  const btnHistory = document.getElementById("btn-history");
  const list       = document.getElementById("coursework-list");

  const active   = "tab-active px-2 py-1 uppercase tracking-wider transition-colors";
  const inactive = "tab-inactive px-2 py-1 uppercase tracking-wider transition-colors";

  const setTab = (btn, on) => {
    if (!btn) return;
    btn.className = on ? active : inactive;
    btn.setAttribute("aria-selected", String(on));
  };

  setTab(btnActive,  view === "active");
  setTab(btnHistory, view === "history");

  const rows = COURSEWORK[view] || COURSEWORK.active;

  list.innerHTML = rows.map(r => {
    if (r.type === "header") {
      return `
        <div class="text-[10px] font-mono text-gray-500 mt-4 mb-1 uppercase tracking-widest border-b border-gray-800 pb-1">
          ${r.label}
        </div>`;
    }

    const pidColor = view === "active" ? "text-blue-500" : "text-gray-700";

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
   9. MISSION PANEL — MIDE + internship target accordions
============================================================================= */
function toggleMideMission() {
  const section = document.getElementById("mide-mission-details");
  const trigger = document.getElementById("mide-toggle");
  if (!section) return;

  const isOpen = section.style.maxHeight && section.style.maxHeight !== "0px";
  section.style.maxHeight = isOpen ? "0px" : section.scrollHeight + "px";
  if (trigger) trigger.setAttribute("aria-expanded", String(!isOpen));
}

function toggleInternshipMission() {
  const section = document.getElementById("internship-mission-details");
  const trigger = document.getElementById("internship-toggle");
  if (!section) return;

  const isOpen = section.style.maxHeight && section.style.maxHeight !== "0px";
  section.style.maxHeight = isOpen ? "0px" : section.scrollHeight + "px";
  if (trigger) trigger.setAttribute("aria-expanded", String(!isOpen));
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
  12. NAVIGATION — mobile menu, active section, cross-page persistence
============================================================================= */
const NAV_SCROLL_KEY = "eg-portfolio-index-scroll";
const NAV_RETURN_KEY = "eg-portfolio-returning";
const NAV_HUB_KEY    = "eg-portfolio-hub";

function toggleMobileNav(force) {
  const panel  = document.getElementById("mobile-nav");
  const button = document.getElementById("mobile-nav-toggle");
  if (!panel || !button) return;

  const open = typeof force === "boolean" ? force : !panel.classList.contains("is-open");
  panel.classList.toggle("is-open", open);
  button.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
}

/** Persist index scroll before leaving for a detail page */
function saveIndexScroll() {
  try {
    sessionStorage.setItem(NAV_SCROLL_KEY, String(window.scrollY));
    sessionStorage.setItem(NAV_RETURN_KEY, "1");
    const params = new URLSearchParams(window.location.search);
    const hub = params.get("hub");
    if (hub) sessionStorage.setItem(NAV_HUB_KEY, hub);
  } catch (_) { /* private mode */ }
}

/** Soft navigate with optional View Transition; saves scroll on index */
function navigateTo(url) {
  saveIndexScroll();
  const go = () => { window.location.href = url; };
  if (document.startViewTransition) {
    document.startViewTransition(go);
  } else {
    document.documentElement.classList.add("page-exit");
    setTimeout(go, 180);
  }
}

function initNav() {
  const links = document.querySelectorAll("[data-nav-section]");
  const sections = [
    { id: "featured",     key: "featured" },
    { id: "capabilities", key: "capabilities" },
    { id: "anomalies",    key: "anomalies" },
    { id: "collections",  key: "collections" }
  ];

  const setActive = (key) => {
    links.forEach(link => {
      const on = key && link.getAttribute("data-nav-section") === key;
      link.classList.toggle("nav-link-active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) {
      if (window.scrollY < 200) setActive(null);
      return;
    }
    const match = sections.find(s => s.id === visible[0].target.id);
    if (match) setActive(match.key);
  }, { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] });

  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  document.querySelectorAll("#mobile-nav a").forEach(a => {
    a.addEventListener("click", () => toggleMobileNav(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleMobileNav(false);
  });

  // Outbound same-origin links: save scroll + soft transition
  document.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) return;
    if (a.target === "_blank") return;
    a.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigateTo(a.href);
    });
  });

  if (window.scrollY < 200) setActive(null);
}

/** Restore scroll / skip entrance animations after back or Return */
function initScrollRestore() {
  const hash = window.location.hash;
  let returning = false;
  let savedY = null;

  try {
    returning = sessionStorage.getItem(NAV_RETURN_KEY) === "1";
    savedY = sessionStorage.getItem(NAV_SCROLL_KEY);
    if (returning) {
      sessionStorage.removeItem(NAV_RETURN_KEY);
      document.documentElement.classList.add("nav-returning");
      const hub = sessionStorage.getItem(NAV_HUB_KEY);
      if (hub && typeof switchTab === "function") {
        switchTab(hub === "coursework" ? "coursework" : "personal");
        sessionStorage.removeItem(NAV_HUB_KEY);
      }
    }
  } catch (_) { /* ignore */ }

  const restore = () => {
    document.documentElement.classList.remove("page-exit");
    document.body.style.opacity = "";
    document.body.style.transform = "";

    if (hash && document.querySelector(hash)) {
      // Hash targets (e.g. #miro-lab): let the browser/hash win; skip hero stagger only
      return;
    }
    if (returning && savedY !== null) {
      const y = parseInt(savedY, 10);
      if (!Number.isNaN(y)) {
        window.scrollTo(0, y);
        try { sessionStorage.removeItem(NAV_SCROLL_KEY); } catch (_) { /* ignore */ }
      }
    }
  };

  // Instant restore before paint when possible
  if (returning && !hash) {
    restore();
  }

  window.addEventListener("pageshow", (e) => {
    document.documentElement.classList.remove("page-exit");
    document.body.style.opacity = "1";
    document.body.style.transform = "none";
    if (e.persisted) {
      document.documentElement.classList.add("nav-returning");
    }
    restore();
  });

  // Hash changes (in-page): update active nav without replaying entrances
  window.addEventListener("hashchange", () => {
    document.documentElement.classList.add("nav-returning");
  });
}

/* =============================================================================
  13. INIT — runs after DOM is ready
============================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initScrollRestore();
  renderHW();
  renderFeatured();
  const params = new URLSearchParams(window.location.search);
  const hub = params.get("hub");
  switchTab(hub === "coursework" ? "coursework" : "personal");
  switchCoursework("active");
  initRadar();
  initAnomaliesDrag();
  initScrollProgress();
  initFooterMetrics();
  initSyncClock();
  initNav();
});