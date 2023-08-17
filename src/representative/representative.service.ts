import { Injectable,BadRequestException } from '@nestjs/common';
import { CreateRepresentativeDto } from './dto/createRepresentative.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RepresentativeModel } from './model/representative.model';
import { Model } from 'mongoose';
import { StorageService } from 'src/storage/storage.service';
import { UpdateRepresentativeDto } from './dto/updateRepresentative.dto';

@Injectable()
export class RepresentativeService {

  constructor(
    @InjectModel(RepresentativeModel.name)
    private readonly representativeModel:Model<RepresentativeModel>,
    private storage:StorageService,
  ){}

  async getAll(){
    return await this.representativeModel.find({status:true})
  }
  
  async create(representativeDto:CreateRepresentativeDto){
    const url = await this.storage.uploadFile(representativeDto.cedulaFile.fileName,representativeDto.cedulaFile.base64)
    return await this.representativeModel.create({...representativeDto, imageCedulaUrl:url})
  }

  async update(entityDto:UpdateRepresentativeDto){
    const entityUpdate = await this.representativeModel.findById(entityDto.id)
    if(!entityUpdate) throw new BadRequestException('El id no existe!')
    if(entityDto.cedulaFile)
      entityUpdate.imageCedulaUrl = await this.storage.uploadFile(entityDto.cedulaFile.fileName,entityDto.cedulaFile.base64)
    entityUpdate.cedula = entityDto.cedula
    entityUpdate.fullName = entityDto.fullName
    entityUpdate.email = entityDto.email
    await entityUpdate.save()
    return entityUpdate
  }

  async delete(id:string){
    const representative = await this.representativeModel.findByIdAndUpdate(id,{status:false})
    if(!representative) throw new BadRequestException('El id no existe!')
    return representative
  }
}
