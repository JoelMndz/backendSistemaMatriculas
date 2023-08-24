import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Professor, ProfessorSchema } from './model/professor.entity';
import { StorageModule } from 'src/storage/storage.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Professor.name, schema: ProfessorSchema }]),
    StorageModule,
    AuthModule
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
