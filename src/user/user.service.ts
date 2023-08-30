import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.schema';
import { Model } from 'mongoose';
import { RegisterAdminDto } from 'src/auth/dto/registroAdminDto';
import { Role } from 'src/types';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { EventService } from 'src/services/event.service';
import { UserCreatedEvent } from './events/user-created.event';
import {generate} from "generate-password";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private eventService:EventService    
    ){}

  async getAll(){
    return await this.userModel.find()
  }

  async findUserByEmail(email:string){
    return await this.userModel.findOne({email: email})
  }

  async registerAdmin(userDto: RegisterAdminDto){
    if(await this.findUserByEmail(userDto.email)) throw new BadRequestException('El email ya está registrado!')
    if(await this.userModel.findOne({role: Role.Admin})) throw new BadRequestException("Ya existe un administrador registrado!")
    userDto.password = await hash(userDto.password, 10);
    return await this.userModel.create({...userDto, role: Role.Admin})
  }

  async createUser(createDto: CreateUserDto){
    const existUser = await this.findUserByEmail(createDto.email)
    if(existUser) throw new BadRequestException('El email ya se encuentra registrado!')
    
    const passwordGenerated = generate()
    const userCreated = await this.userModel.create({...createDto, password: await hash(passwordGenerated, 10)})

    this.eventService.emitUserCreated(
      new UserCreatedEvent(
        userCreated.firstName,
        userCreated.lastName,
        userCreated.email,
        passwordGenerated,
        userCreated.role as Role,
      )
    )
    return createDto
  }

  async delete(id:string){
    const user = await this.userModel.findByIdAndDelete(id)
    if(!user) throw new BadRequestException('El id no existe!')
    return user
  }
}