import { Router } from 'express';
import { contact } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/rateLimit.js';
import { contactRules } from '../middleware/validate.js';
const r = Router();
r.post('/', contactLimiter, contactRules, contact);
export default r;
