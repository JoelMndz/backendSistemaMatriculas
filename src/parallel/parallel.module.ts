import { Module } from '@nestjs/common';
import { ParallelService } from './parallel.service';
import { ParallelController } from './parallel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParallelSchema } from './model/parallel.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolTermModule } from 'src/school-term/school-term.module';
import { SchoolTermSchema } from 'src/school-term/model/school-term.entity';
import { GradeSchema } from 'src/grade/model/grade.schema';
import { ProfessorSchema } from 'src/professor/model/professor.entity';
import { EnrollmentSchema } from 'src/enrollment/model/enrollment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Parallel', schema: ParallelSchema },
      { name: 'SchoolTerm', schema: SchoolTermSchema },
      { name: 'GradeModel', schema: GradeSchema },
      { name: 'Professor', schema: ProfessorSchema },
      { name: 'Enrollment', schema: EnrollmentSchema }
    ]),
    AuthModule,
    SchoolTermModule
  ],
  controllers: [ParallelController],
  providers: [ParallelService],
})
export class ParallelModule {}
