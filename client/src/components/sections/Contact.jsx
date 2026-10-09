import { useI18n } from '../../i18n/index.jsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import p from '../../config/profile.js';
export default function Contact() {
  const { t } = useI18n();
  const { register, handleSubmit, reset } = useForm();
  const [st, setSt] = useState('');
  const send = async (d) => {
    setSt('Mengirim…');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
      if (!r.ok) throw 0;
      setSt('Terkirim, terima kasih!'); reset();
    } catch { setSt('Gagal mengirim, coba lagi.'); }
  };
  return (
    <section id="contact"><h2>{t('h_contact')}</h2>
      <form className="glass" onSubmit={handleSubmit(send)}>
        <input placeholder={t('c_name')} aria-label={t('c_name')} {...register('name', { required: true })} />
        <input type="email" placeholder={t('c_email')} aria-label={t('c_email')} {...register('email', { required: true })} />
        <textarea rows="5" placeholder={t('c_msg')} aria-label={t('c_msg')} {...register('message', { required: true })} />
        <button className="btn" type="submit">{t('c_send')}</button><span role="status">{st}</span>
      </form>
      <p>Atau email langsung: <a href={`mailto:${p.email}`}>{p.email}</a></p></section>
  );
}
