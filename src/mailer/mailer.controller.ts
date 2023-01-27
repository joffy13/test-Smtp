import { Body, Controller, Post } from '@nestjs/common';
import { Options } from 'nodemailer/lib/smtp-transport';
import { MailPurpose } from 'src/common/models/enums/mail-purpose.enum';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private mailer: MailerService) {}

  @Post()
  async sendMail(@Body() options: Options) {
    const info = await this.mailer.sendMail(options, MailPurpose.SEND_MAIL);
    return {
      message: `Successfully sent email to ${options.to}`,
      status: info,
    };
  }
}
