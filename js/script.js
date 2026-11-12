/* =============================================================================
   ENRIQUE GARCIA | Main Site Script
   Sections:
     1. Data | projects, hw items, skill descriptions, coursework
     2. Work Log Ticker
     3. Featured Section
     4. Archive Tabs
     5. Skill Detail Pills
     6. Coursework Terminal
     7. Engineering Skills Radar
     8. Mission Panel
     9. Utilities | toast, email copy, profile scan, scroll progress
    10. Live Footer Metrics
    11. Navigation | mobile menu + active section
    12. Init
============================================================================= */

/* =============================================================================
   1. DATA
============================================================================= */

/** @type {Object.<string, Object>} */
const PROJECTS = {
  "mide": {
    title: "Missouri Institute for Defense and Energy",
    category: "featured",
    status: "complete",
    logoUrl: "assets/images/mide.png",
    photo: true,
    imgPos: "left center",
    role: "UAS Research Intern",
    roleIcon: "fa-helicopter",
    dates: "May 2026 – Aug 2026",
    tags: ["UAS Systems", "Flight Test", "Hardware Integration"],
    summary: "Worked experimental unmanned aircraft as systems: returning vehicles to test-ready after structural work, supporting flight test, and using flight data to relate configuration to readiness. Brought platforms up through calibration and bench checks and verified that sensing, estimation, and actuation hung together on the vehicle.",
    metric: "Status: Complete | Test-Readiness & Integration",
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
    status: "active",
    logoUrl: "assets/images/vtol.png",
    photo: true,
    role: "Lead Avionics Engineer",
    roleIcon: "fa-microchip",
    dates: "Sep 2025 – Present",
    tags: ["Pixhawk 6C", "PX4", "Quadcopter", "Hexacopter"],
    summary: "Lead Avionics across two VFS cycles: Hexacopter flight proof in 2025–2026, now rebuilding a Quadcopter X-frame for Search and Rescue.",
    metric: "Status: Active | Search and Rescue 2026–27",
    problem: "Competition aircraft must keep sensing, power, flight control, and payload interfaces honest under flight-test and mission pressure.",
    contribution: "Owned avionics architecture and bring-up; closed Hexacopter hover/transition/payload ops; driving 2026–27 Quadcopter system architecture for Search and Rescue.",
    result: "Validated Hexacopter milestones with FTR evidence; active rebuild for the harder Search and Rescue fly-off cycle.",
    constraint: "Hard weight, lost-link, and payload rules with noisy embedded buses under mixed power loads",
    tradeoff: "Rapid feature tuning vs robust pre-flight validation under competition timelines",
    decision: "HIL-first gates before flight; architecture owned end-to-end before claiming mission readiness",
    outcome: "Lead Avionics on WashU VTOL: Hexacopter cycle closed, Quadcopter Search and Rescue cycle in build",
    proof: ["Hexacopter hover + VTOL transition + payload ops", "2026–27 Quadcopter system architecture", "I2C noise fault resolved (VTOL-01)"],
    externalLink: "washu-vtol.html"
  },
  "washu-dbf": {
    title: "WashU Design/Build/Fly",
    category: "featured",
    status: "active",
    logoUrl: "assets/images/dbf.png",
    photo: true,
    role: "Structures and Test Engineer",
    roleIcon: "fa-compass-drafting",
    dates: "Aug 2024 – Present",
    tags: ["ANSYS FEA", "Flight Test", "Composites"],
    summary: "Structures and Test on WashU’s AIAA Design/Build/Fly team, supporting Mission 3 and ground-mission work, with prior structures, aerodynamics, and payload experience.",
    metric: "Status: Active | Competition Team",
    problem: "Support Mission 3 and ground-mission needs while keeping the aircraft competition-ready.",
    contribution: "Structures and Test support for Mission 3 and ground mission; earlier spar FEA, release hardware, and aero/CFD checks.",
    result: "Active on DBF structures/test and mission support after prior-season groundwork.",
    constraint: "Competition rules, airframe mass/balance, and integration practicality",
    tradeoff: "Mission capability vs weight, complexity, and reliability",
    decision: "Focus current effort on Mission 3 and ground-mission support within Structures and Test",
    outcome: "Active Structures and Test Engineer on WashU DBF",
    proof: ["Mission 3 and ground-mission focus", "Prior spar FEA and release hardware", "Structures/test and flight-test correlation"],
    externalLink: "washu-dbf.html"
  },
  "miro-lab": {
    title: "Multiplatform Interactive Robotics Lab",
    category: "featured",
    status: "complete",
    logoUrl: "assets/images/miro-lab.png",
    role: "Sensor Fusion Research Intern",
    roleIcon: "fa-wave-square",
    dates: "May 2025 – Aug 2025",
    tags: ["Python", "MATLAB", "Sensor Fusion"],
    summary: "Developed a wearable sensor fusion system (IMU + EMG) and visual tracking pipeline.",
    metric: "Status: Complete | Sensor Fusion Research",
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
  "towed-sensor-winch": {
    title: "Towed-Sensor Winch",
    category: "coursework",
    logoUrl: "assets/images/me_winch_bench.jpg",
    photo: true,
    role: "Mechatronics | MEMS 4110",
    dates: "2026 – Present",
    tags: ["Mechatronics", "Embedded", "3D Print"],
    summary: "Motorized winch that deploys a towed sensor on dual steel cables, switches light modes through the tow path, and reels back to dock. Initial prototype tested; final print in progress.",
    externalLink: "towed-sensor-winch.html",
    fileSize: "Active"
  },
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

/** Work Log ticker items (builds, lab work, writing) */
const HW_ITEMS = [
  { type: "Flight Test", title: "MIDE Experimental UAS",           sub: "Repair | Integration | Test-Readiness",             src: "assets/images/mide.png",               date: "2026-08", status: "complete",  link: "mide.html" },
  { type: "Mechatronics", title: "Towed-Sensor Winch Bench",       sub: "MEMS 4110 | Deploy | Retract | Light Modes",        src: "assets/images/me_winch_assembly.jpg",  date: "2026-11", status: "active",    link: "towed-sensor-winch.html" },
  { type: "Avionics",   title: "VTOL Hexacopter Integration",      sub: "Frame Assembly | Power Layout | Bench Prep",         src: "assets/images/hw_vtol_assembly.jpg",   date: "2026-02", status: "verified",  link: "washu-vtol.html" },
  { type: "Structural", title: "DBF Wing Layup",                   sub: "NACA 4415 | Carbon Spar",                            src: "assets/images/hw_dbf_wing.jpg",        date: "2025-11", status: "verified",  link: "washu-dbf.html" },
  { type: "Research",   title: "MIRO Wearable Sensor",             sub: "IMU Array | EMG Electrodes",                         src: "assets/images/hw_miro_wearable.jpg",   date: "2025-08", status: "validated", link: "miro-lab.html" },
  { type: "CFD",        title: "Wing Section CFD",                 sub: "ANSYS CFX | Cp Distribution",                        src: "assets/images/hw_cfd_result.jpg",      date: "2025-11", status: "validated", link: "washu-dbf.html" },
  { type: "Embedded",   title: "Flight Electronics Debug Bench",   sub: "Controller Bring-Up | Wiring Validation | Multimeter Test", src: "assets/images/hw_vtol_test_bench.jpg", date: "2026-01", status: "verified",  link: "washu-vtol.html" },
  {
    type: "Writing",
    title: "Autonomous Weapons Analysis",
    sub: "LAWS | X-62A VISTA | Accountability Gap",
    src: "assets/images/x62_vista.png",
    date: "2026-05",
    status: "published",
    link: "who-is-responsible.html"
  }
];

/** Skill detail content indexed by pill key */
const SKILL_DATA = {
  cpp:       { title: "C++",              body: "Used on performance-oriented personal projects: dynamics sims, estimation, and embedded sensor work. Comfortable reading and extending C++ codebases.", used: "Used in: Hyperion, Sentinel, EKF Nav" },
  python:    { title: "Python",           body: "Data analysis, scripting, and quick tooling. Used for flight-log review, research processing, and MAVLink-related checks.", used: "Used in: MIDE, MIRO Lab, analysis scripts" },
  matlab:    { title: "MATLAB",           body: "Modeling, control design, and data visualization. Used for plant models, EKF calibration, and competition/course analysis.", used: "Used in: Coursework, MIRO Lab, DBF support" },
  simulink:  { title: "Simulink",         body: "Block-diagram modeling of dynamic systems. Used for PID controller studies and early attitude-loop exploration before hardware tests.", used: "Used in: Adaptive Cruise Control, VTOL prep" },
  git:       { title: "Git",              body: "Version control for coursework, research scripts, and portfolio/project repositories. Comfortable with branch workflows and pull requests.", used: "Used in: Portfolio, research, team projects" },
  teensy:    { title: "Teensy / Arduino", body: "Embedded sensing and control boards for lab and personal projects. Used for synchronized IMU/EMG acquisition and microcontroller prototyping.", used: "Used in: MIRO Lab, EKF Nav, prototypes" },
  pixhawk:   { title: "Pixhawk | Cube",   body: "Autopilot hardware used on WashU VTOL (Pixhawk 6C) and MIDE UAS platforms (Cube Black). Experience with bring-up, wiring, and bench checks.", used: "Used in: WashU VTOL, MIDE" },
  autopilot: { title: "PX4 | ArduPilot",  body: "Open-source flight stacks. Tuned/configured PX4 on VTOL and worked with ArduPilot on MIDE platforms for calibration, logging, and flight-test support.", used: "Used in: WashU VTOL, MIDE" },
  mavlink:   { title: "MAVLink",          body: "Vehicle messaging for live attitude/command checks and tooling. Used with Python on Cube/ArduPilot platforms and related telemetry workflows.", used: "Used in: MIDE UAS work" },
  protocols: { title: "I2C | SPI | UART", body: "Common embedded buses for sensors and peripherals. Experience wiring, debugging dropouts, and checking signal integrity on flight hardware.", used: "Used in: VTOL avionics, Teensy projects" },
  solidworks:{ title: "SolidWorks",       body: "Part and assembly CAD for mechanisms and fixtures. Used on DBF hardware and personal mechanical design projects.", used: "Used in: DBF, Foosball CAD" },
  ansys:     { title: "ANSYS",            body: "Structural FEA for flight hardware sizing, with some CFD cross-checks on wing sections alongside XFLR5.", used: "Used in: WashU DBF" },
  xflr5:     { title: "XFLR5",            body: "Panel-method wing/airfoil analysis for lift, drag, and configuration tradeoffs on the DBF aircraft.", used: "Used in: WashU DBF aerodynamics" },
  opencv:    { title: "OpenCV",           body: "Basic computer-vision tooling for tracking/contour work in a personal interception prototype.", used: "Used in: Sentinel prototype" },
  ekf:       { title: "EKF",              body: "Extended Kalman filtering for state estimation. Implemented/practiced IMU-based fusion in personal and lab settings.", used: "Used in: EKF Nav, MIRO Lab" },
  pid:       { title: "PID Control",      body: "Classical feedback tuning for attitude and longitudinal loops in simulation and flight-stack configuration.", used: "Used in: VTOL, Cruise Control, Lander Sim" },
  hil:       { title: "HIL Testing",      body: "Hardware-in-the-loop / SITL-style checks before flight to exercise autopilot setup and catch integration issues early.", used: "Used in: WashU VTOL" },
  fusion:    { title: "Sensor Fusion",    body: "Combining IMU and related sensors for motion estimates. Experience building and checking multi-rate sensing pipelines.", used: "Used in: MIRO Lab, EKF Nav, UAS work" },
  flightlog: { title: "Flight-Log Analysis", body: "Reviewing ArduPilot/PX4 logs and MATLAB/Python plots to connect configuration changes to vehicle behavior.", used: "Used in: MIDE, VTOL, DBF support" },
  gdt:       { title: "GD&T",             body: "Basic ASME Y14.5 drawing practices for manufacturable payload/structure hardware on DBF.", used: "Used in: WashU DBF" }
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
  const count = document.getElementById("hw-count");
  if (count) count.textContent = `${HW_ITEMS.length} entries logged`;
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
    // MIDE/DBF (even): copy docks left. VTOL/MIRO (odd): copy docks right on desktop.
    const copyDock = isEven ? "justify-start" : "justify-start md:justify-end";
    const action  = p.externalLink
      ? `navigateTo('${p.externalLink}')`
      : `openProjectDetail('${id}')`;
    const roleIcon = p.roleIcon || "fa-user-gear";
    html += `
      <div id="${id}" onclick="${action}"
           class="flex ${rowDir} gap-12 items-center group cursor-pointer scroll-mt-32">

        <!-- Image panel -->
        <div class="w-full md:w-1/2 feat-img-wrap relative border border-white/10 bg-[#0a0a0a] overflow-hidden">
          <img src="${p.logoUrl}" loading="lazy"
               ${p.imgPos ? `style="object-position:${p.imgPos};transform-origin:${p.imgPos}"` : ""}
               class="${p.photo ? "eg-photo " : ""}w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100">
          <div class="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none"></div>
          <div class="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/30"></div>
          <div class="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/30"></div>
          <div class="absolute bottom-0 left-0 px-3 py-1.5 bg-black/70 border-r border-t border-white/10 text-[9px] font-mono text-gray-500 tracking-widest uppercase">
            ${p.dates}
          </div>
        </div>

        <!-- Text panel: shared copy stack so CTA always sits under the same edge -->
        <div class="w-full md:w-1/2 flex ${copyDock}">
          <div class="feat-copy flex flex-col items-start w-full max-w-xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border-l-2 border-blue-500 mb-4 role-badge">
              <i class="fas ${roleIcon} text-blue-400 text-[10px]" aria-hidden="true"></i>
              <span class="font-mono font-bold text-blue-400 text-xs tracking-wider uppercase">${p.role}</span>
            </div>
            <h3 class="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors tracking-tight">${p.title}</h3>
            <div class="mb-4 font-mono text-[10px] text-emerald-500 tracking-widest border border-emerald-500/20 bg-emerald-500/5 px-2 py-1 inline-block">
              ${p.metric}
            </div>
            <p class="text-gray-400 leading-relaxed mb-5">${p.summary}</p>

            <!-- 2×2 proof grid -->
            <div class="proof-grid mb-5">
              <div class="proof-card"><div class="proof-k">Problem</div>    <div class="proof-v">${p.problem || ""}</div></div>
              <div class="proof-card"><div class="proof-k">Ownership</div>  <div class="proof-v">${p.contribution || p.role}</div></div>
              <div class="proof-card"><div class="proof-k">Stack</div>      <div class="proof-v">${p.tags.join(" | ")}</div></div>
              <div class="proof-card"><div class="proof-k">Result</div>     <div class="proof-v">${p.result || p.metric}</div></div>
            </div>

            <div class="feat-cta mt-6 text-[10px] font-mono text-white inline-flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">
              <span>Initialize Protocol</span> <i class="fas fa-arrow-right text-blue-400" aria-hidden="true"></i>
            </div>
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
/** Active archive hub | used when saving scroll for Return */
let currentArchiveHub = "personal";

function switchTab(tabName) {
  const grid    = document.getElementById("archive-grid");
  const tabPersonal    = document.getElementById("tab-personal");
  const tabCoursework  = document.getElementById("tab-coursework");
  if (!grid || !tabPersonal || !tabCoursework) return;
  currentArchiveHub = tabName === "coursework" ? "coursework" : "personal";

  const activeClass   = "pb-4 text-xs font-mono uppercase tracking-widest border-b-2 text-white transition-colors hover:text-blue-400";
  const inactiveClass = "pb-4 text-xs font-mono uppercase tracking-widest border-b-2 border-transparent text-gray-500 hover:text-white hover:border-white/20 transition-colors";

  // Determine active border color per tab
  tabPersonal.className   = tabName === "personal"
    ? `${activeClass} border-blue-500`
    : inactiveClass;
  tabCoursework.className = tabName === "coursework"
    ? `${activeClass} border-orange-500`
    : inactiveClass;

  tabPersonal.setAttribute("aria-selected",   String(tabName === "personal"));
  tabCoursework.setAttribute("aria-selected", String(tabName === "coursework"));

  const paint = () => {
  grid.innerHTML = "";

  for (const [id, p] of Object.entries(PROJECTS)) {
    if (p.category !== tabName) continue;

    const action = p.externalLink
      ? `navigateTo('${p.externalLink}')`
      : `openProjectDetail('${id}')`;

    const tagsHtml = p.tags.slice(0, 3)
      .map(t => `<span class="text-[9px] bg-white/5 border border-white/5 px-2 py-1 text-gray-500 font-mono uppercase tracking-wider">${t}</span>`)
      .join("");

    const isCourse = tabName === "coursework";
    const roleColor = isCourse ? "text-orange-400" : "text-blue-400";
    const hoverBorder = isCourse ? "hover:border-orange-500/50" : "hover:border-blue-500/50";
    const hoverTitle = isCourse ? "group-hover:text-orange-400" : "group-hover:text-blue-400";
    const hoverMeta = isCourse ? "group-hover:text-orange-400" : "group-hover:text-blue-400";
    const hoverDot = isCourse ? "group-hover:bg-orange-500" : "group-hover:bg-blue-500";
    const sweep = isCourse ? "via-orange-500/10" : "via-blue-500/10";

    grid.innerHTML += `
      <div onclick="${action}"
           class="group relative bg-[#0a0a0a] border border-white/10 ${hoverBorder} transition-colors duration-300 cursor-pointer overflow-hidden flex flex-col h-full">
        <div class="corner-bracket tl"></div>
        <div class="corner-bracket tr"></div>
        <div class="corner-bracket bl"></div>
        <div class="corner-bracket br"></div>

        <!-- Card header bar -->
        <div class="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/10">
          <span class="font-mono text-[9px] text-gray-500 uppercase tracking-widest">FILE: ${id.split("-")[0].toUpperCase()}</span>
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-mono text-gray-600 ${hoverMeta} transition-colors">${p.fileSize || "1.0 MB"}</span>
            <span class="w-1.5 h-1.5 bg-gray-700 ${hoverDot} rounded-full transition-colors"></span>
          </div>
        </div>

        <!-- Thumbnail -->
        <div class="h-48 w-full bg-[#0a0a0a] relative overflow-hidden border-b border-white/5">
          <img src="${p.logoUrl}" loading="lazy"
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100">
          <!-- Scan sweep on hover -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent ${sweep} to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none z-20"></div>
        </div>

        <!-- Card body -->
        <div class="p-6 flex flex-col flex-grow bg-[#0a0a0a]">
          <h4 class="text-lg font-bold text-white mb-1 ${hoverTitle} transition-colors tracking-tight">${p.title}</h4>
          <p class="text-[10px] font-mono ${roleColor} mb-4 uppercase tracking-wider font-bold">${p.role}</p>
          <p class="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-grow border-l border-white/10 pl-3">${p.summary}</p>
          <div class="flex flex-wrap gap-2 mt-auto">${tagsHtml}</div>
        </div>
      </div>`;
  }
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !grid.childElementCount) {
    paint();
    grid.classList.remove("is-switching");
    return;
  }

  grid.classList.add("is-switching");
  window.setTimeout(() => {
    paint();
    requestAnimationFrame(() => grid.classList.remove("is-switching"));
  }, 160);
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
    requestAnimationFrame(() => { if (typeof syncCapRails === "function") syncCapRails(); });
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
  requestAnimationFrame(() => { if (typeof syncCapRails === "function") syncCapRails(); });
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

  requestAnimationFrame(() => { if (typeof syncCapRails === "function") syncCapRails(); });
}

/* =============================================================================
   7. ENGINEERING SKILLS RADAR
============================================================================= */
/** Lock right rail height to left rail; radar width matches roadmap, height fills leftover. */
function syncCapRails() {
  const left    = document.querySelector("#capabilities .cap-rail-left");
  const right   = document.querySelector("#capabilities .cap-rail-right");
  const panel   = document.getElementById("cap-radar-panel");
  const roadmap = right && right.querySelector(".cap-roadmap");
  if (!left || !right || !panel || !roadmap) return;

  // Mobile: let layout be natural (stacked)
  if (window.innerWidth < 1024) {
    right.style.height = "";
    panel.style.width = "";
    panel.style.height = "";
    return;
  }

  // Clear previous lock so left measures at content height
  right.style.height = "";
  panel.style.width = "100%";
  panel.style.height = "0px";

  const leftH    = Math.ceil(left.getBoundingClientRect().height);
  const roadmapH = Math.ceil(roadmap.getBoundingClientRect().height);
  const gap      = 12;
  const availH   = Math.max(200, leftH - roadmapH - gap);

  right.style.height = leftH + "px";
  // Same width as roadmap (full rail); height fills space above it
  panel.style.width  = "100%";
  panel.style.height = availH + "px";
}

function initRadar() {
  const canvas = document.getElementById("skillsChart");
  const panel  = document.getElementById("cap-radar-panel") || (canvas && canvas.parentElement);
  if (!canvas || !panel) return;
  const ctx   = canvas.getContext("2d");
  const isMob = window.innerWidth < 768;

  const chart = new Chart(ctx, {
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
        data: [75, 70, 72, 70, 72, 70],
        backgroundColor:   "rgba(59,130,246,.1)",
        borderColor:       "#3b82f6",
        borderWidth:       2,
        pointBackgroundColor: "#000",
        pointBorderColor:     "#3b82f6",
        pointBorderWidth:     2,
        pointRadius:          4,
        pointHoverRadius:     6,
        pointStyle:           "crossRot"
      }]
    },
    options: {
      responsive: true,
      layout: { padding: isMob ? 6 : 10 },
      scales: {
        r: {
          min: 0, max: 100,
          angleLines: { color: "rgba(255,255,255,.1)" },
          grid:       { color: "rgba(255,255,255,.05)" },
          pointLabels: {
            color: "#94a3b8",
            font: { size: isMob ? 8 : 10, family: "'JetBrains Mono'", weight: "bold" },
            padding: 4
          },
          ticks: { display: false, stepSize: 25, backdropColor: "transparent" }
        }
      },
      plugins: { legend: { display: false } },
      maintainAspectRatio: false
    }
  });

  const sync = () => {
    syncCapRails();
    chart.resize();
  };

  sync();
  requestAnimationFrame(() => requestAnimationFrame(sync));
  window.addEventListener("load", sync, { once: true });
  window.addEventListener("resize", sync);

  const left = document.querySelector("#capabilities .cap-rail-left");
  if (typeof ResizeObserver !== "undefined") {
    if (left) new ResizeObserver(sync).observe(left);
    new ResizeObserver(() => chart.resize()).observe(panel);
  }
}

/* =============================================================================
   9. MISSION PANEL | internship accordion + smooth jumps to featured cards
============================================================================= */
function initMissionJumps() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".hero-mission-list a.hero-mission-link[href^='#']").forEach(a => {
    a.addEventListener("click", (e) => {
      const id = (a.getAttribute("href") || "").slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      try { history.pushState(null, "", "#" + id); } catch (_) { /* ignore */ }
      el.classList.remove("mission-jump-flash");
      void el.offsetWidth;
      el.classList.add("mission-jump-flash");
      window.setTimeout(() => el.classList.remove("mission-jump-flash"), 1000);
    });
  });
}

/** One-shot fade/slide for major sections as they enter the viewport */
function initSectionReveals() {
  const nodes = document.querySelectorAll(".eg-reveal");
  if (!nodes.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("nav-returning")) {
    nodes.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  nodes.forEach(el => io.observe(el));
}

/** Smooth in-page jumps for nav / CTA hash links */
function initSmoothAnchors() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    if (a.classList.contains("hero-mission-link")) return;
    a.addEventListener("click", (e) => {
      const id = (a.getAttribute("href") || "").slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      try { history.pushState(null, "", "#" + id); } catch (_) { /* ignore */ }
    });
  });
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
  const uptime = document.getElementById("uptime-counter");
  const loadBar = document.getElementById("sys-load-bar");
  const memBar = document.getElementById("mem-usage-bar");
  if (!uptime && !loadBar && !memBar) return;

  if (uptime) {
    const start = Date.now();
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
      const s = String(elapsed % 60).padStart(2, "0");
      uptime.innerText = `T+ ${h}:${m}:${s}`;
    }, 1000);
  }

  if (loadBar || memBar) {
    function updateBars() {
      if (loadBar) loadBar.style.width = (30 + Math.random() * 40) + "%";
      if (memBar) memBar.style.width = (50 + Math.random() * 30) + "%";
    }
    updateBars();
    setInterval(updateBars, 2000);
  }
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
  12. NAVIGATION | mobile menu, active section, cross-page persistence
============================================================================= */
const NAV_SCROLL_KEY  = "eg-portfolio-index-scroll";
const NAV_RETURN_KEY  = "eg-portfolio-returning";
const NAV_HUB_KEY     = "eg-portfolio-hub";
const NAV_SECTION_KEY = "eg-portfolio-return-section";

function toggleMobileNav(force) {
  const panel  = document.getElementById("mobile-nav");
  const button = document.getElementById("mobile-nav-toggle");
  if (!panel || !button) return;

  const open = typeof force === "boolean" ? force : !panel.classList.contains("is-open");
  panel.classList.toggle("is-open", open);
  button.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
}

/** Persist index scroll before leaving for a detail page.
 *  Does NOT set RETURN_KEY | that flag is set only when leaving a subpage
 *  so About/Interests don't treat first arrival as a "return". */
function saveIndexScroll() {
  try {
    sessionStorage.setItem(NAV_SCROLL_KEY, String(window.scrollY));
    // Remember nearest in-page section so Return still lands correctly if scrollY is lost
    const spyY = Math.min(160, Math.round(window.innerHeight * 0.22));
    let sectionId = "featured";
    for (const id of ["featured", "capabilities", "collections"]) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= spyY) sectionId = id;
    }
    sessionStorage.setItem(NAV_SECTION_KEY, sectionId);
    const params = new URLSearchParams(window.location.search);
    const hub = params.get("hub") || currentArchiveHub || "personal";
    sessionStorage.setItem(NAV_HUB_KEY, hub === "coursework" ? "coursework" : "personal");
  } catch (_) { /* private mode */ }
}

/** Soft navigate from index; saves scroll, then fades out */
function navigateTo(url) {
  saveIndexScroll();
  const go = () => { window.location.href = url; };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    go();
    return;
  }
  document.documentElement.classList.add("page-exit");
  setTimeout(go, 160);
}

function initNav() {
  const links = document.querySelectorAll("[data-nav-section]");
  const sections = [
    { id: "featured",     key: "featured" },
    { id: "capabilities", key: "capabilities" },
    { id: "collections",  key: "collections" }
  ];

  let lockKey = null;
  let lockUntil = 0;

  const setActive = (key) => {
    links.forEach(link => {
      const on = key && link.getAttribute("data-nav-section") === key;
      link.classList.toggle("nav-link-active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  /** Sticky-nav offset | last section whose top has crossed this line wins */
  const spyLine = () => Math.min(160, Math.round(window.innerHeight * 0.22));

  const keyForHash = (id) => {
    if (!id) return null;
    const direct = sections.find(s => s.id === id);
    if (direct) return direct.key;
    const featured = document.getElementById("featured");
    const target = document.getElementById(id);
    if (featured && target && featured.contains(target)) return "featured";
    return null;
  };

  const updateActive = () => {
    if (Date.now() < lockUntil && lockKey) {
      setActive(lockKey);
      return;
    }
    lockKey = null;

    if (window.scrollY < 120) {
      setActive(null);
      return;
    }

    const y = spyLine();
    let current = null;
    for (const { id, key } of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= y) current = key;
    }
    setActive(current);
  };

  // Clicking Projects/Skills/Archive (or a featured card anchor) highlights immediately
  // while smooth-scroll runs | avoids the tall Featured section losing to Skills.
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", () => {
      const id = (a.getAttribute("href") || "").slice(1);
      const key = keyForHash(id);
      if (!key) return;
      lockKey = key;
      lockUntil = Date.now() + 900;
      setActive(key);
    });
  });

  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);
  updateActive();

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
}

/** Restore scroll / skip entrance animations after back or Return */
function initScrollRestore() {
  const readReturnState = () => {
    let returning = false;
    let savedY = null;
    let sectionId = null;
    let hub = null;
    try {
      returning = sessionStorage.getItem(NAV_RETURN_KEY) === "1";
      savedY = sessionStorage.getItem(NAV_SCROLL_KEY);
      sectionId = sessionStorage.getItem(NAV_SECTION_KEY);
      hub = sessionStorage.getItem(NAV_HUB_KEY);
    } catch (_) { /* ignore */ }
    return { returning, savedY, sectionId, hub };
  };

  const scrollInstant = (y) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, Math.max(0, y));
  };

  const consumeFlags = () => {
    try {
      sessionStorage.removeItem(NAV_RETURN_KEY);
      sessionStorage.removeItem(NAV_SECTION_KEY);
      sessionStorage.removeItem(NAV_HUB_KEY);
    } catch (_) { /* ignore */ }
  };

  /** After restore settles, re-enable normal scroll-smooth for in-page jumps */
  const releaseReturning = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("nav-returning");
        document.documentElement.classList.add("scroll-smooth");
        document.documentElement.style.scrollBehavior = "";
      });
    });
  };

  const restore = (opts = {}) => {
    const fromBfcache = !!opts.fromBfcache;
    const { returning, savedY, sectionId, hub } = readReturnState();

    document.documentElement.classList.remove("page-exit");
    document.body.style.opacity = "";
    document.body.style.transform = "";

    if (returning) {
      document.documentElement.classList.add("nav-returning");
      document.documentElement.classList.remove("scroll-smooth");
      try { history.scrollRestoration = "manual"; } catch (_) { /* ignore */ }
      if (hub && typeof switchTab === "function") {
        switchTab(hub === "coursework" ? "coursework" : "personal");
      }
    }

    // bfcache already restored scroll | don't fight it unless we have savedY.
    if (fromBfcache && savedY === null) {
      if (returning) {
        consumeFlags();
        releaseReturning();
      }
      return;
    }

    if (returning && savedY !== null) {
      const y = parseInt(savedY, 10);
      if (!Number.isNaN(y)) {
        scrollInstant(y);
        if (window.location.hash) {
          try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (_) { /* ignore */ }
        }
        // Keep SCROLL_KEY until load so late layout (featured/hw render) can re-apply once.
        if (opts.clearScroll) {
          try { sessionStorage.removeItem(NAV_SCROLL_KEY); } catch (_) { /* ignore */ }
          consumeFlags();
          releaseReturning();
        }
        return;
      }
    }

    const targetId = sectionId || (window.location.hash || "").replace(/^#/, "");
    if (returning && targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        scrollInstant(el.getBoundingClientRect().top + window.scrollY - 80);
        try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (_) { /* ignore */ }
      }
      consumeFlags();
      releaseReturning();
      return;
    }

    if (returning) {
      consumeFlags();
      releaseReturning();
    }
  };

  restore();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => restore(), { once: true });
  }
  window.addEventListener("load", () => restore({ clearScroll: true }), { once: true });

  window.addEventListener("pageshow", (e) => {
    document.documentElement.classList.remove("page-exit");
    document.body.style.opacity = "1";
    document.body.style.transform = "none";
    if (e.persisted) document.documentElement.classList.add("nav-returning");
    restore({ fromBfcache: e.persisted, clearScroll: e.persisted });
  });
}

/* =============================================================================
  13. INIT | runs after DOM is ready
============================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let hub = params.get("hub");
  try {
    if (!hub && sessionStorage.getItem(NAV_RETURN_KEY) === "1") {
      hub = sessionStorage.getItem(NAV_HUB_KEY);
    }
  } catch (_) { /* ignore */ }

  // Restore hub before painting archive so Return lands on the same tab
  switchTab(hub === "coursework" ? "coursework" : "personal");
  initScrollRestore();
  renderHW();
  renderFeatured();
  switchCoursework("active");
  initRadar();
  initMissionJumps();
  initSectionReveals();
  initSmoothAnchors();
  initScrollProgress();
  initFooterMetrics();
  initSyncClock();
  initNav();
});