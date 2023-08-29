import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeSchema } from './model/grade.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ParallelSchema } from 'src/parallel/model/parallel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GradeModel', schema: GradeSchema },
      { name: 'Parallel', schema: ParallelSchema },
    ]),
    AuthModule,
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
