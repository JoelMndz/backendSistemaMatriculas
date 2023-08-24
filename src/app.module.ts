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
import { ProfessorModule } from './professor/professor.module';
<<<<<<< HEAD
import { StudentModule } from './student/student.module';
=======
import { ParallelModule } from './parallel/parallel.module';
>>>>>>> c2b7f7abc2ba3488cc36b8a62d7ddb78dcee4def

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
    ProfessorModule,
<<<<<<< HEAD
    StudentModule,
=======
    ParallelModule,
>>>>>>> c2b7f7abc2ba3488cc36b8a62d7ddb78dcee4def
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
