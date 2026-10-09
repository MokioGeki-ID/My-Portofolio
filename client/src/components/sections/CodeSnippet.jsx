import { useEffect, useState } from 'react';
import cfg from '../../data/snippet.js';
const RE = /(\/\/.*$)|(['"`])(?:\\.|(?!\2).)*\2|\b(const|let|var|function|return|import|from|export|default|if|else|async|await|new|class)\b|\b\d+\b/gm;
// Syntax highlighting ringan buatan sendiri (tanpa dependensi)
function highlight(code) {
  const out = []; let last = 0, m; RE.lastIndex = 0;
  while ((m = RE.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const color = m[1] ? '#6b7a90' : m[2] ? '#7DD3FC' : m[3] ? '#8B5CF6' : '#22D3EE';
    out.push(<span key={m.index} style={{ color }}>{m[0]}</span>); last = RE.lastIndex;
  }
  out.push(code.slice(last)); return out;
}
export default function CodeSnippet() {
  const [code, setCode] = useState('');
  useEffect(() => {
    if (!cfg.repo) return;
    fetch(`https://raw.githubusercontent.com/MokioGeki-ID/${cfg.repo}/HEAD/${cfg.path}`).then((r) => r.text())
      .then((t) => setCode(t.split('\n').slice(0, 40).join('\n'))).catch(() => setCode('// gagal memuat kode'));
  }, []);
  // Sembunyikan jika belum dikonfigurasi (hanya tampil sebagai petunjuk saat development)
  if (!cfg.repo) return import.meta.env.DEV ? <p className="mono">TODO: isi src/data/snippet.js agar cuplikan kode tampil</p> : null;
  return <pre className="glass mono" style={{ overflow: 'auto', marginTop: 16 }}><code>{highlight(code)}</code></pre>;
}
