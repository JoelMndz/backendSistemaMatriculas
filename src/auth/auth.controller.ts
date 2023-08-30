import { Body, Controller, Post, Req, Get, UseGuards, Put } from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger/dist";
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/registroAdminDto';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { IAuthGuardPayload } from 'src/types';
import { SendCodeRecoveryDto } from './dto/sendCodeRecovery.dto';
import { UpdatePasswordRecovery } from './dto/updatePasswordRecovery';
import { UserService } from 'src/user/user.service';

@ApiTags('Módulo de autenticación')
@Controller('auth')
export class AuthController {
  
  constructor(
    private authService:AuthService,
  ){}

  @Post('login')
  login(@Body() loginDto:LoginDto){
    return this.authService.login(loginDto)
  }

  @Post('register-admin')
  register(@Body() registerAdminDto: RegisterAdminDto){
    return this.authService.registerAdmin(registerAdminDto)
  }

  @Put('send-code-recovery')
  sendCodeRecovery(@Body() sendDto:SendCodeRecoveryDto){
    return this.authService.sendCodeRecovery(sendDto)
  }

  @Put('update-password-recovery')
  updatePasswordRecovery(@Body() updateDto:UpdatePasswordRecovery){
    return this.authService.updatePasswordRecovery(updateDto)
  }
}
