import { useRef } from 'react';
// Kartu miring 3D + glow mengikuti kursor (nonaktif saat reduced-motion)
export default function Tilt({ as: Tag = 'div', children, ...p }) {
  const r = useRef(null);
  const move = (e) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const b = r.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    r.current.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 10}deg)`;
    r.current.style.setProperty('--mx', `${x * 100}%`); r.current.style.setProperty('--my', `${y * 100}%`);
  };
  return <Tag ref={r} onMouseMove={move} onMouseLeave={() => { r.current.style.transform = ''; }} style={{ transition: 'transform .15s' }} {...p}>{children}</Tag>;
}
