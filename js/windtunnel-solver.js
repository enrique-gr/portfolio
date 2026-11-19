// Staggered (MAC) grid. Coordinates are in cell widths; the domain is one unit wide.
export const STEP = 1 / 60;
const PRESSURE_SWEEPS = 32;
const clamp = (x, min, max) => Math.max(min, Math.min(max, x));

export class WindTunnel {
  constructor(width = 128, height = 72) {
    this.width = width;
    this.height = height;
    this.stride = width + 2;
    const size = this.stride * (height + 2);
    this.solid = new Uint8Array(size);
    this.openU = new Uint8Array(size);
    this.openV = new Uint8Array(size);
    this.diagonal = new Uint8Array(size);
    for (const key of ['u', 'v', 'p', 'dye', 'nextU', 'nextV', 'nextDye', 'rhs']) {
      this[key] = new Float32Array(size);
    }
    this.traceX = 0;
    this.traceY = 0;
    this.setObstacle(() => false);
  }

  index(x, y) {
    return x + y * this.stride;
  }

  setObstacle(contains) {
    const { width: w, height: h, stride: s } = this;
    this.solid.fill(0);
    this.openU.fill(0);
    this.openV.fill(0);
    this.diagonal.fill(0);
    // Keep at least one cell of clearance from the tunnel boundary.
    for (let y = 2; y < h; y++) {
      for (let x = 2; x < w; x++) this.solid[this.index(x, y)] = contains(x - 0.5, y - 0.5);
    }
    for (let y = 1; y <= h; y++) {
      for (let x = 1; x <= w; x++) {
        const i = this.index(x, y);
        if (this.solid[i]) continue;
        this.openU[i] = x === w || !this.solid[i + 1];
        this.openV[i] = y < h && !this.solid[i + s];
      }
    }
    for (let y = 1; y <= h; y++) {
      for (let x = 1; x <= w; x++) {
        const i = this.index(x, y);
        if (!this.solid[i]) {
          // At the outlet, zero gauge pressure is half a cell away.
          this.diagonal[i] = this.openU[i - 1] + this.openU[i] + this.openV[i - s] + this.openV[i] + Number(x === w);
        }
      }
    }
  }

  reset(inlet = 0) {
    this.p.fill(0);
    this.v.fill(0);
    this.dye.fill(0);
    for (let i = 0; i < this.u.length; i++) this.u[i] = this.openU[i] ? inlet : 0;
    this.setInlet(inlet);
  }

  setInlet(speed) {
    for (let y = 1; y <= this.height; y++) this.u[this.index(0, y)] = speed;
  }

  isSolid(x, y) {
    const i = clamp(Math.floor(x) + 1, 1, this.width);
    const j = clamp(Math.floor(y) + 1, 1, this.height);
    return this.solid[this.index(i, j)] !== 0;
  }

  sample(field, x, y, offsetX, offsetY, minX, minY, maxX, maxY) {
    x = clamp(x + offsetX, minX, maxX);
    y = clamp(y + offsetY, minY, maxY);
    const ix = Math.min(Math.floor(x), maxX - 1);
    const iy = Math.min(Math.floor(y), maxY - 1);
    const i = this.index(ix, iy);
    const fx = x - ix;
    const fy = y - iy;
    const top = field[i] * (1 - fx) + field[i + 1] * fx;
    const bottom = field[i + this.stride] * (1 - fx) + field[i + this.stride + 1] * fx;
    return top * (1 - fy) + bottom * fy;
  }

  sampleU(x, y) {
    return this.sample(this.u, x, y, 0, 0.5, 0, 1, this.width, this.height);
  }

  sampleV(x, y) {
    return this.sample(this.v, x, y, 0.5, 0, 1, 0, this.width, this.height);
  }

