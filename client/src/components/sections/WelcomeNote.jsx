import { motion, useReducedMotion } from 'framer-motion';
import w from '../../config/welcome.js';
// Ucapan terima kasih tepat di atas FAQ (selalu Inggris)
export default function WelcomeNote() {
  const reduce = useReducedMotion(), v = { once: true };
  return (
    <section id="welcome"><div className="glass" style={{ textAlign: 'center' }}>
      <motion.span aria-hidden="true" animate={reduce ? {} : { scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} style={{ display: 'inline-block', fontSize: '1.6rem' }}>🐾</motion.span>
      <h2 className="grad" style={{ fontSize: 'clamp(1.8rem,5vw,3rem)' }} lang="en">
        {w.thanks.heading.split(' ').map((x, i) => (
          <motion.span key={i} style={{ display: 'inline-block', marginRight: '.3em' }} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={v} transition={{ delay: i * 0.15 }}>{x}</motion.span>
        ))}
      </h2>
      <motion.p lang="en" initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={v} transition={{ delay: 0.5 }}>{w.thanks.text}</motion.p>
      <motion.span aria-hidden="true" animate={reduce ? {} : { y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ display: 'inline-block' }}>↓</motion.span>
    </div></section>
  );
}
