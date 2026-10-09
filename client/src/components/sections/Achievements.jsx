import { useI18n } from '../../i18n/index.jsx';
import { useState, useEffect } from 'react';
import data from '../../data/achievements.js';
// Dua mode: sertifikat (galeri + lightbox) dan foto bersama prestasi
export default function Achievements() {
  const { t } = useI18n();
  const [tab, setTab] = useState('certificates'), [open, setOpen] = useState(null);
  const items = data[tab];
  const key = tab === 'certificates' ? 'image' : 'photo';
  useEffect(() => {
    if (open === null) return;
    const h = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % items.length);
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, items.length]);
  const cur = open !== null ? items[open] : null;
  return (
    <section id="achievements"><h2>{t('h_ach')}</h2>
      <div role="tablist">
        <button role="tab" aria-selected={tab === 'certificates'} className="btn" onClick={() => setTab('certificates')}>Sertifikat &amp; Piagam</button>
        <button role="tab" aria-selected={tab === 'photos'} className="btn" onClick={() => setTab('photos')}>Foto Bersama Prestasi</button>
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        {items.map((a, i) => (
          <button key={i} className="glass" onClick={() => setOpen(i)} style={{ cursor: 'pointer', color: 'inherit', textAlign: 'left' }}>
            {a[key] && <img src={a[key]} alt={a.title} loading="lazy" style={{ width: '100%' }} />}
            <h3>{a.title}</h3><p>{a.year} {a.organizer} {a.caption}</p>
          </button>
        ))}
      </div>
      {cur && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            {cur[key] && <img src={cur[key]} alt={cur.title} style={{ maxWidth: '90vw', maxHeight: '75vh' }} />}
            <p>{cur.title}</p>
            <button className="btn" onClick={() => setOpen((open - 1 + items.length) % items.length)}>Sebelumnya</button>
            <button className="btn" onClick={() => setOpen((open + 1) % items.length)}>Berikutnya</button>
            <button className="btn" onClick={() => setOpen(null)}>Tutup</button>
          </div>
        </div>
      )}
    </section>
  );
}
