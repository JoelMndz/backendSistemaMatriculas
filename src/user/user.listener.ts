import {Injectable} from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EmailService } from "src/services/email.service";
import { UserCreatedEvent } from "./events/user-created.event";

@Injectable()
export class UserListener{

  constructor(
    private emailService:EmailService
  ){}

  @OnEvent('user.created')
  async userCreatedListener(userCreated:UserCreatedEvent){
    await this.emailService.sendEmail({
      to: userCreated.email,
      subject: 'Bienvenido al sistema escolar',
      html: `
        <h3>Bievenido/a ${userCreated.firstName} ${userCreated.lastName}</h3>
        <p>
          Su contraseña es: <strong>${userCreated.password}</strong>
        </p>
        `
    })
  }
}