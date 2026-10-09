import { body } from 'express-validator';
// Validasi dan sanitasi input form kontak
export const contactRules = [
  body('name').trim().isLength({ min: 2, max: 80 }).escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('message').trim().isLength({ min: 5, max: 2000 }).escape(),
];
