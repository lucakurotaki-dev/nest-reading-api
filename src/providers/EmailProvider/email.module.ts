import { Global, Module } from '@nestjs/common';
import { NodeMailerEmailService } from './nodemailer-email-service.provider';

@Global()
@Module({
  providers: [
    {
      provide: 'EmailService',
      useClass: NodeMailerEmailService,
    },
  ],
  exports: [
    {
      provide: 'EmailService',
      useClass: NodeMailerEmailService,
    },
  ],
})
export class EmailModule {}
