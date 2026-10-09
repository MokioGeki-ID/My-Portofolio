// Generator pemandangan malam (SVG path): pohon pinus, pohon gundul, rumput
const r = (i) => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1; // acak deterministik
export const pine = (x, b, h, k = 5) => {
  let d = '';
  for (let i = 0; i < k; i++) {
    const a = b - h + (i * h * 0.8) / k, bb = Math.min(b, a + h * 0.34), w = h * (0.07 + (0.1 * i) / (k - 1));
    d += `M${x} ${a}L${x + w} ${bb}L${x - w} ${bb}Z`;
  }
  return d + `M${x - 2} ${b}h4v-${h * 0.12}h-4z`;
};
export const tree = (x, y, l, seed) => {
  const L = [[], [], [], [], [], []];
  (function f(px, py, a, len, d) {
    if (d < 0) return;
    const x2 = px + Math.cos(a) * len, y2 = py - Math.sin(a) * len;
    L[d].push(`M${px.toFixed(1)} ${py.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
    f(x2, y2, a + 0.42 - r(d + seed) * 0.2, len * 0.74, d - 1);
    f(x2, y2, a - 0.4 + r(d * 3 + seed) * 0.2, len * 0.72, d - 1);
  })(x, y, Math.PI / 2, l, 5);
  return L.map((p, i) => ({ d: p.join(''), w: (i + 0.6) * 0.9 }));
};
export const grass = (w, b, n) => {
  let d = '';
  for (let i = 0; i < n; i++) {
    const x = i * (w / n) + r(i) * 4, h = 16 + r(i + 9) * 26, l = (r(i + 3) - 0.5) * 14;
    d += `M${x} ${b}L${x + 3} ${b}L${x + l} ${b - h}Z`;
  }
  return d;
};
