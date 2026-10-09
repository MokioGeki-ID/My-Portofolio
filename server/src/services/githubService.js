import NodeCache from 'node-cache';
import { env } from '../config/env.js';
const cache = new NodeCache({ stdTTL: 600 }); // cache 10 menit
// Ambil JSON dari GitHub REST API (dengan cache); melempar error jika gagal/limit
async function get(path) {
  const hit = cache.get(path);
  if (hit) return hit;
  const r = await fetch(`https://api.github.com${path}`, {
    headers: { 'User-Agent': 'portfolio', Accept: 'application/vnd.github+json', ...(env.ghToken && { Authorization: `Bearer ${env.ghToken}` }) },
  });
  if (!r.ok) throw new Error(`GitHub ${r.status}`);
  const d = await r.json();
  cache.set(path, d);
  return d;
}
export async function profile() {
  const d = await get(`/users/${env.ghUser}`);
  return { login: d.login, name: d.name, avatar: d.avatar_url, url: d.html_url, repos: d.public_repos };
}
export async function repos() {
  const d = await get(`/users/${env.ghUser}/repos?per_page=100&sort=updated`);
  return d.filter((x) => !x.fork).map((x) => ({
    name: x.name, description: x.description, language: x.language, topics: x.topics,
    stars: x.stargazers_count, updated: x.updated_at, url: x.html_url, site: siteOf(x),
  }));
}
// Total byte per bahasa dari semua repo asli
export async function languages() {
  const list = (await repos()).slice(0, 30);
  const all = await Promise.all(list.map((x) => get(`/repos/${env.ghUser}/${x.name}/languages`).catch(() => ({}))));
  const total = {};
  for (const l of all) for (const [k, v] of Object.entries(l)) total[k] = (total[k] || 0) + v;
  return total;
}

const MAP = { react: 'React', vue: 'Vue', next: 'Next.js', express: 'Express', vite: 'Vite', tailwindcss: 'Tailwind CSS', 'laravel/framework': 'Laravel', flask: 'Flask', django: 'Django', fastapi: 'FastAPI' };
// Ambil file mentah dari repo (tanpa kuota API), di-cache; kosong jika file tidak ada
async function raw(name, f) {
  const key = `raw:${name}:${f}`;
  if (cache.has(key)) return cache.get(key);
  const r = await fetch(`https://raw.githubusercontent.com/${env.ghUser}/${name}/HEAD/${f}`);
  const txt = r.ok ? await r.text() : '';
  cache.set(key, txt);
  return txt;
}
// Simpulkan teknologi dari file dependensi
async function stack(name) {
  const out = new Set();
  for (const f of ['package.json', 'composer.json', 'requirements.txt']) {
    const txt = await raw(name, f);
    if (!txt) continue;
    if (f === 'requirements.txt') {
      txt.split('\n').forEach((l) => { const k = l.split(/[=<>~\s]/)[0].toLowerCase(); if (MAP[k]) out.add(MAP[k]); });
    } else {
      try { const j = JSON.parse(txt); Object.keys({ ...j.dependencies, ...j.devDependencies, ...j.require }).forEach((k) => MAP[k] && out.add(MAP[k])); } catch { /* JSON tidak valid */ }
    }
  }
  return [...out];
}
// URL situs: kolom Website repo, atau GitHub Pages jika aktif
function siteOf(x) {
  let u = (x.homepage || '').trim();
  if (u && !/^https?:\/\//.test(u)) u = `https://${u}`;
  if (!u && x.has_pages) { const g = env.ghUser.toLowerCase(); u = x.name.toLowerCase() === `${g}.github.io` ? `https://${g}.github.io/` : `https://${g}.github.io/${x.name}/`; }
  return u;
}
// Cek apakah situs benar-benar bisa diakses (di-cache)
async function alive(url) {
  if (!url) return false;
  const key = `alive:${url}`;
  if (cache.has(key)) return cache.get(key);
  let ok = false;
  try { const r = await fetch(url, { signal: AbortSignal.timeout(5000) }); ok = r.status < 400; } catch { ok = false; }
  cache.set(key, ok);
  return ok;
}
export async function reposWithStack() {
  const list = await repos();
  return Promise.all(list.map(async (x, i) => ({ ...x, stack: i < 12 ? await stack(x.name) : [], live: await alive(x.site) })));
}
