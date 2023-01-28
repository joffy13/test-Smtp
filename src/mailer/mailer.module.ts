import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MailerInterface } from './mailer.interface';

@Global()
@Module({
  providers: [
    {
      provide: MailerInterface,
      useClass: MailerService,
    },
    ConfigService,
  ],
  controllers: [MailerController],
})
export class MailerModule {}
