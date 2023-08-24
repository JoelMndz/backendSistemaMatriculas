import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './model/student.model';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/createStudent.dto';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
    private storage: StorageService
  ){}

  async getAll(){
    return await this.studentModel
      .find({status: true})
    
  }

  async create(studentDto:CreateStudentDto){
    const {cedulaFile, bulletinFile} = studentDto
    const cedulaUrl = await this.storage.uploadFile(cedulaFile.fileName, cedulaFile.base64)
    const bulletinUrl = await this.storage.uploadFile(bulletinFile.fileName, bulletinFile.base64)
    return await this.studentModel.create({
      ...studentDto, 
      cedulaImageUrl: cedulaUrl,
      bulletinImageUrl: bulletinUrl,
    })
  }
}
