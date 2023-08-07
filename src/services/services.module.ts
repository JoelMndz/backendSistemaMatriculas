import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EmailService } from './email.service';

@Module({
  providers: [EventService, EmailService]
})
export class ServicesModule {}
