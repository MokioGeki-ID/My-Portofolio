import { Router } from 'express';
import * as c from '../controllers/githubController.js';
const r = Router();
r.get('/profile', c.profile);
r.get('/repos', c.repos);
r.get('/languages', c.languages);
export default r;
