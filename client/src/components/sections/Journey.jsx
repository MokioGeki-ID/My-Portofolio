import { motion, useReducedMotion } from 'framer-motion';
import data from '../../data/journey.js';
import { useI18n } from '../../i18n/index.jsx';
// Kaki serigala pelari: [fase, x pinggul, y pinggul, warna]; kaki jauh lebih gelap agar terasa 3D
const LEGS = [['b', 52, 48, '#657a90'], ['a', 96, 50, '#657a90'], ['a', 44, 48, '#8ea2b6'], ['b', 104, 50, '#8ea2b6']];
// Animasi gaya game: serigala abu-abu berlari menuju level Senior (proses belajar)
export default function Journey() {
  const { t } = useI18n(), reduce = useReducedMotion(), pct = data.progress, to = `${pct}%`;
  return (
    <div className="glass" style={{ marginTop: 24 }}>
      <h3>{t('j_title')}</h3>
      <p>{t('j_text')}</p>
      <div className="track">
        <div className="ground" />
        {data.stages.map(([label, at]) => (
          <div key={label} className={`flag mono ${pct >= at ? 'done' : ''}`} style={{ left: `${at}%`, transform: `translateX(${at === 100 ? '-100%' : '-50%'})` }}>{label}<i /></div>
        ))}
        <motion.div className="runner" initial={{ left: reduce ? to : '0%' }} whileInView={{ left: to }} viewport={{ once: true }} transition={{ duration: 2.5, ease: 'easeOut' }}>
          <svg viewBox="0 0 160 90" width="96" aria-hidden="true">
            <path d="M32 38C18 36 6 40 0 52C10 52 22 50 34 46Z" fill="#7f93a8" />
            <path d="M0 52C4 46 8 43 11 43C9 48 5 51 0 52Z" fill="#2a3644" />
            {LEGS.slice(0, 2).map(([ph, x, y, c], k) => <Leg key={k} ph={ph} x={x} y={y} c={c} />)}
            <path d="M30 40C46 32 76 31 98 32C106 32 112 35 116 40C114 48 108 54 100 56C84 54 62 52 44 52C36 50 32 46 30 40Z" fill="#7f93a8" />
            <path d="M96 32C104 27 112 25 120 27L122 44L104 54Z" fill="#8ea2b6" />
            <path d="M100 52L106 62L110 53L116 61L119 50Z" fill="#a9bacb" />
            <path d="M113 29L113 14L121 27Z" fill="#6f8399" />
            <path d="M118 28L121 12L129 26Z" fill="#a9bacb" />
            <path d="M114 36C116 29 122 27 128 28L150 37L154 40L150 44L136 45C128 49 120 49 114 44Z" fill="#a9bacb" />
            <path d="M150 37L154 40L150 44Z" fill="#0a0f16" />
            <path d="M130 33L136 35" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
            {LEGS.slice(2).map(([ph, x, y, c], k) => <Leg key={k} ph={ph} x={x} y={y} c={c} />)}
          </svg>
        </motion.div>
      </div>
      <p className="mono">{t('j_now')} · XP {pct}%</p>
      <div className="xp" role="progressbar" aria-label="XP" aria-valuenow={pct}>
        <motion.i initial={{ width: reduce ? to : 0 }} whileInView={{ width: to }} viewport={{ once: true }} transition={{ duration: 2.5 }} />
      </div>
    </div>
  );
}
// Satu kaki dua ruas (paha + betis) agar lari terlihat alami
function Leg({ ph, x, y, c }) {
  return (
    <g className={`leg ${ph}`} style={{ transformOrigin: `${x}px ${y}px` }} stroke={c} strokeLinecap="round" fill="none">
      <path d={`M${x} ${y}L${x} ${y + 16}`} strokeWidth="6" />
      <g className="shin" style={{ transformOrigin: `${x}px ${y + 16}px` }}><path d={`M${x} ${y + 16}L${x} ${y + 34}`} strokeWidth="4" /></g>
    </g>
  );
}
