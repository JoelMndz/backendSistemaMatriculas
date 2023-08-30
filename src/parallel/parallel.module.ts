import { Module } from '@nestjs/common';
import { ParallelService } from './parallel.service';
import { ParallelController } from './parallel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parallel, ParallelSchema } from './model/parallel.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolTermModule } from 'src/school-term/school-term.module';
import { SchoolTerm, SchoolTermSchema } from 'src/school-term/model/school-term.entity';
import { GradeModel, GradeSchema } from 'src/grade/model/grade.schema';
import { Professor, ProfessorSchema } from 'src/professor/model/professor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Parallel', schema: ParallelSchema },
      { name: 'SchoolTerm', schema: SchoolTermSchema },
      { name: 'GradeModel', schema: GradeSchema },
      { name: 'Professor', schema: ProfessorSchema }
    ]),
    AuthModule,
    SchoolTermModule
  ],
  controllers: [ParallelController],
  providers: [ParallelService],
})
export class ParallelModule {}
