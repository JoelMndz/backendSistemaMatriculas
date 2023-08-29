import { Injectable } from '@nestjs/common';
import {MailerService, ISendMailOptions} from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
  ){}

  async sendEmail(options:ISendMailOptions){
    await this.mailerService.sendMail(options)
  }
  
}
