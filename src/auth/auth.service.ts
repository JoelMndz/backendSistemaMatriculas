import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { RegisterAdminDto } from './dto/registroAdminDto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ){}

  async login(loginDto: LoginDto){
    const user = await this.userService.findUserByEmail(loginDto.email)
    if(!user) throw new UnauthorizedException()
    const isMatchPassword = await compare(loginDto.password, user.password)
    if(!isMatchPassword) throw new UnauthorizedException()
    const token = await this.jwtService.signAsync({_id: user._id})

    return{
      user,
      token
    }
  }

  async registerAdmin(registerAdminDto: RegisterAdminDto){
    const user = await this.userService.registerAdmin(registerAdminDto);

    const token = await this.jwtService.signAsync({_id: user._id })
    return {
      usuario: user,
      token
    }
  }
}
