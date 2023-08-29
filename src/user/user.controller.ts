import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Módulo usuario')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService:UserService
  ){}

  @Get('get-all')
  getAll(){
    return this.userService.getAll()
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }
}
