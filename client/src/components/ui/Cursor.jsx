import { useEffect, useRef } from 'react';
// Cincin glow cyan mengikuti kursor, hanya di desktop (pointer halus) dan tanpa reduced-motion
export default function Cursor() {
  const r = useRef(null);
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, id;
    const mv = (e) => { x = e.clientX; y = e.clientY; };
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; if (r.current) r.current.style.transform = `translate(${cx - 16}px,${cy - 16}px)`; id = requestAnimationFrame(loop); };
    window.addEventListener('mousemove', mv); loop();
    r.current.style.display = 'block';
    return () => { window.removeEventListener('mousemove', mv); cancelAnimationFrame(id); };
  }, []);
  return <div ref={r} aria-hidden="true" style={{ display: 'none', position: 'fixed', top: 0, left: 0, width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--cyan)', boxShadow: '0 0 14px var(--cyan)', pointerEvents: 'none', zIndex: 200 }} />;
}
