import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import githubRoutes from './routes/githubRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: env.origins })); // CORS whitelist dari .env
app.use(express.json({ limit: '10kb' }));
app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/github', githubRoutes);
app.use('/api/contact', contactRoutes);
app.listen(env.port, () => console.log(`Server siap di port ${env.port}`));
