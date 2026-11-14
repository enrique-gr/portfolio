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
    roleMark: "assets/images/feat_role_mide.png",
    dates: "May 2026 – Aug 2026",
    tags: ["UAS Research", "Flight Test", "Systems Integration"],
    summary: "Flight-data readiness and systems bring-up on experimental UAS.",
    metric: "Status: Complete | Experimental UAS",
    problem: "Restore and flight-qualify experimental UAS after hardware changes—without rewriting the controller.",
    contribution: "Repair, calibration, and flight-test ops; readiness calls from measured data.",
    result: "Research aircraft returned to test-ready status.",
    constraint: "Multiple experimental research platforms with evolving hardware configurations",
    tradeoff: "Breadth across research vehicles vs depth on a single controller redesign",
    decision: "Stay on the research systems path: integration, calibration, flight data, and readiness judgment",
    outcome: "Hands-on UAS research experience: test-ready platforms, verified sense-to-actuate paths, and data-backed readiness criteria",
    proof: [
      "UAS Research Intern on experimental unmanned platforms at MIDE",
      "Flight-data analysis linking vehicle configuration to test readiness",
      "Systems bring-up from hardware through calibration and sense-to-actuate checks"
    ],
    externalLink: "mide.html"
  },
  "washu-vtol": {
    title: "WashU VTOL",
    category: "featured",
    status: "active",
    logoUrl: "assets/images/vtol.png",
    photo: true,
    role: "Lead Avionics Engineer | Founding Member",
    roleIcon: "fa-microchip",
    roleMark: "assets/images/feat_role_vtol.png",
    dates: "Sep 2025 – Present",
    tags: ["VFS DBVF", "Pixhawk 6C", "PX4", "Quadcopter"],
    summary: "Lead Avionics and founding member. Hexacopter flight proof done; Quadcopter Search and Rescue in build.",
    metric: "Status: Active | VFS DBVF | Search and Rescue 2026–27",
    problem: "Stand up sensing, power, and flight control with no inherited stack.",
    contribution: "End-to-end avionics; Hexacopter hover/transition/payload; Quadcopter architecture.",
    result: "Hexacopter milestones closed; Search and Rescue rebuild underway.",
    constraint: "Hard weight, lost-link, and payload rules with noisy embedded buses under mixed power loads",
    tradeoff: "Rapid feature tuning vs robust pre-flight validation under competition timelines",
    decision: "HIL-first gates before flight; architecture owned end-to-end before claiming mission readiness",
    outcome: "Lead Avionics on WashU VTOL: Hexacopter cycle closed, Quadcopter Search and Rescue cycle in build",
    proof: ["Founding member | VFS DBVF", "Hexacopter hover + VTOL transition + payload ops", "2026–27 Quadcopter system architecture"],
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
    roleMark: "assets/images/feat_role_dbf.png",
    dates: "Aug 2024 – Present",
    tags: ["Structures", "Payload Systems", "Flight Test"],
    summary: "Structures and payload for AIAA DBF and SAE Aero Micro competition UAVs.",
    metric: "Status: Active | AIAA DBF + SAE Aero Micro",
    problem: "Field competition-ready structure and payload under two rule sets.",
    contribution: "Structures/payload design and test; first-iteration test plane flown Oct 2026.",
    result: "Active support across both competition programs.",
    constraint: "Competition rules, airframe mass/balance, and integration practicality",
    tradeoff: "Mission capability vs weight, complexity, and reliability",
    decision: "Keep one structures/payload path that serves both AIAA DBF and SAE Aero Micro airframes",
    outcome: "Structures and Test Engineer across WashU competition UAV programs",
    proof: ["AIAA DBF + SAE Aero Micro", "Oct 2026 first-iteration test plane", "Prior spar FEA and payload-release hardware"],
    externalLink: "washu-dbf.html"
  },
  "miro-lab": {
    title: "Multiplatform Interactive Robotics Lab",
    category: "featured",
    status: "complete",
    logoUrl: "assets/images/miro-lab.png",
    photo: false,
    role: "Sensor Fusion Research Intern",
    roleIcon: "fa-wave-square",
    roleMark: "assets/images/feat_role_miro.png",
    dates: "May 2025 – Aug 2025",
    tags: ["Python", "MATLAB", "Sensor Fusion"],
    summary: "IMU + EMG sensing: calibration, estimation support, and human-subject validation.",
    metric: "Status: Complete | Wearable Sensing",
    problem: "Sync noisy wearable streams with visual tracking for reliable motion data.",
    contribution: "Acquisition and calibration pipelines for multi-sensor estimation.",
    result: "Repeatable motion signatures across research trials.",
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
  /* ---------- Coursework ---------- */
  "towed-sensor-winch": {
    title: "Towed-Sensor Winch",
    category: "coursework",
    logoUrl: "assets/images/me_winch_bench.jpg",
    photo: true,
    role: "Mechatronics",
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
    summary: "Magazine-style technical writing on the accountability gap in autonomous weapons and Collaborative Combat Aircraft (CCA), with a call for engineers in the policy loop. Nominated for the 2026 McKelvey Technical Writing awards.",
    externalLink: "who-is-responsible.html",
    fileSize: "14 pp."
  }
};

