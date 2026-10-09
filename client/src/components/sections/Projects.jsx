import Tilt from '../ui/Tilt.jsx';
import { useI18n } from '../../i18n/index.jsx';
import { useEffect, useState } from 'react';
import fallback from '../../data/fallbackRepos.js';
import override from '../../data/projectsOverride.js';
// Kartu proyek diambil otomatis dari GitHub lewat backend
export default function Projects() {
  const { t } = useI18n();
  const [repos, setRepos] = useState(null);
  useEffect(() => {
    fetch('/api/github/repos').then((r) => r.json())
      .then((d) => setRepos(Array.isArray(d) ? d : fallback)).catch(() => setRepos(fallback));
  }, []);
  return (
    <section id="projects"><h2>{t('h_projects')}</h2>
      {!repos ? <p>{t('loading')}</p> : <div className="grid">
        {repos.filter((r) => !override[r.name]?.hidden).map((r) => {
          const o = override[r.name] || {};
          const site = o.website || (r.live ? r.site : ''); // situs otomatis dari kolom Website/GitHub Pages yang bisa diakses
          return (
            <Tilt as="article" key={r.name} className="glass"><h3>{r.name}</h3>
              <p>{r.description || t('nodesc')}</p>
              <p className="mono">{r.language || '-'} {r.stars ? `★ ${r.stars}` : ''}</p>
              {r.stack?.length > 0 && <p className="mono">{r.stack.join(' · ')}</p>}
              {o.role && <p>{t('role')}: {o.role}</p>}
              <a className="btn" href={r.url}>Lihat Kode</a>
              {site && <a className="btn" href={site} target="_blank" rel="noreferrer">View Website</a>}
              {o.apk && <a className="btn" href={o.apk}>Download APK</a>}
            </Tilt>
          );
        })}</div>}</section>
  );
}
