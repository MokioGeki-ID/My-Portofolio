import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import p from '../../config/profile.js';
import w from '../../config/welcome.js';
import HeroScene from '../night/HeroScene.jsx';
import WolfEyes from '../night/WolfEyes.jsx';
import Magnetic from '../ui/Magnetic.jsx';
import { useI18n } from '../../i18n/index.jsx';
export default function Hero() {
  const { t } = useI18n(), reduce = useReducedMotion(), roles = t('roles_typed');
  const [i, setI] = useState(0), [n, setN] = useState(0);
  // Efek ketik bergantian
  useEffect(() => {
    const word = roles[i % roles.length];
    const tm = setTimeout(() => (n < word.length ? setN(n + 1) : setTimeout(() => { setN(0); setI((i + 1) % roles.length); }, 1500)), 80);
    return () => clearTimeout(tm);
  }, [n, i, roles]);
  return (
    <section id="hero" className="hero">
      <div className="hero-text">
        <h1 className="grad hero-welcome" lang="en">
          {w.hero.heading.split(' ').map((x, k) => (
            <motion.span key={k} style={{ display: 'inline-block', marginRight: '.3em' }} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 + k * 0.15 }}>{x}</motion.span>
          ))}
        </h1>
        <p className="chip mono" lang="en">{w.hero.sub}</p>
        <div className="id-row"><img className="avatar" src={p.photo} alt={`Foto ${p.name}`} /><WolfEyes /></div>
        <h2 className="grad user">{p.username}</h2>
        <p>{p.name}</p>
        <p className="mono">{roles[i % roles.length].slice(0, n)}|</p>
        <div><Magnetic className="btn" href="#projects">{t('cta1')}</Magnetic><Magnetic className="btn" href="#contact">{t('cta2')}</Magnetic></div>
      </div>
      <div className="hero-wolf"><HeroScene /></div>
    </section>
  );
}
