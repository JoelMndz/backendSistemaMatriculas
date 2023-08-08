import { Body, Controller, Post, Req, Get, UseGuards } from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger/dist";
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/registroAdminDto';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { IAuthGuardPayload } from 'src/types';

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

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  profile(@Req() req: Request & IAuthGuardPayload){
    return req.user;
  }
}
