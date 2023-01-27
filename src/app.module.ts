import { Module } from '@nestjs/common';
import { MailerModule } from './modules/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
