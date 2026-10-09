import { useEffect } from 'react';
import Wolf from './Wolf.jsx';
// Intro loader: bulan menyala, serigala melolong di depannya, progress bar cahaya bulan
export default function Loader({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="loader" role="status" aria-label="Memuat">
      <div style={{ display: 'grid', justifyItems: 'center' }}>
        <div className="moon" style={{ position: 'static', width: 170, height: 170 }} />
        <div style={{ marginTop: -90 }}><Wolf size={130} /></div>
      </div>
      <div className="bar"><i /></div>
    </div>
  );
}