/** Work Log ticker items (builds, lab work, writing) */
const HW_ITEMS = [
  { type: "Research",   title: "MIDE UAS Research Internship",     sub: "Experimental UAS | Flight Data | Systems Bring-Up", src: "assets/images/hw_mide_flight.jpg",     date: "2026-08", status: "complete",  link: "mide.html" },
  { type: "Mechatronics", title: "Towed-Sensor Winch Bench",       sub: "MEMS 4110 | Deploy | Retract | Light Modes",        src: "assets/images/me_winch_assembly.jpg",  date: "2026-11", status: "active",    link: "towed-sensor-winch.html" },
  { type: "Avionics",   title: "VTOL Hexacopter Integration",      sub: "Frame Assembly | Power Layout | Bench Prep",         src: "assets/images/hw_vtol_assembly.jpg",   date: "2026-02", status: "verified",  link: "washu-vtol.html" },
  { type: "Research",   title: "MIRO Sensor Fusion Internship",    sub: "IMU + EMG | Calibration | Validation",               src: "assets/images/hw_miro_wearable.jpg",   date: "2025-08", status: "complete",  link: "miro-lab.html" },
  { type: "Flight Test", title: "Competition UAV Test Plane",      sub: "First Iteration | AIAA DBF + SAE Aero Micro",        src: "assets/images/hw_dbf_testplane.jpg",   date: "2026-10", status: "verified",  link: "washu-dbf.html" },
  { type: "Embedded",   title: "Flight Electronics Debug Bench",   sub: "Controller Bring-Up | Wiring Validation | Multimeter Test", src: "assets/images/hw_vtol_test_bench.jpg", date: "2026-01", status: "verified",  link: "washu-vtol.html" },
  {
    type: "Writing",
    title: "Autonomous Weapons Analysis",
    sub: "LAWS | CCA | Nominated: 2026 Technical Writing Awards",
    src: "assets/images/yfq_44a.jpg",
    date: "2026-05",
    status: "nominated",
    link: "who-is-responsible.html"
  }
];

