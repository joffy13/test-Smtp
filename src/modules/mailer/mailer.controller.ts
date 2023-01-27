import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { MailResultDto } from './dto/mail-result.dto';
import { SendMailDto } from './dto/send-mail.dto';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private mailerService: MailerService) {}

  @Post()
  sendMail(@Body() dto: SendMailDto): Promise<MailResultDto> {
    return this.mailerService.sendMail(dto);
  }
}
