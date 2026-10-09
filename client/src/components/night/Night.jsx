import { pine, grass } from './scenery.js';
import { useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Latar malam global: bintang, bulan, kabut, hutan pinus, mata serigala
export default function Night() {
  const stars = useMemo(() => Array.from({ length: 70 }, () => ({
    l: Math.random() * 100, t: Math.random() * 70, s: Math.random() * 2 + 1, d: Math.random() * 4,
  })), []);
  // Hutan berlapis: pinus belakang (biru gelap), pinus depan (hitam), rumput
  const forest = useMemo(() => {
    let back = '', front = '';
    for (let i = 0; i < 20; i++) { const x = i * 62 + ((i * 37) % 30); back += pine(x + 20, 220, 150 + ((i * 53) % 60)); front += pine(x, 220, 100 + ((i * 29) % 70)); }
    return { back, front, grass: grass(1200, 220, 200) };
  }, []);
  // Glow bulan mengikuti scroll + parallax halus mengikuti kursor
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const glow = gsap.fromTo('.night .moon', { boxShadow: '0 0 60px 10px rgba(201,209,217,.25)' }, { boxShadow: '0 0 150px 45px rgba(201,209,217,.65)', ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
    const dim = gsap.fromTo('.night .moon', { opacity: 1 }, { opacity: 0.4, ease: 'none', scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true } }); // redup setelah Hero agar teks tetap terbaca
    const qx = gsap.quickTo('.night .moon', 'x', { duration: 0.8 }), qy = gsap.quickTo('.night .moon', 'y', { duration: 0.8 });
    const mv = (e) => { qx((e.clientX / window.innerWidth - 0.5) * -30); qy((e.clientY / window.innerHeight - 0.5) * -30); };
    window.addEventListener('mousemove', mv);
    return () => { window.removeEventListener('mousemove', mv); glow.scrollTrigger.kill(); glow.kill(); dim.scrollTrigger.kill(); dim.kill(); };
  }, []);
  return (
    <div className="night" aria-hidden="true">
      {stars.map((s, i) => <span key={i} className="star" style={{ left: `${s.l}%`, top: `${s.t}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
      <div className="moon" />
      <div className="fog" />
      <div className="eyes"><i /><i /></div>
      <svg className="forest" viewBox="0 0 1200 220" preserveAspectRatio="xMidYMax slice"><path d={forest.back} fill="#08122a" /><path d={forest.front} fill="#02030a" /><path d={forest.grass} fill="#010208" /></svg>
    </div>
  );
}
