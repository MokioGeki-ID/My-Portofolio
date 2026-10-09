import rateLimit from 'express-rate-limit';
// Maksimal 5 permintaan per jam per IP
export const contactLimiter = rateLimit({ windowMs: 3600_000, max: 5, message: { error: 'Terlalu banyak permintaan' } });
