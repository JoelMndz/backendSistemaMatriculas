import { Module } from '@nestjs/common';
import { ParallelService } from './parallel.service';
import { ParallelController } from './parallel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parallel, ParallelSchema } from './model/parallel.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolTermModule } from 'src/school-term/school-term.module';
import { SchoolTerm, SchoolTermSchema } from 'src/school-term/model/school-term.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parallel.name, schema: ParallelSchema }]),
    MongooseModule.forFeature([{ name: SchoolTerm.name, schema: SchoolTermSchema }]),
    AuthModule,
    SchoolTermModule
  ],
  controllers: [ParallelController],
  providers: [ParallelService],
})
export class ParallelModule {}
