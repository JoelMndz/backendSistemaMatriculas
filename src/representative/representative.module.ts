import { Module } from '@nestjs/common';
import { RepresentativeController } from './representative.controller';
import { RepresentativeService } from './representative.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Representative, RepresentativeSchema } from './model/representative.model';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Representative.name, schema: RepresentativeSchema}]),
    StorageModule,
  ],
  controllers: [RepresentativeController],
  providers: [RepresentativeService]
})
export class RepresentativeModule {}