/** Skill detail content indexed by pill key */
const SKILL_DATA = {
  cpp: {
    title: "C++",
    body: "Performance-oriented code for dynamics sims and embedded sensing. Comfortable reading and extending existing C++ stacks, not only greenfield scripts.",
    proof: "Evidence: personal estimation/dynamics prototypes; reading flight-adjacent C++ tooling.",
    used: "Evidence in: personal builds | estimation work"
  },
  python: {
    title: "Python",
    body: "Flight-log review, research processing, and quick MAVLink/telemetry checks. Default tool when the question is “what did the vehicle actually do?”",
    proof: "Evidence: MIDE readiness plots; MIRO acquisition/calibration notebooks.",
    used: "Evidence in: MIDE · MIRO Lab · analysis scripts"
  },
  matlab: {
    title: "MATLAB",
    body: "Plant models, control/estimation studies, and publication-style plots. Used when I need numerical clarity before hardware time.",
    proof: "Evidence: MIRO calibration; coursework modeling; DBF/VTOL support analysis.",
    used: "Evidence in: MIRO Lab · coursework · team analysis"
  },
  simulink: {
    title: "Simulink",
    body: "Block-diagram models for PID and longitudinal/attitude loops before committing config to a flight stack.",
    proof: "Evidence: adaptive cruise / lander sims; early VTOL loop exploration.",
    used: "Evidence in: coursework sims · VTOL prep"
  },
  git: {
    title: "Git",
    body: "Branch workflows for research scripts, team repos, and this portfolio. Treats configuration and analysis as versioned artifacts.",
    proof: "Evidence: shared research tooling; portfolio and competition repos.",
    used: "Evidence in: research · team projects · portfolio"
  },
  teensy: {
    title: "Teensy / Arduino",
    body: "MCU bring-up for synchronized sensing (IMU/EMG) and bench prototypes. Focus on timing, logging, and clean interfaces—not demo blinkies.",
    proof: "Evidence: MIRO multi-sensor acquisition; personal EKF/nav prototypes.",
    used: "Evidence in: MIRO Lab · embedded prototypes"
  },
  pixhawk: {
    title: "Pixhawk | Cube",
    body: "Autopilot hardware bring-up: wiring, power/sense checks, and bench validation on Pixhawk 6C (VTOL) and Cube Black (MIDE).",
    proof: "Evidence: VTOL avionics architecture; MIDE UAS restore/integration.",
    used: "Evidence in: WashU VTOL · MIDE"
  },
  autopilot: {
    title: "PX4 | ArduPilot",
    body: "Parameter/config work, calibration, logging, and pre-flight gates. Comfortable moving between PX4 (VTOL) and ArduPilot (MIDE) workflows.",
    proof: "Evidence: VTOL HIL-first gates; MIDE calibration and flight-test support.",
    used: "Evidence in: WashU VTOL · MIDE"
  },
  mavlink: {
    title: "MAVLink",
    body: "Vehicle messaging for live attitude/command checks and Python tooling against Cube/ArduPilot platforms.",
    proof: "Evidence: MIDE telemetry/attitude checks during integration.",
    used: "Evidence in: MIDE UAS work"
  },
  protocols: {
    title: "I2C | SPI | UART",
    body: "Embedded buses under real power/EMI load. Debug dropouts and keep sense-to-actuate paths honest on flight hardware.",
    proof: "Evidence: VTOL I2C noise fault (VTOL-01); Teensy sensor buses.",
    used: "Evidence in: WashU VTOL · Teensy projects"
  },
  solidworks: {
    title: "SolidWorks",
    body: "Parts/assemblies for structures, payloads, and fixtures with manufacturability in mind—not just pretty CAD.",
    proof: "Evidence: DBF/SAE payload and structure hardware; personal mechanism CAD.",
    used: "Evidence in: WashU DBF · personal CAD"
  },
  ansys: {
    title: "ANSYS",
    body: "Structural FEA for flight hardware sizing; cross-checked aero intuition with panel methods where useful.",
    proof: "Evidence: prior-season spar/structure FEA on WashU DBF.",
    used: "Evidence in: WashU DBF"
  },
  xflr5: {
    title: "XFLR5",
    body: "Panel-method wing/airfoil trades for lift, drag, and configuration decisions on competition aircraft.",
    proof: "Evidence: WashU DBF aerodynamics trades.",
    used: "Evidence in: WashU DBF"
  },
  opencv: {
    title: "OpenCV",
    body: "Basic vision tooling (tracking/contours) for a personal interception prototype—enough to close a sense loop, not a CV research claim.",
    proof: "Evidence: Sentinel-style personal prototype.",
    used: "Evidence in: personal CV prototype"
  },
  ekf: {
    title: "EKF",
    body: "Extended Kalman filtering for IMU-based state estimation. Practiced in lab pipelines and personal nav prototypes.",
    proof: "Evidence: MIRO estimation support; personal EKF nav work.",
    used: "Evidence in: MIRO Lab · personal EKF nav"
  },
  pid: {
    title: "PID Control",
    body: "Classical loop tuning in simulation and flight-stack config—attitude and longitudinal loops with measurable step response.",
    proof: "Evidence: VTOL config; coursework cruise/lander sims.",
    used: "Evidence in: WashU VTOL · coursework sims"
  },
  hil: {
    title: "HIL Testing",
    body: "Hardware-in-the-loop / SITL-style gates before flight to catch integration and parameter mistakes early.",
    proof: "Evidence: VTOL HIL-first policy before hover/transition claims.",
    used: "Evidence in: WashU VTOL"
  },
  fusion: {
    title: "Sensor Fusion",
    body: "Multi-rate IMU (+EMG) pipelines with calibration and sync checks so motion estimates are reproducible across trials.",
    proof: "Evidence: MIRO acquisition/calibration; personal fusion prototypes.",
    used: "Evidence in: MIRO Lab · UAS sensing work"
  },
  flightlog: {
    title: "Flight-Log Analysis",
    body: "PX4/ArduPilot log review in Python/MATLAB to tie configuration changes to measured vehicle behavior and readiness calls.",
    proof: "Evidence: MIDE readiness judgment; VTOL/DBF support plots.",
    used: "Evidence in: MIDE · WashU VTOL · DBF support"
  },
  gdt: {
    title: "GD&T",
    body: "ASME Y14.5 basics for manufacturable payload/structure drawings—tolerances that survive the shop, not just the slide deck.",
    proof: "Evidence: WashU DBF payload/structure drawing practices.",
    used: "Evidence in: WashU DBF"
  }
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
    const roleMark = p.roleMark
      ? `<img src="${p.roleMark}" alt="" class="role-mark" width="38" height="38" loading="lazy" decoding="async">`
      : `<i class="fas ${roleIcon} text-blue-400 text-[10px]" aria-hidden="true"></i>`;
    html += `
      <div id="${id}" class="feat-row flex ${rowDir} gap-10 md:gap-12 items-stretch group scroll-mt-32">

        <!-- Image panel: click target -->
        <button type="button" onclick="${action}" aria-label="Open ${p.title}"
                class="w-full md:w-1/2 feat-img-wrap feat-hit relative border border-white/10 bg-[#0a0a0a] overflow-hidden text-left cursor-pointer">
          <img src="${p.logoUrl}" loading="lazy" alt=""
               ${p.imgPos ? `style="object-position:${p.imgPos};transform-origin:${p.imgPos}"` : ""}
               class="${p.photo ? "eg-photo " : ""}w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] pointer-events-none">
          <div class="feat-fx pointer-events-none" aria-hidden="true">
            <span class="feat-fx__scan"></span>
            <span class="feat-fx__sheen"></span>
            <span class="feat-fx__rim"></span>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>
          <div class="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/30 pointer-events-none z-20"></div>
          <div class="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/30 pointer-events-none z-20"></div>
          <div class="feat-date-chip absolute bottom-0 left-0 px-3 py-1.5 bg-black/70 border-r border-t border-white/10 text-[9px] font-mono text-gray-500 tracking-widest uppercase pointer-events-none z-20">
            ${p.dates}
          </div>
        </button>

        <!-- Text panel: selectable copy; only CTA navigates -->
        <div class="w-full md:w-1/2 flex ${copyDock} items-center">
          <div class="feat-copy flex flex-col items-start justify-center w-full max-w-xl py-1">
            <h3 class="text-2xl font-semibold text-zinc-100 mb-2 group-hover:text-blue-300 transition-colors tracking-tight leading-snug">${p.title}</h3>
            <div class="feat-role mb-3">
              ${roleMark}
              <span class="feat-role__label">${p.role}</span>
            </div>
            <div class="feat-status mb-3">${p.metric}</div>
            <p class="feat-summary mb-4">${p.summary}</p>

            <!-- 2×2 proof grid -->
            <div class="proof-grid mb-2">
              <div class="proof-card"><div class="proof-k">Problem</div>    <div class="proof-v">${p.problem || ""}</div></div>
              <div class="proof-card"><div class="proof-k">Ownership</div>  <div class="proof-v">${p.contribution || p.role}</div></div>
              <div class="proof-card"><div class="proof-k">Stack</div>      <div class="proof-v">${p.tags.join(" | ")}</div></div>
              <div class="proof-card"><div class="proof-k">Result</div>     <div class="proof-v">${p.result || p.metric}</div></div>
            </div>

            <button type="button" onclick="${action}"
                    class="feat-cta mt-5 text-xs font-mono text-white inline-flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest cursor-pointer bg-transparent border-0 p-0">
              <span>Open project</span> <i class="fas fa-arrow-right text-blue-400" aria-hidden="true"></i>
            </button>
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

/** Nearest index section for URL sync + Return restore */
function nearestIndexSection() {
  const spyY = Math.min(160, Math.round(window.innerHeight * 0.22));
  let sectionId = "featured";
  if (window.scrollY < 120) return null; // hero / top
  for (const id of ["featured", "capabilities", "collections"]) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= spyY) sectionId = id;
  }
  return sectionId;
}

/**
 * Keep the index URL honest with what's on screen.
 * Stale ?hub=coursework while viewing Featured made Return/back reopen coursework.
 */
function syncIndexUrlToView() {
  try {
    const url = new URL(window.location.href);
    const section = nearestIndexSection();
    if (section === "collections") {
      url.searchParams.set("hub", currentArchiveHub === "coursework" ? "coursework" : "personal");
    } else {
      url.searchParams.delete("hub");
    }
    url.hash = "";
    const next = url.pathname + url.search;
    const cur  = window.location.pathname + window.location.search;
    if (next !== cur) {
      const prev = (history.state && typeof history.state === "object") ? history.state : {};
      history.replaceState({ ...prev, egIndex: 1, y: window.scrollY || 0 }, "", next);
    }
  } catch (_) { /* ignore */ }
}

function switchTab(tabName) {
  const grid    = document.getElementById("archive-grid");
  const tabPersonal    = document.getElementById("tab-personal");
  const tabCoursework  = document.getElementById("tab-coursework");
  if (!grid || !tabPersonal || !tabCoursework) return;
  currentArchiveHub = tabName === "coursework" ? "coursework" : "personal";
  // Reflect tab in the URL only while Archive is the active view
  try {
    const url = new URL(window.location.href);
    if (nearestIndexSection() === "collections" || url.searchParams.has("hub")) {
      url.searchParams.set("hub", currentArchiveHub);
      url.hash = "";
      const prev = (history.state && typeof history.state === "object") ? history.state : {};
      history.replaceState({ ...prev, egIndex: 1, y: window.scrollY || 0 }, "", url.pathname + url.search);
    }
  } catch (_) { /* ignore */ }

  const activeClass   = "pb-4 text-xs font-mono uppercase tracking-widest border-b-2 text-white transition-colors";
  const inactiveClass = "pb-4 text-xs font-mono uppercase tracking-widest border-b-2 border-transparent text-gray-500 hover:text-white hover:border-white/20 transition-colors";

  // Hub accent borders (CSS tokens — not Tailwind CDN dynamic classes)
  tabPersonal.className   = tabName === "personal"
    ? `${activeClass} archive-tab--personal`
    : inactiveClass;
  tabCoursework.className = tabName === "coursework"
    ? `${activeClass} archive-tab--course`
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
    const hubClass = isCourse ? "archive-card--course" : "archive-card--personal";

    grid.innerHTML += `
      <div class="archive-card ${hubClass} group relative bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col h-full">
        <div class="corner-bracket tl"></div>
        <div class="corner-bracket tr"></div>
        <div class="corner-bracket bl"></div>
        <div class="corner-bracket br"></div>

        <!-- Card header bar -->
        <div class="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/10">
          <span class="font-mono text-[9px] text-gray-500 uppercase tracking-widest">FILE: ${id.split("-")[0].toUpperCase()}</span>
          <div class="flex items-center gap-2">
            <span class="archive-meta text-[9px] font-mono text-gray-600 transition-colors">${p.fileSize || "1.0 MB"}</span>
            <span class="archive-dot w-1.5 h-1.5 bg-gray-700 rounded-full transition-colors"></span>
          </div>
        </div>

        <!-- Thumbnail: click target -->
        <button type="button" onclick="${action}" aria-label="Open ${p.title}"
                class="archive-hit h-48 w-full bg-[#0a0a0a] relative overflow-hidden border-b border-white/5 cursor-pointer p-0 border-0 text-left">
          <img src="${p.logoUrl}" loading="lazy" alt=""
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100 pointer-events-none">
          <div class="archive-sweep absolute inset-0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none z-20"></div>
        </button>

        <!-- Card body: selectable copy -->
        <div class="p-6 flex flex-col flex-grow bg-[#0a0a0a]">
          <h4 class="archive-title text-lg font-bold text-white mb-1 transition-colors tracking-tight">${p.title}</h4>
          <p class="archive-role text-[10px] font-mono mb-4 uppercase tracking-wider font-bold">${p.role}</p>
          <p class="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-grow border-l border-white/10 pl-3">${p.summary}</p>
          <div class="flex flex-wrap items-center justify-between gap-3 mt-auto">
            <div class="flex flex-wrap gap-2">${tagsHtml}</div>
            <button type="button" onclick="${action}"
                    class="archive-cta text-[10px] font-mono uppercase tracking-widest text-white inline-flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-0 p-0 shrink-0">
              Open <i class="fas fa-arrow-right text-[9px]" aria-hidden="true"></i>
            </button>
          </div>
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
  if (!panel) return;

  const detailBase = "cap-skill-detail p-4 font-mono text-xs relative";
  const titleEl = document.getElementById("sd-title");
  const bodyEl  = document.getElementById("sd-body");
  const proofEl = document.getElementById("sd-proof");
  const usedEl  = document.getElementById("sd-used");

  // Toggle off when clicking the already-active pill
  if (activeSkillEl === el) {
    el.classList.remove("active");
    activeSkillEl = null;
    panel.className = `skill-hidden ${detailBase}`;
    return;
  }

  // Deactivate previous pill
  if (activeSkillEl) activeSkillEl.classList.remove("active");
  el.classList.add("active");
  activeSkillEl = el;

  const data = SKILL_DATA[key];
  if (!data) return;

  if (titleEl) titleEl.textContent = data.title;
  if (bodyEl)  bodyEl.textContent  = data.body;
  if (proofEl) proofEl.textContent = data.proof || "";
  if (usedEl)  usedEl.textContent  = data.used || "";

  panel.className = `skill-visible ${detailBase}`;
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

    const pidColor = view === "active" ? "text-blue-500" : "text-gray-500";

    const statusColor = r.status === "RUNNING"
      ? "text-emerald-400"
      : r.status === "QUEUED"
        ? "text-amber-400"
        : "text-gray-400";

    const rowTone = view === "history" ? "cap-cw-row--history" : "cap-cw-row";

    return `
      <div class="grid grid-cols-4 gap-4 text-sm font-mono py-3 border-b border-white/10 items-center ${rowTone}">
        <span class="${pidColor}">${r.pid}</span>
        <span class="col-span-2">${r.name}</span>
        <span class="${statusColor}">${r.status}</span>
      </div>`;
  }).join("");
}

