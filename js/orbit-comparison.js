const PERIOD = 2 * Math.PI;
const INITIAL = [1, 0, 0, 1];

function derivative([x, y, vx, vy]) {
  const inverseRadiusCubed = 1 / (x * x + y * y) ** 1.5;
  return [vx, vy, -x * inverseRadiusCubed, -y * inverseRadiusCubed];
}

function offset(state, slope, scale) {
  return state.map((value, index) => value + scale * slope[index]);
}

function rk4(state, dt) {
  const a = derivative(state);
  const b = derivative(offset(state, a, dt / 2));
  const c = derivative(offset(state, b, dt / 2));
  const d = derivative(offset(state, c, dt));
  return state.map((value, i) => value + dt * (a[i] + 2 * b[i] + 2 * c[i] + d[i]) / 6);
}

function symplecticEuler(state, dt) {
  const [x, y, vx, vy] = state;
  const [, , ax, ay] = derivative(state);
  const u = vx + dt * ax, v = vy + dt * ay;
  return [x + dt * u, y + dt * v, u, v];
}

function energy([x, y, vx, vy]) {
  return (vx * vx + vy * vy) / 2 - 1 / Math.hypot(x, y);
}

export function simulateOrbit(stepsPerOrbit, integrate, orbits = 4) {
  const dt = PERIOD / stepsPerOrbit;
  let state = INITIAL;
  const points = [state];
  const initialEnergy = energy(state);
  let maximumDrift = 0;
  for (let step = 0; step < orbits * stepsPerOrbit; step++) {
    state = integrate(state, dt);
    points.push(state);
    maximumDrift = Math.max(maximumDrift, Math.abs((energy(state) - initialEnergy) / initialEnergy));
  }
  return { points, maximumDrift, returnError: Math.hypot(state[0] - INITIAL[0], state[1] - INITIAL[1]) };
}

export function compareOrbits(stepsPerOrbit) {
  return [simulateOrbit(stepsPerOrbit, symplecticEuler), simulateOrbit(stepsPerOrbit, rk4)];
}

const panel = typeof document === 'undefined' ? null : document.getElementById('section-orbit');
if (panel) {
  const steps = document.getElementById('orbit-steps');
  const canvas = document.getElementById('orbit-canvas');
  const ctx = canvas.getContext('2d');
  const color = ['#fbbf24', '#93c5fd'];
  const scale = Math.min(canvas.width, canvas.height) * 0.36;

  function draw() {
    const cases = compareOrbits(Number(steps.value));
    const cx = canvas.width / 2, cy = canvas.height / 2;
    ctx.fillStyle = '#080e1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 5]);
    ctx.beginPath();
    ctx.arc(cx, cy, scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#d4d4d8';
    ctx.fillRect(cx - 2, cy - 2, 4, 4);
    cases.forEach(({ points, maximumDrift, returnError }, index) => {
      ctx.strokeStyle = color[index];
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      points.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(cx + x * scale, cy - y * scale);
        else ctx.lineTo(cx + x * scale, cy - y * scale);
      });
      ctx.stroke();
      const last = points.at(-1);
      ctx.fillStyle = color[index];
      ctx.beginPath();
      ctx.arc(cx + last[0] * scale, cy - last[1] * scale, 3, 0, Math.PI * 2);
      ctx.fill();
      document.getElementById('orbit-energy-' + index).textContent = (100 * maximumDrift).toExponential(2) + '%';
      document.getElementById('orbit-return-' + index).textContent = returnError.toExponential(2);
    });
  }

  steps.addEventListener('change', draw);
  draw();
}
