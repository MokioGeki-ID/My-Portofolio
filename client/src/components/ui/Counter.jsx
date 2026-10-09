import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Angka naik saat masuk layar (GSAP ScrollTrigger); statis saat reduced-motion
export default function Counter({ to, label }) {
  const r = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { r.current.textContent = to; return; }
    gsap.registerPlugin(ScrollTrigger);
    const o = { v: 0 };
    const tw = gsap.to(o, { v: to, duration: 1.5, ease: 'power2.out', onUpdate: () => { r.current.textContent = Math.round(o.v); }, scrollTrigger: { trigger: r.current, start: 'top 90%', once: true } });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [to]);
  return <div className="glass flex-1 text-center"><div ref={r} className="mono text-3xl text-cyan">0</div><div>{label}</div></div>;
}