/* =============================================================================
   7. ENGINEERING SKILLS RADAR
============================================================================= */
/** Clear legacy inline size locks. Bottoms align via CSS grid stretch; radar stays square. */
function syncCapRails() {
  const right = document.querySelector("#capabilities .cap-rail-right");
  const panel = document.getElementById("cap-radar-panel");
  if (right) right.style.height = "";
  if (panel) {
    panel.style.width = "";
    panel.style.height = "";
  }
}

function initRadar() {
  const canvas = document.getElementById("skillsChart");
  const panel  = document.getElementById("cap-radar-panel") || (canvas && canvas.parentElement);
  if (!canvas || !panel) return;
  const ctx = canvas.getContext("2d");

  syncCapRails();

  const radarLayout = () => {
    const narrow = window.innerWidth < 768 || panel.clientWidth < 420;
    return {
      padding: narrow
        ? { top: 26, right: 30, bottom: 26, left: 30 }
        : { top: 40, right: 48, bottom: 40, left: 48 },
      labelSize: narrow ? 8 : 10,
      labelPad: narrow ? 8 : 12
    };
  };

  const layout0 = radarLayout();

  const chart = new Chart(ctx, {
    type: "radar",
    data: {
      // Multi-line labels keep long axis names inside the square panel.
      labels: [
        ["Dynamics &", "Vibrations"],
        ["Controls &", "Automation"],
        ["Modeling &", "Simulation"],
        ["Aero /", "Thermal-Fluids"],
        ["Mechanical", "Design"],
        ["Embedded /", "Test Systems"]
      ],
      datasets: [{
        label: "Competency",
        data: [75, 70, 72, 70, 72, 70],
        backgroundColor:   "rgba(107,159,212,.22)",
        borderColor:       "#8eb6e8",
        borderWidth:       2.5,
        pointBackgroundColor: "#050505",
        pointBorderColor:     "#fff",
        pointBorderWidth:     2,
        pointRadius:          4,
        pointHoverRadius:     6,
        pointStyle:           "crossRot"
      }]
    },
    options: {
      responsive: true,
      // Extra canvas inset so point labels are not clipped by the panel edge.
      layout: { padding: layout0.padding },
      scales: {
        r: {
          min: 0, max: 100,
          angleLines: { color: "rgba(255,255,255,.22)" },
          grid:       { color: "rgba(255,255,255,.14)" },
          pointLabels: {
            color: "#f1f5f9",
            font: { size: layout0.labelSize, family: "'JetBrains Mono'", weight: "bold" },
            padding: layout0.labelPad
          },
          ticks: { display: false, stepSize: 25, backdropColor: "transparent" }
        }
      },
      plugins: { legend: { display: false } },
      maintainAspectRatio: false
    }
  });

  const resizeChart = () => {
    const next = radarLayout();
    chart.options.layout.padding = next.padding;
    chart.options.scales.r.pointLabels.font.size = next.labelSize;
    chart.options.scales.r.pointLabels.padding = next.labelPad;
    chart.resize();
    chart.update("none");
  };
  requestAnimationFrame(() => requestAnimationFrame(resizeChart));
  window.addEventListener("load", resizeChart, { once: true });
  window.addEventListener("resize", resizeChart);

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(resizeChart).observe(panel);
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
 *  Does NOT set RETURN_KEY; that flag is set only when leaving a subpage. */
function saveIndexScroll() {
  try {
    // Rewrite history entry first so history.back() doesn't revive a stale ?hub=
    syncIndexUrlToView();

    sessionStorage.setItem(NAV_SCROLL_KEY, String(window.scrollY));
    const sectionId = nearestIndexSection() || "featured";
    sessionStorage.setItem(NAV_SECTION_KEY, sectionId);

    // Hub only matters for Archive. Featured/Skills must not inherit coursework.
    if (sectionId === "collections") {
      sessionStorage.setItem(NAV_HUB_KEY, currentArchiveHub === "coursework" ? "coursework" : "personal");
    } else {
      sessionStorage.setItem(NAV_HUB_KEY, "personal");
    }
  } catch (_) { /* private mode */ }
}

/** Soft navigate from index; saves scroll + keeps index alive for instant Return. */
function navigateTo(url) {
  saveIndexScroll();
  if (typeof window.softOpen === "function") {
    window.softOpen(url);
    return;
  }
  window.location.href = url;
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
  // while smooth-scroll runs; avoids the tall Featured section losing to Skills.
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", () => {
      const id = (a.getAttribute("href") || "").slice(1);
      const key = keyForHash(id);
      if (!key) return;
      lockKey = key;
      lockUntil = Date.now() + 900;
      setActive(key);
      // Drop stale ?hub= when jumping to Featured/Skills
      window.setTimeout(syncIndexUrlToView, 50);
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

    // Prefer saved scroll when present. Explicit #section returns clear SCROLL_KEY
    // in nav-persist so archive Return lands on collections, not a stale featured Y.
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
      if (opts.clearScroll) {
        try { sessionStorage.removeItem(NAV_SCROLL_KEY); } catch (_) { /* ignore */ }
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

  // bfcache Return: trust the restored paint. Only nudge scroll if we have savedY
  // and avoid re-running heavy work on load (that delay felt like a reload).
  window.addEventListener("pageshow", (e) => {
    document.documentElement.classList.remove("page-exit");
    document.body.style.opacity = "1";
    document.body.style.transform = "none";
    if (e.persisted) {
      document.documentElement.classList.add("nav-returning");
      const { returning, savedY } = readReturnState();
      if (returning && savedY !== null) {
        const y = parseInt(savedY, 10);
        if (!Number.isNaN(y) && Math.abs(window.scrollY - y) > 2) scrollInstant(y);
      }
      try { sessionStorage.removeItem(NAV_SCROLL_KEY); } catch (_) { /* ignore */ }
      consumeFlags();
      releaseReturning();
      return;
    }
    restore({ fromBfcache: false, clearScroll: true });
  });

  // Cold load / softNavigate path only
  if (!performance.getEntriesByType("navigation").some(n => n.type === "back_forward")) {
    restore();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => restore(), { once: true });
    }
    window.addEventListener("load", () => restore({ clearScroll: true }), { once: true });
  }
}

