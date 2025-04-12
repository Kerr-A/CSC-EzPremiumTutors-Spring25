import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Loads environment variables from .env file

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,      // Your Gmail address
        pass: process.env.GMAIL_PASS       // App-specific password
      },
    });

    const mailOptions = {
      from: `"EzPremium Tutors" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};
