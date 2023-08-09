import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeModel, GradeSchema } from './model/grade.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GradeModel.name, schema: GradeSchema }]),
    AuthModule,
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
