import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
// Kunang-kunang cyan (tsparticles); dimatikan saat reduced-motion
export default function Fireflies() {
  const [ok, setOk] = useState(false), reduce = useReducedMotion();
  useEffect(() => { initParticlesEngine(async (e) => { await loadSlim(e); }).then(() => setOk(true)); }, []);
  if (!ok || reduce) return null;
  return <Particles id="fireflies" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} options={{
    fullScreen: { enable: false }, background: { color: 'transparent' }, fpsLimit: 60,
    particles: { number: { value: 30 }, color: { value: '#22D3EE' }, opacity: { value: { min: 0.2, max: 0.8 }, animation: { enable: true, speed: 0.6 } }, size: { value: { min: 1, max: 3 } }, move: { enable: true, speed: 0.4, outModes: 'out' } },
  }} />;
}
