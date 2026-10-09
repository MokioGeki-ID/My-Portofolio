import { useEffect, useRef } from 'react';
const EYES = [
  { id: 'ce-l', d: 'M8 22Q38 14 66 38Q34 46 8 22Z', cx: 37, cy: 31 },
  { id: 'ce-r', d: 'M152 22Q122 14 94 38Q126 46 152 22Z', cx: 123, cy: 31 },
];
// Sepasang mata serigala; pupilnya mengikuti kursor (statis saat reduced-motion)
export default function WolfEyes({ width = 170 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mv = (e) => {
      const r = ref.current.getBoundingClientRect(), k = r.width / 160;
      ref.current.querySelectorAll('.pupil').forEach((p) => {
        const x = r.left + p.dataset.cx * k, y = r.top + p.dataset.cy * k;
        const a = Math.atan2(e.clientY - y, e.clientX - x), d = Math.min(8, Math.hypot(e.clientX - x, e.clientY - y) / 30);
        p.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`;
      });
    };
    window.addEventListener('pointermove', mv);
    return () => window.removeEventListener('pointermove', mv);
  }, []);
  return (
    <svg ref={ref} className="eyes-svg" width={width} viewBox="0 0 160 60" aria-hidden="true">
      <defs>{EYES.map((e) => <clipPath key={e.id} id={e.id}><path d={e.d} /></clipPath>)}</defs>
      {EYES.map((e) => (
        <g key={e.id}>
          <path d={e.d} fill="#071018" stroke="#22D3EE" strokeWidth="2" />
          <g clipPath={`url(#${e.id})`}><g className="pupil" data-cx={e.cx} data-cy={e.cy}>
            <circle cx={e.cx} cy={e.cy} r="11" fill="#22D3EE" /><ellipse cx={e.cx} cy={e.cy} rx="3.2" ry="9" fill="#02040a" />
          </g></g>
        </g>
      ))}
    </svg>
  );
}
