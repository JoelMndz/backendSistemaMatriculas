import { Body, Controller, Post } from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger/dist";
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/registroAdminDto';

@ApiTags('Módulo de autenticación')
@Controller('auth')
export class AuthController {
  
  constructor(
    private authService:AuthService
  ){}

  @Post('login')
  login(@Body() loginDto:LoginDto){
    return this.authService.login(loginDto)
  }

  @Post('register-admin')
  register(@Body() registerAdminDto: RegisterAdminDto){
    return this.authService.registerAdmin(registerAdminDto)
  }
}
