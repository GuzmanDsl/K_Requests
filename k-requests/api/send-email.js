import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { type, date, time } = req.body;

    if (!type || !date || !time) {
      return res.status(400).json({ error: "Missing type/date/time" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

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

    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Failed to send email" });
  }
}
