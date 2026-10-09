import data from '../../data/skills.js';
import tools from '../../data/tools.js';
import Tilt from '../ui/Tilt.jsx';
import Journey from './Journey.jsx';
import { useI18n } from '../../i18n/index.jsx';
export default function Skills() {
  const { t, lang } = useI18n();
  return (
    <section id="skills"><h2>{t('h_skills')}</h2>
      <p>{data.roles.map((r) => <span key={r} className="btn mono">{r}</span>)}</p>
      <div className="glass">
        <p>{data.skills.map(([n]) => <span key={n} className="btn mono">{n}</span>)}</p>
        {data.skills.filter(([, v]) => v > 0).map(([n, v]) => (
          <div key={n} style={{ marginBottom: 12 }}><span className="mono">{n}</span>
            <div className="bar" style={{ width: '100%', margin: '4px 0' }} role="progressbar" aria-label={n} aria-valuenow={v}><i style={{ width: `${v}%`, animation: 'none' }} /></div></div>
        ))}
      </div>
      <h3 style={{ marginTop: 32 }}>{t('h_tools')}</h3>
      <div className="grid">{tools.map((x) => <Tilt key={x.name} className="glass"><h3 className="mono">{x.name}</h3><p>{x[lang]}</p></Tilt>)}</div>
      <Journey />
    </section>
  );
}
