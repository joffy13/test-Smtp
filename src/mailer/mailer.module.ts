import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Global()
@Module({
  providers: [MailerService, ConfigService],
  controllers: [MailerController],
})
export class MailerModule {}
