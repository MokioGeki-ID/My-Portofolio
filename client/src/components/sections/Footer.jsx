import socials from '../../config/socials.js';
export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '80px 20px 180px' }}>
      <p>{['hero', 'projects', 'achievements', 'contact'].map((id) => <a key={id} href={`#${id}`} style={{ marginRight: 12 }}>{id}</a>)}</p>
      <p>{socials.filter((s) => s.url).map((s) => <a key={s.name} href={s.url} style={{ marginRight: 12 }}>{s.name}</a>)}</p>
      <p>© {new Date().getFullYear()} MokioGeki-ID</p>
      <a className="btn" href="#hero">Kembali ke atas</a>
    </footer>
  );
}
