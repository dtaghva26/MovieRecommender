import "dotenv/config";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST?.trim();
const SMTP_USER = process.env.SMTP_USER?.trim();
const SMTP_PASS = process.env.SMTP_PASS?.trim();
const SMTP_PORT = Number(String(process.env.SMTP_PORT || "587").trim()) || 587;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  throw new Error("Missing/empty SMTP env vars");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  requireTLS: true,
});

export default async function sendEmail({ to, subject, text, html }) {
  if (!to || !subject) throw new Error("Missing to/subject");
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}
