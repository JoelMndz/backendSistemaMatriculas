import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { GradeModule } from './grade/grade.module';
import { SchoolTermModule } from './school-term/school-term.module';
import { StorageModule } from './storage/storage.module';
import { RepresentativeModule } from './representative/representative.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    ServicesModule,
    GradeModule,
    SchoolTermModule,
    StorageModule,
    RepresentativeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
