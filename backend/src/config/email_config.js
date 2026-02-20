import "dotenv/config";
import nodemailer from "nodemailer";
import AppError from "./AppError.js";

const SMTP_HOST = process.env.SMTP_HOST.trim();
const SMTP_USER = process.env.SMTP_USER.trim();
const SMTP_PASS = process.env.SMTP_PASS.trim();
const EMAIL_FROM = process.env.EMAIL_FROM.trim();

const SMTP_PORT = Number(String(process.env.SMTP_PORT || "587").trim()) || 587;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  throw new AppError("SMTP configuration is incomplete", 500, "SMTP_CONFIG_ERROR");
}

const is465 = SMTP_PORT === 465;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: is465,                    // 465 = implicit TLS
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  requireTLS: !is465,               // require STARTTLS on 587, not on 465
  // logger: true,                  // uncomment for deep debugging
  // debug: true,
});

// Optional but very useful: verify at startup
try {
  await transporter.verify();
  console.log("SMTP connection verified");
} catch (err) {
  console.error("SMTP verify failed:", err);
  throw new AppError("SMTP verify failed", 500, "SMTP_VERIFY_FAILED");
}

export default async function sendEmail({ to, subject, text, html }) {
  if (!to || !subject) {
    throw new AppError("Missing email recipient or subject", 400, "EMAIL_VALIDATION_ERROR");
  }

  try {
    return await transporter.sendMail({
      from: EMAIL_FROM || SMTP_USER,
      to,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("Nodemailer sendMail error:", {
      message: err?.message,
      code: err?.code,
      command: err?.command,
      response: err?.response,
      responseCode: err?.responseCode,
    });

    throw new AppError("Failed to send email", 502, "EMAIL_DELIVERY_FAILED");
  }
}