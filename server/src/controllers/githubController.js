import * as gh from '../services/githubService.js';
// Jika GitHub gagal, kirim { fallback: true } agar klien memakai data statis
const handle = (fn) => async (_, res) => {
  try { res.json(await fn()); } catch { res.json({ fallback: true }); }
};
export const profile = handle(gh.profile);
export const repos = handle(gh.reposWithStack);
export const languages = handle(gh.languages);