  trace(x, y, dt) {
    const scale = dt * this.width;
    const midX = x + 0.5 * scale * this.sampleU(x, y);
    const midY = y + 0.5 * scale * this.sampleV(x, y);
    const dx = scale * this.sampleU(midX, midY);
    const dy = scale * this.sampleV(midX, midY);
    const samples = Math.max(1, Math.ceil(2 * Math.max(Math.abs(dx), Math.abs(dy))));
    this.traceX = x;
    this.traceY = y;
    // Stop the backtrace before it enters a solid cell.
    for (let k = 1; k <= samples; k++) {
      const nextX = x + dx * k / samples;
      const nextY = y + dy * k / samples;
      if (this.isSolid(nextX, nextY)) break;
      this.traceX = nextX;
      this.traceY = nextY;
    }
  }

  diffuseVelocity(inlet, viscosity) {
    const { width: w, height: h, stride: s, u, v, nextU, nextV } = this;
    // Explicit diffusion at a capped Fourier number (2-D five-point stability limit: 1/4).
    const a = Math.min(0.24, Math.max(0, viscosity) * STEP * w * w);
    if (!a) return;
    for (let y = 1; y <= h; y++) {
      for (let x = 1; x <= w; x++) {
        const i = this.index(x, y);
        if (this.openU[i]) {
          const top = y === 1 ? u[i] : u[i - s];
          const bottom = y === h ? u[i] : u[i + s];
          const right = x === w ? u[i] : u[i + 1];
          const laplacian = u[i - 1] + right + top + bottom - 4 * u[i];
          nextU[i] = u[i] + a * laplacian;
        } else nextU[i] = 0;
        if (this.openV[i]) {
          const left = x === 1 ? -v[i] : v[i - 1];
          const right = x === w ? v[i] : v[i + 1];
          const laplacian = left + right + v[i - s] + v[i + s] - 4 * v[i];
          nextV[i] = v[i] + a * laplacian;
        } else nextV[i] = 0;
      }
    }
    [this.u, this.nextU] = [nextU, u];
    [this.v, this.nextV] = [nextV, v];
    this.setInlet(inlet);
  }

  advectVelocity() {
    const { width: w, height: h, u, v, nextU, nextV } = this;
    for (let y = 1; y <= h; y++) {
      for (let x = 1; x <= w; x++) {
        const i = this.index(x, y);
        if (this.openU[i]) {
          this.trace(x, y - 0.5, -STEP);
          nextU[i] = this.sampleU(this.traceX, this.traceY);
        } else nextU[i] = 0;
        if (this.openV[i]) {
          this.trace(x - 0.5, y, -STEP);
          nextV[i] = this.sampleV(this.traceX, this.traceY);
        } else nextV[i] = 0;
      }
    }
    [this.u, this.nextU] = [nextU, u];
    [this.v, this.nextV] = [nextV, v];
  }

  project() {
    const { width: w, height: h, stride: s, u, v, p, rhs, openU, openV, diagonal } = this;
    let before = 0, after = 0, cells = 0;
    for (let y = 1; y <= h; y++) {
      for (let x = 1; x <= w; x++) {
        const i = this.index(x, y);
        if (this.solid[i]) continue;
        const flux = u[i] - u[i - 1] + v[i] - v[i - s];
        rhs[i] = -flux;
        before += flux * flux;
        cells++;
      }
    }
    // Solve for pressure impulse scaled by cell width. Solid normal velocities
    // are already zero, so solid faces contribute neither flux nor a neighbor.
    // The previous timestep's pressure is a useful warm start.
    for (let sweep = 0; sweep < PRESSURE_SWEEPS; sweep++) {
      for (let y = 1; y <= h; y++) {
        for (let x = 1; x <= w; x++) {
          const i = this.index(x, y);
          if (!diagonal[i]) continue;
          const sum = openU[i - 1] * p[i - 1] + (x < w ? openU[i] * p[i + 1] : 0)
            + openV[i - s] * p[i - s] + openV[i] * p[i + s];
          p[i] += 1.7 * ((rhs[i] + sum) / diagonal[i] - p[i]);
        }
      }
    }
    for (let y = 1; y <= h; y++) {
      for (let x = 1; x <= w; x++) {
        const i = this.index(x, y);
        if (openU[i]) u[i] += x === w ? 2 * p[i] : p[i] - p[i + 1];
        if (openV[i]) v[i] += p[i] - p[i + s];
      }
    }
    for (let y = 1; y <= h; y++) {
      for (let x = 1; x <= w; x++) {
        const i = this.index(x, y);
        if (this.solid[i]) continue;
        const flux = u[i] - u[i - 1] + v[i] - v[i - s];
        after += flux * flux;
      }
    }
    return { before: w * Math.sqrt(before / cells), after: w * Math.sqrt(after / cells) };
  }

