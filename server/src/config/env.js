import 'dotenv/config'; // Satu-satunya tempat membaca .env
export const env = {
  port: process.env.PORT || 4000,
  origins: (process.env.CORS_ORIGINS || 'http://localhost:5173').split(','),
  ghUser: process.env.GITHUB_USER || 'MokioGeki-ID',
  ghToken: process.env.GITHUB_TOKEN || '',
  smtp: { host: process.env.SMTP_HOST, port: +process.env.SMTP_PORT || 465, user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  contactTo: process.env.CONTACT_TO || 'mokiogeki@gmail.com',
};
