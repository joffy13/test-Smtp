import { Address } from 'nodemailer/lib/mailer';

export class MailResultDto {
  readonly status: string;
  readonly email: string | Address;
}
