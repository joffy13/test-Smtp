import { Injectable } from '@nestjs/common';
import { mailer } from 'src/common/utils/mailer.util';
import { mail } from 'src/mails/test-mail';
import { MailResultDto } from './dto/mail-result.dto';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailerService {
  async sendMail(dto: SendMailDto): Promise<MailResultDto> {
    const send = await mailer.sendMail({
      to: dto.email, // list of receivers
      subject: 'Email confirmation ✔', // Subject line
      html: mail(dto.message), // html body
    });
    return {
      email: send.accepted[0],
      status: send.response.split(' ')[2],
    };
  }
}
