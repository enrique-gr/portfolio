import { WindTunnel, STEP, airfoilOutline, containsPoint } from './windtunnel-solver.js?v=1';

const byId = (id) => document.getElementById(id);
const tunnel = new WindTunnel();
const { width, height, stride } = tunnel;
const canvas = byId('tunnel-canvas');
const context = canvas.getContext('2d', { alpha: false });
const fieldCanvas = document.createElement('canvas');
fieldCanvas.width = width;
fieldCanvas.height = height;
const fieldContext = fieldCanvas.getContext('2d');
const image = fieldContext.createImageData(width, height);

const shape = byId('shape');
const profile = byId('profile');
const angle = byId('angle');
const view = byId('view');
const speedInput = byId('inlet');
const viscosityInput = byId('viscosity');
const smoke = byId('smoke');
const status = byId('geometry-status');
const pause = byId('pause');
const legends = {
  dye: ['Clear', 'Dense smoke'],
  speed: ['0', '2 × inlet scale'],
  pressure: ['Lower', 'Higher gauge pressure'],
  curl: ['Clockwise (−)', 'Counterclockwise (+)'],
  particles: ['Tracer particles', '']
};
const stops = {
  dye: [[6, 16, 28], [24, 125, 160], [241, 230, 189]],
  speed: [[9, 17, 31], [47, 94, 177], [244, 219, 137]],
  pressure: [[70, 127, 230], [15, 23, 38], [255, 170, 103]],
  curl: [[80, 140, 250], [15, 23, 38], [238, 133, 86]],
  particles: [[6, 16, 28], [6, 16, 28], [6, 16, 28]]
};
const palette = Object.fromEntries(Object.entries(stops).map(([mode, colors]) => {
  const values = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = 2 * i / 255;
    const j = Math.min(1, Math.floor(t));
    for (let k = 0; k < 3; k++) values[3 * i + k] = colors[j][k] + (t - j) * (colors[j + 1][k] - colors[j][k]);
  }
  return [mode, values];
}));

let activeProfile = '2412';
let importedMask = null;
let outline = null;
let length = 42 / width;
let inlet = Number(speedInput.value);
let viscosity = Number(viscosityInput.value);
let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticks = 0, lastTime = 0, accumulator = 0;
let frames = 0, fpsStart = 0, divergence = null, raf = 0;
let obstacleRequest = 0;
const particles = Array.from({ length: 320 }, () => ({ x: Math.random() * width, y: Math.random() * height, px: 0, py: 0 }));

function seedParticle(particle) {
  particle.px = particle.x = 0.5;
  particle.py = particle.y = Math.random() * height;
}

function resetFlow() {
  tunnel.reset(inlet);
  ticks = 0;
  accumulator = 0;
  divergence = null;
  for (const particle of particles) seedParticle(particle);
  updateMetrics();
  render();
}

function setGeometry() {
  angle.disabled = shape.value !== 'airfoil';
  outline = null;
  if (shape.value === 'airfoil') {
    const chord = 42;
    length = chord / width;
    outline = airfoilOutline(activeProfile, chord, 0.33 * width, 0.5 * height, Number(angle.value));
    tunnel.setObstacle((x, y) => containsPoint(outline, x, y));
  } else if (shape.value === 'cylinder') {
    const radius = 8;
    length = 2 * radius / width;
    tunnel.setObstacle((x, y) => (x - width * 0.32) ** 2 + (y - height * 0.5) ** 2 <= radius ** 2);
  } else if (shape.value === 'imported' && importedMask) {
    length = importedMask.length;
    tunnel.setObstacle((x, y) => importedMask.cells[Math.floor(y) * width + Math.floor(x)] === 1);
  } else {
    length = 0;
    tunnel.setObstacle(() => false);
  }
  byId('angle-value').value = angle.value + '°';
  resetFlow();
}

function updateMetrics() {
  byId('sim-time').textContent = (ticks * STEP).toFixed(2) + ' s';
  byId('reynolds').textContent = length && inlet ? (viscosity ? Math.round(inlet * length / viscosity).toLocaleString() : 'Inviscid') : 'Not applicable';
  const residual = byId('divergence');
  residual.textContent = divergence ? divergence.after.toExponential(2) + ' s⁻¹' : 'Pending';
  residual.title = divergence ? 'Before projection: ' + divergence.before.toExponential(2) + ' s⁻¹' : '';
}

