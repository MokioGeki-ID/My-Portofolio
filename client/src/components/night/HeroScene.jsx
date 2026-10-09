import { useMemo } from 'react';
import { WOLF_D, TAIL_D } from './Wolf.jsx';
import { pine, tree, grass } from './scenery.js';
// Adegan Hero: serigala melolong di bukit batu, cahaya bulan, kabut, pinus, pohon gundul, rumput
export default function HeroScene() {
  const s = useMemo(() => ({
    pines: [[60, 570, 210], [135, 575, 150], [20, 585, 130], [565, 575, 180], [615, 585, 140]].map(([x, b, h]) => pine(x, b, h)).join(''),
    trees: [tree(190, 480, 70, 1), tree(480, 490, 62, 5)].flat(),
    grass: grass(640, 600, 110),
  }), []);
  return (
    <svg className="hero-scene" viewBox="0 0 640 600" aria-hidden="true">
      <defs>
        <radialGradient id="hs-g"><stop offset="0" stopColor="#9ad8ff" stopOpacity=".7" /><stop offset=".5" stopColor="#3b8fd0" stopOpacity=".28" /><stop offset="1" stopColor="#0B1530" stopOpacity="0" /></radialGradient>
        <linearGradient id="hs-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfe6ff" stopOpacity=".3" /><stop offset="1" stopColor="#bfe6ff" stopOpacity="0" /></linearGradient>
        <filter id="hs-bl"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <circle cx="340" cy="230" r="320" fill="url(#hs-g)" />
      <g className="beams" filter="url(#hs-bl)" fill="url(#hs-b)">
        <rect x="300" y="0" width="50" height="400" transform="skewX(-6)" /><rect x="380" y="0" width="70" height="420" />
        <rect x="470" y="0" width="40" height="400" transform="skewX(8)" /><rect x="230" y="40" width="30" height="340" />
      </g>
      <path d={s.pines} fill="#04070f" opacity=".75" />
      <g stroke="#000" strokeLinecap="round" fill="none">{s.trees.map((t, i) => <path key={i} d={t.d} strokeWidth={t.w} />)}</g>
      <ellipse cx="320" cy="545" rx="330" ry="40" fill="#8cc8f0" opacity=".22" filter="url(#hs-bl)" />
      <path fill="#000" d="M0 600V585L110 566L180 510L225 450L252 405L266 380L290 372L330 374L372 371L394 378L410 405L440 440L480 480L540 525L640 572V600Z" />
      <g transform="translate(240 72)" fill="#000"><g className="scene-wolf"><path d={TAIL_D} /><path d={WOLF_D} /></g></g>
      <path fill="#000" d={s.grass} />
    </svg>
  );
}
