import nodemailer from "nodemailer"

export default async function sendMail({ from = process.env.MAILER_FROM, to, subject, text, html }) {
  
  let testAccount = await nodemailer.createTestAccount();

  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: true,
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASSWORD, // generated ethereal password
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}