function advectParticles() {
  for (const particle of particles) {
    particle.px = particle.x;
    particle.py = particle.y;
    tunnel.trace(particle.x, particle.y, STEP);
    particle.x = tunnel.traceX;
    particle.y = tunnel.traceY;
    const blocked = particle.x === particle.px && particle.y === particle.py;
    if (particle.x >= width || particle.x < 0 || particle.y <= 0 || particle.y >= height || blocked) seedParticle(particle);
  }
}

function updateLegend() {
  const mode = view.value;
  const [low, high] = legends[mode];
  byId('scale-low').textContent = low;
  byId('scale-high').textContent = high;
  const scale = byId('scale');
  scale.hidden = mode === 'particles';
  scale.style.background = 'linear-gradient(90deg,' + stops[mode].map(rgb => 'rgb(' + rgb.join(',') + ')').join(',') + ')';
}

function render() {
  const { u, v, p, dye, solid } = tunnel;
  const mode = view.value;
  const scale = Math.max(inlet, 0.2);
  const colors = palette[mode];
  const pixels = image.data;
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      const i = tunnel.index(x, y);
      const pixel = 4 * ((y - 1) * width + x - 1);
      if (solid[i]) {
        pixels[pixel] = 37;
        pixels[pixel + 1] = 46;
        pixels[pixel + 2] = 60;
      } else {
        let value = 0;
        if (mode === 'dye') value = Math.sqrt(Math.max(0, dye[i]));
        if (mode === 'speed') value = Math.hypot(u[i] + u[i - 1], v[i] + v[i - stride]) / (4 * scale);
        if (mode === 'pressure') value = 0.5 + p[i] / (STEP * width * 2 * scale * scale);
        if (mode === 'curl') {
          // Canvas Y increases downward; negate the screen-space curl.
          const vRight = v[i + 1] + v[i + 1 - stride];
          const vLeft = v[i - 1] + v[i - 1 - stride];
          const uDown = u[i + stride] + u[i + stride - 1];
          const uUp = u[i - stride] + u[i - stride - 1];
          value = 0.5 + (uDown - uUp - vRight + vLeft) / (2 * scale);
        }
        const color = 3 * Math.round(255 * Math.min(1, Math.max(0, value)));
        pixels[pixel] = colors[color];
        pixels[pixel + 1] = colors[color + 1];
        pixels[pixel + 2] = colors[color + 2];
      }
      pixels[pixel + 3] = 255;
    }
  }
  fieldContext.putImageData(image, 0, 0);
  const w = canvas.width, h = canvas.height;
  context.drawImage(fieldCanvas, 0, 0, w, h);
  const sx = w / width, sy = h / height;
  if (outline) {
    context.beginPath();
    for (const [x, y] of outline) context.lineTo(x * sx, y * sy);
    context.closePath();
    context.strokeStyle = '#9cacc2';
    context.lineWidth = 1.25;
    context.stroke();
  } else if (shape.value === 'cylinder') {
    context.beginPath();
    context.arc(w * 0.32, h * 0.5, 8 * sx, 0, Math.PI * 2);
    context.strokeStyle = '#9cacc2';
    context.lineWidth = 1.25;
    context.stroke();
  }
  if (mode === 'particles') {
    context.beginPath();
    for (const { x, y, px, py } of particles) {
      context.moveTo(px * sx, py * sy);
      context.lineTo(x * sx + 0.5, y * sy);
    }
    context.strokeStyle = '#a5e7ff';
    context.stroke();
  }
}

function frame(now) {
  raf = 0;
  if (paused || document.hidden) return;
  const elapsed = lastTime ? (now - lastTime) / 1000 : STEP;
  lastTime = now;
  accumulator = Math.min(2 * STEP, accumulator + elapsed);
  while (accumulator + 1e-9 >= STEP) {
    divergence = tunnel.step(inlet, viscosity, smoke.checked);
    if (view.value === 'particles') advectParticles();
    accumulator -= STEP;
    ticks++;
  }
  render();
  if (!fpsStart) fpsStart = now;
  frames++;
  if (now - fpsStart >= 500) {
    byId('frame-rate').textContent = Math.round(1000 * frames / (now - fpsStart)) + ' fps';
    fpsStart = now;
    frames = 0;
    updateMetrics();
  }
  raf = requestAnimationFrame(frame);
}

