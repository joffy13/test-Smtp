import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private mailerService: MailerService) {}
  @Post()
  sendMail() {
    return 'ok';
  }
}
