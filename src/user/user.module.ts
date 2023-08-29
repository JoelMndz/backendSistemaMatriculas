import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './model/user.schema';
import { ServicesModule } from 'src/services/services.module';
import { UserListener } from './user.listener';

@Module({
  imports:[
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ServicesModule
  ],
  controllers: [UserController],
  providers: [UserService, UserListener],
  exports: [UserService]
})
export class UserModule {}
