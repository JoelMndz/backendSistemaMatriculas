import { Module } from '@nestjs/common';
import { ElectivePeriodService } from './elective-period.service';
import { ElectivePeriodController } from './elective-period.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolTerm, SchoolTermSchema } from './model/elective-period.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchoolTerm.name, schema: SchoolTermSchema },
    ]),
    AuthModule,
  ],
  controllers: [ElectivePeriodController],
  providers: [ElectivePeriodService],
})
export class ElectivePeriodModule {}
