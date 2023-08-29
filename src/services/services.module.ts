import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    })
  ],
  providers: [EventService, EmailService],
  exports:[EventService, EmailService]
})
export class ServicesModule {}
