import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
export async function sendContact({ name, email, message }) {
  const t = nodemailer.createTransport({ host: env.smtp.host, port: env.smtp.port, secure: true, auth: { user: env.smtp.user, pass: env.smtp.pass } });
  await t.sendMail({ from: env.smtp.user, to: env.contactTo, replyTo: email, subject: `Pesan portofolio dari ${name}`, text: `${name} <${email}>\n\n${message}` });
}
