import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Only POST allowed" });
  }

  try {
    const { sugar, type, date, time, notes } = req.body || {};

    if (!sugar || !type || !date || !time) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields: sugar, type, date, time",
      });
    }

    // ✅ Check env vars
    const requiredVars = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_SECURE",
      "SMTP_USER",
      "SMTP_PASS",
      "MAIL_TO",
    ];

    const missing = requiredVars.filter((k) => !process.env[k]);
    if (missing.length > 0) {
      return res.status(500).json({
        ok: false,
        error: `Missing env vars: ${missing.join(", ")}`,
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `Chore Request: ${type}`;

    const text = `You have a ${type} request.

Sugar: ${sugar}
Date: ${date}
Time: ${time}

Additional Notes:
${notes || "None"}
`;

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      subject,
      text,
    });

    return res.status(200).json({
      ok: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (err) {
    console.error("SEND EMAIL ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: err.message || "Internal server error",
    });
  }
}
