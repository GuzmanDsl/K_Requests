import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());

// Serve your front-end files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

app.post("/send-email", async (req, res) => {
  try {
    const { type, date, time } = req.body;
    if (!type || !date || !time) {
      return res.status(400).json({ error: "Missing type/date/time" });
    }

    const subject = `Chore Request: ${type}`;
    const text = `You have a ${type} request.
Date: ${date}
Time: ${time}

Make sure to be ready and bring any necessary tools for the job!`;

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      subject,
      text,
    });

    res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to send email" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Running: http://localhost:${process.env.PORT || 3000}`);
});
