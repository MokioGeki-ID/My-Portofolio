import { useEffect, useState } from 'react';
import Counter from '../ui/Counter.jsx';
import { useI18n } from '../../i18n/index.jsx';
// Statistik nyata dari repo GitHub
export default function Stats() {
  const { t } = useI18n();
  const [s, setS] = useState(null);
  useEffect(() => {
    fetch('/api/github/repos').then((r) => r.json()).then((d) => Array.isArray(d) && setS({
      repos: d.length, stars: d.reduce((a, x) => a + x.stars, 0), langs: new Set(d.map((x) => x.language).filter(Boolean)).size,
    })).catch(() => {});
  }, []);
  if (!s) return null;
  return <div className="flex gap-4 mt-4"><Counter to={s.repos} label={t('stat_repos')} /><Counter to={s.stars} label={t('stat_stars')} /><Counter to={s.langs} label={t('stat_langs')} /></div>;
}
