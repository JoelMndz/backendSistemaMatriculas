import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './model/user.schema';
import { Model } from 'mongoose';
import { RegisterAdminDto } from 'src/auth/dto/registroAdminDto';
import { Role } from 'src/types';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>
  ){}

  async findUserByEmail(email:string){
    return await this.userModel.findOne({email: email})
  }

  async registerAdmin(userDto: RegisterAdminDto){
    const admin = await this.userModel.findOne({email: userDto.email})
    if(admin) throw new BadRequestException("Ya existe un administrador registrado!")
    userDto.password = await hash(userDto.password, 10);
    return await this.userModel.create({...userDto, role: Role.Admin})
  }

}