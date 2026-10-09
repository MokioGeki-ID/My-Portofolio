import { useI18n } from '../../i18n/index.jsx';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import p from '../../config/profile.js';
export default function Faq() {
  const { t } = useI18n();
  const [o, setO] = useState(null);
  return (
    <section id="faq"><h2>FAQ</h2>
      {t('faq_items').map(([q, a], i) => (
        <div key={q} className="glass" style={{ marginBottom: 12 }}>
          <button aria-expanded={o === i} onClick={() => setO(o === i ? null : i)} style={{ all: 'unset', cursor: 'pointer', fontWeight: 700, width: '100%' }}>{q}</button>
          <AnimatePresence>{o === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>{a}</motion.p>}</AnimatePresence>
        </div>
      ))}
      <p>{t('faq_more')}</p>
      {p.whatsapp && <a className="btn" href={`https://wa.me/${p.whatsapp}?text=${encodeURIComponent('Halo, saya ingin bertanya tentang portofolio Anda.')}`}>WhatsApp</a>}
      <a className="btn" href={`mailto:${p.email}`}>Email</a></section>
  );
}
