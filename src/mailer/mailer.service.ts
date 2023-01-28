import * as nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import * as handlebars from 'handlebars';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MailerInterface } from './mailer.interface';
import { SendResultDto } from './dto/send-result.dto';
import { MailPurpose } from 'src/common/models/enums/mail-purpose.enum';

dotenv.config();

@Injectable()
export class MailerService implements MailerInterface, OnModuleInit {
  private nodemailer: nodemailer.Transporter;

  onModuleInit(): void {
    this.nodemailer = nodemailer.createTransport(
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
  }

  public async sendEmail(email: string): Promise<SendResultDto> {
    const mail = await new Promise((resolve, reject) =>
      this.nodemailer.sendMail(
        {
          to: email,
          subject: 'send email',
          html: this.getMailTemplate(MailPurpose.SEND_MAIL),
        },
        (error: any, info: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(info.response.split(' ')[2]);
          }
        },
      ),
    );
    return {
      email,
      status: mail,
    };
  }

  private getMailTemplate(purpose: MailPurpose): string {
    const template = handlebars.compile(
      fs.readFileSync(path.resolve(__dirname, `mails/${purpose}.hbs`), 'utf8'),
    );
    return template(null);
  }
}
