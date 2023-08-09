import { Module } from '@nestjs/common';
import { SchoolTermService } from './school-term.service';
import { SchoolTermController } from './school-term.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolTerm, SchoolTermSchema } from './model/school-term.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchoolTerm.name, schema: SchoolTermSchema },
    ]),
    AuthModule,
  ],
  controllers: [SchoolTermController],
  providers: [SchoolTermService],
})
export class SchoolTermModule {}
