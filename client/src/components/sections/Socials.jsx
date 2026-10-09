import { useI18n } from '../../i18n/index.jsx';
import socials from '../../config/socials.js';
export default function Socials() {
  const { t } = useI18n();
  const list = socials.filter((s) => s.url);
  return (
    <section id="socials"><h2>{t('h_soc')}</h2>
      <div className="glass">{list.length ? list.map((s) => (
        <a key={s.name} className="btn" href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
      )) : <p>TODO: isi tautan di src/config/socials.js</p>}</div></section>
  );
}
