import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { GradeModule } from './grade/grade.module';
import { ElectivePeriodModule } from './elective-period/elective-period.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    ServicesModule,
    GradeModule,
    ElectivePeriodModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
