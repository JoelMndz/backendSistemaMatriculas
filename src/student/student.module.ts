import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './model/student.model';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]),
    StorageModule,
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
