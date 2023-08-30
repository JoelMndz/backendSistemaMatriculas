import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentSchema } from './model/enrollment.entity';
import { StudentSchema } from 'src/student/model/student.model';
import { ParallelSchema } from 'src/parallel/model/parallel.entity';
import { SchoolTermSchema } from 'src/school-term/model/school-term.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Enrollment', schema: EnrollmentSchema },
      { name: 'Student', schema: StudentSchema },
      { name: 'Parallel', schema: ParallelSchema },
      { name: 'SchoolTerm', schema: SchoolTermSchema}
    ])
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
