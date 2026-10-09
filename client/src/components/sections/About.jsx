import Stats from './Stats.jsx';
import { useI18n } from '../../i18n/index.jsx';
import p from '../../config/profile.js';
export default function About() {
  const { t, lang } = useI18n();
  return (
    <section id="about"><h2>{t('h_about')}</h2>
      <div className="glass"><p>{lang === 'id' ? p.background : p.backgroundEn}</p><p>{t('role')}: {p.role}</p>
        {p.showBirthDate && <p>{t('born')}: {p.birthDate}</p>}</div><Stats /></section>
  );
}
