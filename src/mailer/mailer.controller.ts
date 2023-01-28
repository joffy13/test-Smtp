import { Body, Controller, Post } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import { SendResultDto } from './dto/send-result.dto';
import { MailerInterface } from './mailer.interface';

@Controller('mailer')
export class MailerController {
  constructor(private mailerService: MailerInterface) {}

  @Post()
  async sendEmail(@Body() dto: SendMailDto): Promise<SendResultDto> {
    return await this.mailerService.sendEmail(dto.email);
  }
}
