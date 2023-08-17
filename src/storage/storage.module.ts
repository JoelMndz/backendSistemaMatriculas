import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FirebaseModule } from 'nestjs-firebase';

@Module({
  imports:[
    FirebaseModule.forRoot({
      googleApplicationCredential: 'sistema-escolar-firebase-adminsdk.json',
      storageBucket: 'gs://sistema-escolar-abcda.appspot.com'
    })
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
