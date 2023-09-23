import { Injectable, BadRequestException } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { InjectFirebaseAdmin,FirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class StorageService {
  
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin
  ){}
/*
  async uploadFile(fileName: string, base64: string):Promise<string>{
    const bucket = this.firebase.storage.bucket()
    const file = bucket.file(this.renameFile(fileName));
    const buffer = Buffer.from(base64,'base64')
    await file.save(buffer,{
      metadata:{
        resumable: false,
      }
    })
    const downloadUrl = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });   
    return downloadUrl.pop();
  }*/

  async uploadFile(fileName: string, base64: string):Promise<string>{
    const decodedData = Buffer.from(base64, 'base64');
    const name = this.renameFile(fileName);
    await writeFile(`./public/files/${name}`, decodedData);
    return `${process.env.DOMAIN}/files/${name}`
  }

  private renameFile(nameFile:string):string{
    const split = nameFile.split('.')
    if(split.length === 0 || split.length === 1) throw new BadRequestException('El nombre del archivo debe tener una extensión como .jpeg, .pdf, etc')
    const newName = `${Date.now()}.${split.pop()}`
    return newName
  }
}
