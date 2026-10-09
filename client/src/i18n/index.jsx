import { createContext, useContext, useState } from 'react';
// Kamus ID/EN. Teks Sambutan sengaja tidak ada di sini (selalu Inggris)
const dict = {
  id: { home: 'Beranda', about: 'Tentang', education: 'Pendidikan', skills: 'Skill', projects: 'Proyek', tech: 'Tech', achievements: 'Prestasi', socials: 'Sosial', faq: 'FAQ', contact: 'Kontak',
    cta1: 'Lihat Proyek', cta2: 'Hubungi Saya', skip: 'Lewati ke konten', roles_typed: ["Antusias React & Node.js","Selalu belajar, terus bertumbuh","Menuju Senior Full Stack Developer"], h_tools: "Tools yang Saya Pakai", j_title: "Perjalanan Menjadi Senior", j_text: "Sedang berproses dan terus belajar di dunia IT untuk menjadi Senior Full Stack Developer yang hebat.", j_now: "Level: Junior → Senior", role: "Peran", born: "Lahir", extra: "Ekskul", loading: "Memuat…", nodesc: "Tanpa deskripsi", faq_more: "Punya pertanyaan lain?", c_name: "Nama", c_email: "Email", c_msg: "Pesan", c_send: "Kirim", stat_repos: "Repo", stat_stars: "Bintang", stat_langs: "Bahasa", faq_items: [["Apa peran utama Anda?","Saya Junior Full Stack Developer dengan fokus pada React dan Node.js."],["Bisakah saya mengajak kolaborasi?","Tentu, silakan hubungi lewat form kontak, WhatsApp, atau email."],["Di mana saya bisa melihat kode proyek?","Semua proyek tersedia di akun GitHub MokioGeki-ID."]],
    h_about: 'Tentang Saya', h_edu: 'Riwayat Pendidikan', h_skills: 'Peran & Skill', h_projects: 'Proyek', h_tech: 'Tech Stack & Code', h_ach: 'Prestasi', h_soc: 'Sosial Media', h_contact: 'Kontak' },
  en: { home: 'Home', about: 'About', education: 'Education', skills: 'Skills', projects: 'Projects', tech: 'Tech', achievements: 'Awards', socials: 'Social', faq: 'FAQ', contact: 'Contact',
    cta1: 'View Projects', cta2: 'Contact Me', skip: 'Skip to content', roles_typed: ["React & Node.js Enthusiast","Always learning, always growing","Becoming a Senior Full Stack Developer"], h_tools: "Tools I Use", j_title: "The Road to Senior", j_text: "Still in progress and always learning in the IT world to become a great Senior Full Stack Developer.", j_now: "Level: Junior → Senior", role: "Role", born: "Born", extra: "Extracurricular", loading: "Loading…", nodesc: "No description", faq_more: "Have another question?", c_name: "Name", c_email: "Email", c_msg: "Message", c_send: "Send", stat_repos: "Repos", stat_stars: "Stars", stat_langs: "Languages", faq_items: [["What is your main role?","I am a Junior Full Stack Developer focusing on React and Node.js."],["Can I invite you to collaborate?","Of course, reach out via the contact form, WhatsApp, or email."],["Where can I see your project code?","All projects are available on the MokioGeki-ID GitHub account."]],
    h_about: 'About Me', h_edu: 'Education', h_skills: 'Roles & Skills', h_projects: 'Projects', h_tech: 'Tech Stack & Code', h_ach: 'Achievements', h_soc: 'Social Media', h_contact: 'Contact' },
};
const Ctx = createContext(null);
export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'id');
  const toggle = () => setLang((l) => { const n = l === 'id' ? 'en' : 'id'; localStorage.setItem('lang', n); return n; });
  return <Ctx.Provider value={{ lang, toggle, t: (k) => dict[lang][k] || k }}>{children}</Ctx.Provider>;
}
export const useI18n = () => useContext(Ctx);
