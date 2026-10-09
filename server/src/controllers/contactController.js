import { validationResult } from 'express-validator';
import { sendContact } from '../services/mailService.js';
export async function contact(req, res) {
  if (!validationResult(req).isEmpty()) return res.status(400).json({ error: 'Input tidak valid' });
  try { await sendContact(req.body); res.json({ ok: true }); } catch { res.status(500).json({ error: 'Gagal mengirim email' }); }
}