/* =============================================================================
 13. HERO TAGLINE WASH | cool steel stream: breathing throttle (no amber)
============================================================================= */
function initHeroWash() {
  const root = document.querySelector("[data-hero-wash]");
  if (!root) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = root.querySelector(".hero-wash-plume");
  const emitter = root.querySelector(".hero-wash-emitter");
  const textEl = root.querySelector(".hero-wash-text");
  const disp = root.querySelector("#eg-jet-wash feDisplacementMap");
  if (!canvas || reduce) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const chars = [];
  const charHeat = [];
  const charWarm = [];
  if (textEl) {
    const phrase = textEl.getAttribute("data-wash-phrase") || textEl.textContent || "";
    textEl.textContent = "";
    for (const ch of phrase) {
      const span = document.createElement("span");
      span.className = "wash-ch";
      span.textContent = ch === " " ? "\u00A0" : ch;
      textEl.appendChild(span);
      chars.push(span);
      charHeat.push(0);
      charWarm.push(0);
    }
  }

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const lerpColor = (c0, c1, t) => {
    const t2 = clamp01(t);
    return `rgb(${Math.round(lerp(c0[0], c1[0], t2))},${Math.round(lerp(c0[1], c1[1], t2))},${Math.round(lerp(c0[2], c1[2], t2))})`;
  };

  // Cool steel stream only — warm amber reserved for the middle-jet exhaust
  const C_COOL = [142, 182, 232];
  const C_COOL_HOT = [210, 236, 255];
  const C_CYAN = [56, 189, 248];
  const C_CORE = [236, 248, 255];

  // heat = intensity, bright = 1 near emitter / 0 at tip
  const colorFromHeat = (heat, bright) => {
    const h = clamp01(heat);
    const b = clamp01(bright);
    if (h < 0.2) return lerpColor(C_COOL, C_COOL_HOT, h / 0.2);
    const coolSide = lerpColor(C_COOL, C_COOL_HOT, clamp01((h - 0.15) / 0.7));
    const brightSide = h < 0.55
      ? lerpColor(C_CYAN, C_CORE, (h - 0.2) / 0.35)
      : lerpColor(C_CYAN, C_CORE, 0.55 + (h - 0.55) * 0.8);
    return lerpColor(coolSide, brightSide, b * clamp01((h - 0.15) / 0.5));
  };

  const paintTextHeat = () => {
    for (let i = 0; i < chars.length; i++) {
      const heat = charHeat[i];
      const bright = charWarm[i];
      chars[i].style.color = colorFromHeat(heat, bright);
      if (heat > 0.55) {
        const aB = (0.14 + heat * 0.32) * bright;
        const aC = (0.2 + heat * 0.4) * (1 - bright * 0.35);
        chars[i].style.textShadow =
          `0 0 ${6 + heat * 12}px rgba(224,242,254,${aB}),` +
          `0 0 ${5 + heat * 10}px rgba(56,189,248,${aB * 0.9}),` +
          `0 0 ${8 + heat * 12}px rgba(147,197,253,${aC})`;
      } else if (heat > 0.18) {
        chars[i].style.textShadow =
          `0 0 11px rgba(147,197,253,${heat * 0.45}),` +
          `0 0 9px rgba(56,189,248,${heat * 0.28 * bright})`;
      } else {
        chars[i].style.textShadow = "0 0 16px rgba(142,182,232,0.26)";
      }
    }
  };

  const applyFlameToText = (flameTipX, emitXLocal, throttle) => {
    if (!chars.length) return;
    const rootRect = root.getBoundingClientRect();
    const tipDocX = rootRect.left + flameTipX;
    const emitDocX = rootRect.left + emitXLocal;
    const span = Math.max(48, emitDocX - tipDocX);
    const band = 30 + throttle * 26;

    for (let i = 0; i < chars.length; i++) {
      const r = chars[i].getBoundingClientRect();
      const cx = r.left + r.width * 0.5;
      const inJet = cx <= emitDocX + 8 && cx >= tipDocX - 10;
      const distToTip = Math.abs(cx - tipDocX);
      let hit = 0;
      let warm = 0;
      if (inJet) {
        hit = (0.32 + 0.68 * throttle) * (1 - Math.min(1, distToTip / band));
        // Near emitter = brighter cyan; toward tip = cooler steel
        warm = clamp01(1 - (emitDocX - cx) / span);
        warm = Math.pow(warm, 0.85);
      }
      charHeat[i] = Math.max(hit, charHeat[i] * 0.96 - 0.004);
      if (hit > charHeat[i]) charHeat[i] = hit;
      charWarm[i] = lerp(charWarm[i], warm, hit > 0.1 ? 0.35 : 0.08);
    }
    paintTextHeat();
  };

  const particles = [];
  const MAX = 160;
  let raf = 0;
  let running = true;
  let hotUntil = 0;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let emitX = 0;
  let emitY = 0;
  let throttleSmoothed = 0.35;

  /** Test-stand breathing: slow chamber swell + high-freq flutter */
  const breathThrottle = (t, forced) => {
    const phase = t * 0.00165;
    const swell = Math.pow(0.5 + 0.5 * Math.sin(phase), 1.55);
    const flutter = 0.82 + 0.18 * Math.sin(t * 0.011) * Math.sin(t * 0.0037);
    const burble = 0.04 * Math.sin(t * 0.027 + Math.sin(t * 0.005));
    let th = 0.22 + 0.78 * swell * flutter + burble;
    if (forced) th = Math.max(th, 0.92);
    return clamp01(th);
  };

  const resize = () => {
    const rect = root.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(Math.max(rect.height, 44) * 2.15));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (emitter) {
      const er = emitter.getBoundingClientRect();
      emitX = er.left - rect.left + 2;
      emitY = h * 0.5;
    } else {
      emitX = w * 0.94;
      emitY = h * 0.5;
    }
  };

  // 0 bright core · 1 cyan sheet · 2 cool sheath · 3 tip wash (all steel/cyan)
  const spawnOne = (kind, throttle) => {
    if (particles.length >= MAX) particles.shift();
    const boost = 0.7 + throttle * 0.85;
    const spread =
      kind === 0 ? 1.6 :
      kind === 1 ? 3.8 + throttle * 2.4 :
      kind === 2 ? 7 + throttle * 4 :
      11 + throttle * 5;
    const speed =
      (kind === 0 ? 8.6 : kind === 1 ? 6.0 : kind === 2 ? 4.2 : 3.2) * boost;
    particles.push({
      kind,
      x: emitX + Math.random() * 4,
      y: emitY + (Math.random() - 0.5) * spread,
      vx: -(speed + Math.random() * (2.0 + throttle * 2.4)),
      vy: (Math.random() - 0.5) *
        (kind === 0 ? 0.3 : kind === 1 ? 0.75 : kind === 2 ? 1.2 : 1.55) *
        (0.7 + throttle),
      life: 1,
      decay: (kind === 0 ? 0.019 : kind === 1 ? 0.014 : kind === 2 ? 0.01 : 0.008) *
        (1.05 - throttle * 0.18),
      size:
        kind === 0 ? 1.1 + Math.random() * 1.5 :
        kind === 1 ? 2.0 + Math.random() * 2.8 :
        kind === 2 ? 3.4 + Math.random() * 4.2 :
        5 + Math.random() * 6,
      stretch:
        kind === 0 ? 13 + Math.random() * 16 :
        kind === 1 ? 11 + Math.random() * 13 :
        kind === 2 ? 12 + Math.random() * 14 :
        10 + Math.random() * 12,
      grow: kind === 0 ? 0.014 : kind === 1 ? 0.05 : kind === 2 ? 0.09 : 0.12,
      phase: Math.random() * Math.PI * 2
    });
  };

  const spawn = (burst, throttle) => {
    const t = throttle;
    const n0 = burst ? 7 : 1 + Math.floor(t * 2.5);
    const n1 = burst ? 8 : 1 + Math.floor(t * 3);
    const n2 = burst ? 8 : 2 + Math.floor(t * 3);
    const n3 = burst ? 7 : 1 + Math.floor(t * 2.5);
    for (let i = 0; i < n0; i++) spawnOne(0, t);
    for (let i = 0; i < n1; i++) spawnOne(1, t);
    for (let i = 0; i < n2; i++) spawnOne(2, t);
    for (let i = 0; i < n3; i++) spawnOne(3, t);
  };

  const paintParticle = (p, throttle, t) => {
    const life = Math.max(0, p.life);
    const travel = clamp01((emitX - p.x) / Math.max(90, emitX * 0.85));
    let a = life * (0.48 + throttle * 0.42);
    let c0, c1, c2;

    if (p.kind === 0) {
      // Bright steel core
      a *= 0.92;
      c0 = `rgba(240,249,255,${a})`;
      c1 = `rgba(186,230,253,${a * 0.72})`;
      c2 = `rgba(56,189,248,0)`;
    } else if (p.kind === 1) {
      // Cyan sheet — strongest near emitter
      a *= 0.55 * (1 - travel * 0.35);
      c0 = `rgba(165,243,252,${a})`;
      c1 = `rgba(56,189,248,${a * 0.55})`;
      c2 = `rgba(14,116,144,0)`;
    } else if (p.kind === 2) {
      // Cool sheath — builds with travel
      a *= 0.4 + travel * 0.22;
      c0 = `rgba(186,214,245,${a})`;
      c1 = `rgba(96,165,250,${a * 0.5})`;
      c2 = `rgba(37,99,235,0)`;
    } else {
      // Tip wash / soft plasma edge
      a *= 0.26 + travel * 0.2 + throttle * 0.08;
      c0 = `rgba(147,197,253,${a})`;
      c1 = `rgba(59,130,246,${a * 0.42})`;
      c2 = `rgba(30,58,138,0)`;
    }

    const len = p.stretch * (1 + travel * (0.35 + throttle * 0.3));
    const thick = p.size * (1 + travel * p.grow * (3.6 + throttle * 2.8));
    const wobble =
      Math.sin(t * 0.007 + p.phase + p.x * 0.045) * (0.35 + travel * 1.3 + throttle * 0.7);
    const grd = ctx.createLinearGradient(p.x + len * 0.15, p.y, p.x - len, p.y);
    grd.addColorStop(0, c0);
    grd.addColorStop(0.42, c1);
    grd.addColorStop(1, c2);
    ctx.beginPath();
    ctx.fillStyle = grd;
    ctx.ellipse(p.x, p.y + wobble, len, thick, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const frame = (t) => {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    ctx.clearRect(0, 0, w, h);

    const forced = performance.now() < hotUntil;
    const target = breathThrottle(t, forced);
    throttleSmoothed = lerp(throttleSmoothed, target, 0.08);
    const throttle = throttleSmoothed;
    const hot = throttle > 0.62 || forced;
    root.classList.toggle("is-hot", hot);
    if (disp) disp.setAttribute("scale", String(2.8 + throttle * 3.4));

    // Continuous spit scaled by chamber breath
    if (Math.random() < 0.35 + throttle * 0.6) spawn(false, throttle);
    if (throttle > 0.78 && Math.random() < 0.22) spawn(true, throttle);

    // Emitter: ice-white core bloom + cyan outer ring (no amber)
    const bloomR = 11 + throttle * 18;
    const coreBloom = ctx.createRadialGradient(emitX, emitY, 0, emitX, emitY, bloomR * 0.72);
    coreBloom.addColorStop(0, `rgba(240,249,255,${0.22 + throttle * 0.4})`);
    coreBloom.addColorStop(0.45, `rgba(165,243,252,${0.14 + throttle * 0.22})`);
    coreBloom.addColorStop(1, "rgba(56,189,248,0)");
    ctx.fillStyle = coreBloom;
    ctx.beginPath();
    ctx.arc(emitX, emitY, bloomR * 0.72, 0, Math.PI * 2);
    ctx.fill();

    const coolBloom = ctx.createRadialGradient(emitX - 6, emitY, 0, emitX - 4, emitY, bloomR * 1.15);
    coolBloom.addColorStop(0, `rgba(191,219,254,${0.1 + throttle * 0.18})`);
    coolBloom.addColorStop(0.55, `rgba(56,189,248,${0.12 + throttle * 0.16})`);
    coolBloom.addColorStop(1, "rgba(12,74,110,0)");
    ctx.fillStyle = coolBloom;
    ctx.beginPath();
    ctx.arc(emitX - 4, emitY, bloomR * 1.15, 0, Math.PI * 2);
    ctx.fill();

    let tipX = emitX;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy + Math.sin(t * 0.005 + p.phase + p.x * 0.03) * (0.16 + p.kind * 0.11 + throttle * 0.1);
      p.vy += (p.y - emitY) * (0.00045 + throttle * 0.00035) * Math.min(p.kind, 3);
      p.vy *= 0.992;
      p.size += p.grow * (0.7 + throttle * 0.5);
      p.life -= p.decay * (forced ? 0.88 : 1);
      if (p.life <= 0 || p.x < -50) {
        particles.splice(i, 1);
        continue;
      }
      if (p.x < tipX) tipX = p.x;
    }

    for (let pass = 3; pass >= 0; pass--) {
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].kind === pass) paintParticle(particles[i], throttle, t);
      }
    }

    applyFlameToText(tipX, emitX, throttle);
  };

  const pulse = () => {
    hotUntil = performance.now() + 1400;
    spawn(true, 1);
  };

  resize();
  spawn(true, 0.55);
  raf = requestAnimationFrame(frame);

  window.addEventListener("resize", resize, { passive: true });
  root.addEventListener("pointerenter", pulse);
  if (emitter) emitter.addEventListener("pointerenter", pulse);

  // Occasional hard throttle blip (test-stand bang)
  const idle = window.setInterval(() => {
    if (document.hidden) return;
    if (root.getBoundingClientRect().bottom < 0) return;
    pulse();
  }, 6400);

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running && !raf) raf = requestAnimationFrame(frame);
  });

  window.addEventListener("pagehide", () => {
    running = false;
    cancelAnimationFrame(raf);
    window.clearInterval(idle);
  }, { once: true });
}


/* =============================================================================
  15. INIT | runs after DOM is ready
============================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let hub = params.get("hub");
  try {
    if (sessionStorage.getItem(NAV_RETURN_KEY) === "1") {
      const section = sessionStorage.getItem(NAV_SECTION_KEY);
      const savedHub = sessionStorage.getItem(NAV_HUB_KEY);
      // Only reopen coursework when Return is actually to Archive
      if (section === "collections") hub = savedHub || hub || "personal";
      else hub = "personal";
    }
  } catch (_) { /* ignore */ }

  // Restore hub before painting archive so Archive Return lands on the same tab
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
  initHeroWash();
});
