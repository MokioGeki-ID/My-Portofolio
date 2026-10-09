import { useRef } from 'react';
// Tombol magnetik: tertarik ke arah kursor
export default function Magnetic({ children, ...p }) {
  const r = useRef(null);
  const move = (e) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const b = r.current.getBoundingClientRect();
    r.current.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.25}px,${(e.clientY - b.top - b.height / 2) * 0.25}px)`;
  };
  return <a ref={r} onMouseMove={move} onMouseLeave={() => { r.current.style.transform = ''; }} style={{ transition: 'transform .15s' }} {...p}>{children}</a>;
}
