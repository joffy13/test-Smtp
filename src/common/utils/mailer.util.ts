import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const mailer = nodemailer.createTransport(
  {
    host: process.env.MAILER_HOST,
    port: +process.env.MAILER_PORT,
    secure: +process.env.MAILER_PORT === 465, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_EMAIL, // generated ethereal user
      pass: process.env.MAILER_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  {
    from: {
      name: process.env.MAILER_SENDER_NAME,
      address: process.env.MAILER_EMAIL,
    },
  },
);
