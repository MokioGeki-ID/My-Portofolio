import { useI18n } from '../../i18n/index.jsx';
const items = [
  ['TK Al-Fatah'], ['SDN Ciomas 02'],
  ['MTs Darul Ihya', 'Cinematography, Paskibra'],
  ['SMKN 01 Ciomas', 'English Club, Paskibra'],
];
export default function Education() {
  const { t } = useI18n();
  return (
    <section id="education"><h2>{t('h_edu')}</h2>
      {items.map(([a, b]) => <div key={a} className="tl" style={{ paddingBottom: 24 }}><h3>{a}</h3>{b && <p>{t('extra')}: {b}</p>}</div>)}</section>
  );
}