function updatePlayback() {
  pause.textContent = paused ? 'Play' : 'Pause';
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  lastTime = 0;
  accumulator = 0;
  frames = 0;
  fpsStart = 0;
  byId('frame-rate').textContent = paused ? 'Paused' : 'Pending';
  if (!paused && !document.hidden) raf = requestAnimationFrame(frame);
}

byId('profile-form').addEventListener('submit', event => {
  event.preventDefault();
  try {
    const code = profile.value.trim();
    airfoilOutline(code, 1, 0, 0, 0);
    activeProfile = code;
    shape.value = 'airfoil';
    status.textContent = '';
    setGeometry();
  } catch (error) {
    status.textContent = error.message;
    profile.focus();
  }
});
shape.addEventListener('change', () => {
  obstacleRequest++;
  byId('obstacle-file').value = '';
  status.textContent = '';
  setGeometry();
});
angle.addEventListener('input', setGeometry);
view.addEventListener('change', () => {
  if (view.value === 'particles') {
    for (const particle of particles) seedParticle(particle);
  }
  updateLegend();
  render();
});
speedInput.addEventListener('input', () => {
  inlet = Number(speedInput.value);
  byId('inlet-value').value = inlet.toFixed(2);
  updateMetrics();
});
viscosityInput.addEventListener('input', () => {
  viscosity = Number(viscosityInput.value);
  byId('viscosity-value').value = viscosity.toFixed(5);
  updateMetrics();
});
pause.addEventListener('click', () => {
  paused = !paused;
  updatePlayback();
  updateMetrics();
});
byId('reset').addEventListener('click', resetFlow);
document.addEventListener('visibilitychange', updatePlayback);

function addSmoke(event) {
  if (event.pointerType !== 'mouse' || event.buttons !== 1 || view.value !== 'dye') return;
  const bounds = canvas.getBoundingClientRect();
  const cx = 1 + Math.floor(width * (event.clientX - bounds.left) / bounds.width);
  const cy = 1 + Math.floor(height * (event.clientY - bounds.top) / bounds.height);
  for (let y = Math.max(1, cy - 1); y <= Math.min(height, cy + 1); y++) {
    for (let x = Math.max(1, cx - 1); x <= Math.min(width, cx + 1); x++) {
      const i = tunnel.index(x, y);
      if (!tunnel.solid[i]) tunnel.dye[i] = 1;
    }
  }
  if (paused) render();
}
canvas.addEventListener('pointerdown', addSmoke);
canvas.addEventListener('pointermove', addSmoke);

byId('obstacle-file').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const request = ++obstacleRequest;
  let bitmap;
  try {
    if (file.size > 10 * 1024 * 1024) throw new Error('Choose an image smaller than 10 MB.');
    bitmap = await createImageBitmap(file);
    if (request !== obstacleRequest) return;
    const mask = document.createElement('canvas');
    mask.width = width;
    mask.height = height;
    const ctx = mask.getContext('2d', { willReadFrequently: true });
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    const scale = Math.min(0.42 * width / bitmap.width, 0.56 * height / bitmap.height);
    const w = bitmap.width * scale, h = bitmap.height * scale;
    ctx.drawImage(bitmap, Math.round(0.42 * width - w / 2), Math.round((height - h) / 2), w, h);
    const pixels = ctx.getImageData(0, 0, width, height).data;
    const cells = new Uint8Array(width * height);
    let left = width, right = -1;
    for (let i = 0; i < cells.length; i++) {
      if ((pixels[4 * i] + pixels[4 * i + 1] + pixels[4 * i + 2]) / 3 >= 128) continue;
      cells[i] = 1;
      left = Math.min(left, i % width);
      right = Math.max(right, i % width);
    }
    if (right < left) throw new Error('No dark obstacle pixels found.');
    importedMask = { cells, length: (right - left + 1) / width };
    shape.querySelector('[value="imported"]').disabled = false;
    shape.value = 'imported';
    status.textContent = '';
    setGeometry();
  } catch (error) {
    if (request === obstacleRequest) status.textContent = error.message || 'This image could not be opened.';
  } finally {
    bitmap?.close();
    if (request === obstacleRequest) event.target.value = '';
  }
});

setGeometry();
updateLegend();
updatePlayback();
