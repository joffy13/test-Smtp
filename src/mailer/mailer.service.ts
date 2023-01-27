import * as nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { MailPurpose } from 'src/common/models/enums/mail-purpose.enum';
import SMTPTransport, { Options } from 'nodemailer/lib/smtp-transport';
import * as handlebars from 'handlebars';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailerService implements OnModuleInit {
  private nodemailer: nodemailer.Transporter;

  onModuleInit(): void {
    this.nodemailer = nodemailer.createTransport(
      <SMTPTransport.Options>{
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

  public async sendMail(
    options: Options,
    purpose: MailPurpose,
    variables?: ReadonlyMap<string, string>,
  ) {
    return new Promise((resolve, reject) =>
      this.nodemailer.sendMail(
        {
          to: options.to,
          subject: options.subject,
          html: this.getMailTemplate(purpose, variables),
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
  }

  private getMailTemplate(
    purpose: MailPurpose,
    variables?: ReadonlyMap<string, string>,
  ): string {
    const template = handlebars.compile(
      fs.readFileSync(path.resolve(__dirname, `mails/${purpose}.hbs`), 'utf8'),
    );
    return template(variables);
  }
}
