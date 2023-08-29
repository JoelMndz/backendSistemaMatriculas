import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Módulo usuario')
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
