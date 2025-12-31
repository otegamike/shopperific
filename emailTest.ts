import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function testEmail() {
  await transporter.sendMail({
    from: `"Shopperific" <${process.env.EMAIL_USER}>`,
    to: "Kenxy3@gmail.com",
    subject: "Nodemailer test",
    text: "If you see this, email works 🎉",
  });

  console.log("Email sent");
}

testEmail().catch(console.error);

