import CodeSnippet from './CodeSnippet.jsx';
import { useI18n } from '../../i18n/index.jsx';
import { useEffect, useState } from 'react';
// Grafik bahasa dihitung dari semua repo GitHub (via backend)
export default function TechStack() {
  const { t } = useI18n();
  const [langs, setLangs] = useState(null);
  useEffect(() => {
    fetch('/api/github/languages').then((r) => r.json())
      .then((d) => setLangs(d.fallback ? {} : d)).catch(() => setLangs({}));
  }, []);
  const total = Object.values(langs || {}).reduce((a, b) => a + b, 0);
  return (
    <section id="tech"><h2>{t('h_tech')}</h2>
      <div className="glass">
        {!langs ? <p>Memuat…</p> : !total ? <p>Data bahasa belum tersedia.</p> :
          Object.entries(langs).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
            <div key={k} style={{ marginBottom: 10 }}><span className="mono">{k} {((v / total) * 100).toFixed(1)}%</span>
              <div className="bar" style={{ width: '100%', margin: '4px 0' }}><i style={{ width: `${(v / total) * 100}%`, animation: 'none' }} /></div></div>
          ))}
      </div><CodeSnippet /></section>
  );
}