  step(inlet, viscosity, smoke) {
    this.setInlet(inlet);
    this.diffuseVelocity(inlet, viscosity);
    this.advectVelocity();
    this.setInlet(inlet);
    const divergence = this.project();
    const { width: w, height: h, dye, nextDye } = this;
    for (let y = 1; y <= h; y++) {
      const stripe = smoke && inlet > 0 && (y + 2) % 8 < 2 ? 1 : 0;
      dye[this.index(0, y)] = stripe;
      for (let x = 1; x <= w; x++) {
        const i = this.index(x, y);
        if (this.solid[i]) {
          nextDye[i] = 0;
          continue;
        }
        this.trace(x - 0.5, y - 0.5, -STEP);
        nextDye[i] = this.sample(dye, this.traceX, this.traceY, 0.5, 0.5, 0, 1, w, h) * 0.998;
      }
    }
    [this.dye, this.nextDye] = [nextDye, dye];
    return divergence;
  }
}

// The four-digit family defines thickness normal to the camber line.
// Build both surfaces, then rotate about quarter chord in screen coordinates.
export function airfoilOutline(code, chord, pivotX, pivotY, angle) {
  if (!/^\d{4}$/.test(code)) throw new Error('Enter a four-digit NACA profile.');
  const camber = Number(code[0]) / 100;
  const peak = Number(code[1]) / 10;
  const thickness = Number(code.slice(2)) / 100;
  if ((camber && !peak) || !thickness) throw new Error('Use a nonzero thickness and a valid camber position.');
  const upper = [], lower = [];
  const rotation = angle * Math.PI / 180;
  const cos = Math.cos(rotation), sin = Math.sin(rotation);
  const rotate = (x, y) => {
    const a = chord * (x - 0.25), b = -chord * y;
    return [pivotX + a * cos - b * sin, pivotY + a * sin + b * cos];
  };
  for (let i = 0; i <= 100; i++) {
    const x = (1 - Math.cos(i * Math.PI / 100)) / 2;
    let y = 0, slope = 0;
    if (camber) {
      const span = x < peak ? peak : 1 - peak;
      const scale = camber / (span * span);
      y = scale * (x < peak ? 2 * peak * x - x * x : 1 - 2 * peak + 2 * peak * x - x * x);
      slope = 2 * scale * (peak - x);
    }
    const t = 5 * thickness * (0.2969 * Math.sqrt(x) - x * (0.1260 + x * (0.3516 - x * (0.2843 - 0.1036 * x))));
    const theta = Math.atan(slope);
    upper.push(rotate(x - t * Math.sin(theta), y + t * Math.cos(theta)));
    lower.push(rotate(x + t * Math.sin(theta), y - t * Math.cos(theta)));
  }
  return upper.concat(lower.reverse());
}

export function containsPoint(outline, x, y) {
  let inside = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const [ax, ay] = outline[i], [bx, by] = outline[j];
    if ((ay > y) !== (by > y) && x < ax + (bx - ax) * (y - ay) / (by - ay)) inside = !inside;
  }
  return inside;
}
