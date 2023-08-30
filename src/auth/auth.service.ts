import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { RegisterAdminDto } from './dto/registroAdminDto';
import { EmailService } from 'src/services/email.service';
import {generate} from "generate-password";
import { SendCodeRecoveryDto } from './dto/sendCodeRecovery.dto';
import { UpdatePasswordRecovery } from './dto/updatePasswordRecovery';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ){}

  async login(loginDto: LoginDto){
    const user = await this.userService.findUserByEmail(loginDto.email)
    if(!user) throw new UnauthorizedException()
    const isMatchPassword = await compare(loginDto.password, user.password)
    if(!isMatchPassword) throw new UnauthorizedException()
    const token = await this.jwtService.signAsync({_id: user._id, role: user.role })

    return{
      user,
      token
    }
  }

  async registerAdmin(registerAdminDto: RegisterAdminDto){
    const user = await this.userService.registerAdmin(registerAdminDto);

    const token = await this.jwtService.signAsync({_id: user._id, role: user.role })
    return {
      user: user,
      token
    }
  }

  async sendCodeRecovery({email}:SendCodeRecoveryDto){
    const user = await this.userService.findUserByEmail(email)
    if(!user)
      throw new BadRequestException('El email no existe!')

    const code = generate({numbers:true,length:4})
    await this.emailService.sendEmail({
      to:email,
      subject:'Recuperar contraseña',
      html:`
        <h1>Código: ${code}</h1>
      `
    })
    await this.userService.updateCodeRecovery(email,code)
    return {email}
  }

  async updatePasswordRecovery(updateDto:UpdatePasswordRecovery){
    return await this.userService.updatePasswordRecovery(updateDto)
  }
}
