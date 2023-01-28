import { SendResultDto } from './dto/send-result.dto';

export abstract class MailerInterface {
  abstract sendEmail(email: string): Promise<SendResultDto>;
}
