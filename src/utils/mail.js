import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'thuongnguyen.nlu78@gmail.com',
    pass: 'chkdskbong'
  }
}));

export const sendNewPassword = async (to, newPassword) => {
  const info = await transporter.sendMail({
    to: to,
		subject: 'Your code to get new password - Chillmusic',
    html: `<div>Your code is: ${newPassword}</div>`,
  });

  return true
}
