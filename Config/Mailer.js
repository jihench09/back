// src/config/mailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const user = process.env.EMAIL_USER || process.env.SMTP_USER;
const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

if (!user || !pass) {
  console.warn("⚠️ Missing EMAIL_USER/EMAIL_PASS (or SMTP_USER/SMTP_PASS) env vars");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,        // STARTTLS
  requireTLS: true,     // force upgrade to TLS
  auth: { user, pass }, // pass = App Password Gmail
  pool: true,
  maxConnections: 3,
  maxMessages: 100,

  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
});

// Optionnel: aide à diagnostiquer au boot (tu peux enlever après)
transporter.verify()
  .then(() => console.log("✅ SMTP ready"))
  .catch((err) => console.error("❌ SMTP verify failed:", err));

module.exports = transporter;
