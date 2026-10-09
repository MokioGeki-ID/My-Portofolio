import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import Night from './components/night/Night.jsx';
import Fireflies from './components/night/Fireflies.jsx';
import Loader from './components/night/Loader.jsx';
import Cursor from './components/ui/Cursor.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Education from './components/sections/Education.jsx';
import Skills from './components/sections/Skills.jsx';
import Projects from './components/sections/Projects.jsx';
import TechStack from './components/sections/TechStack.jsx';
import Socials from './components/sections/Socials.jsx';
import WelcomeNote from './components/sections/WelcomeNote.jsx';
import Faq from './components/sections/Faq.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/sections/Footer.jsx';
import { useI18n } from './i18n/index.jsx';
// Code-splitting: galeri prestasi dimuat belakangan
const Achievements = lazy(() => import('./components/sections/Achievements.jsx'));

const ids = ['hero', 'about', 'education', 'skills', 'projects', 'tech', 'achievements', 'socials', 'faq', 'contact'];
const keys = ['home', 'about', 'education', 'skills', 'projects', 'tech', 'achievements', 'socials', 'faq', 'contact'];

function Home() {
  return <><Hero /><About /><Education /><Skills /><Projects /><TechStack /><Suspense fallback={null}><Achievements /></Suspense><Socials /><WelcomeNote /><Faq /><Contact /></>;
}
function NotFound() {
  return <section><h1>404</h1><Link className="btn" to="/">Kembali</Link></section>;
}
export default function App() {
  const [ready, setReady] = useState(false), [active, setActive] = useState('hero');
  const { t, toggle, lang } = useI18n(), loc = useLocation(), reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Smooth scroll (Lenis), dimatikan saat reduced-motion
  useEffect(() => {
    if (reduce) return;
    const l = new Lenis(); let id;
    const raf = (time) => { l.raf(time); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); l.destroy(); };
  }, [reduce]);
  // Tandai section aktif (Sambutan tidak punya item navbar)
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.id !== 'welcome' && setActive(e.target.id)), { rootMargin: '-40% 0px -50% 0px' });
    const tm = setTimeout(() => document.querySelectorAll('section[id]').forEach((s) => io.observe(s)), 300);
    return () => { clearTimeout(tm); io.disconnect(); };
  }, [ready, loc.pathname]);
  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <Night /><Fireflies /><Cursor />
      <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress, transformOrigin: '0 0', position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'var(--cyan)', zIndex: 60 }} />
      {!ready && <Loader onDone={() => setReady(true)} />}
      <nav aria-label="Utama">
        {ids.map((id, i) => <a key={id} href={`/#${id}`} className={active === id ? 'on' : ''}>{t(keys[i])}</a>)}
        <button className="btn mono" onClick={toggle} aria-label="Ganti bahasa">{lang.toUpperCase()}</button>
      </nav>
      <main id="main">
        <AnimatePresence mode="wait">
          <motion.div key={loc.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Routes location={loc}><Route path="/" element={<Home />} /><Route path="*" element={<NotFound />} /></Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
