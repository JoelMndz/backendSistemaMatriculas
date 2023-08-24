import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './model/student.model';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/createStudent.dto';
import { StorageService } from 'src/storage/storage.service';
import { UpdateStudentDto } from './dto/updateStudent.dto';

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
      .populate('_representative1')
      .populate('_representative2')
  }

  async create(studentDto:CreateStudentDto){
    const {cedulaFile, bulletinFile} = studentDto
    const cedulaUrl = await this.storage.uploadFile(cedulaFile.fileName, cedulaFile.base64)
    const bulletinUrl = await this.storage.uploadFile(bulletinFile.fileName, bulletinFile.base64)
    const newStudent = await this.studentModel.create({
      ...studentDto, 
      cedulaImageUrl: cedulaUrl,
      bulletinImageUrl: bulletinUrl,
      _representative2: !!studentDto._representative2 ? studentDto._representative2 : null
    })

    return await this.studentModel
      .findById(newStudent._id)
      .populate('_representative1')
      .populate('_representative2')
  }

  async delete(id: string){
    return await this.studentModel.findByIdAndUpdate(id,{status:false})
  }

  async update(studentDto:UpdateStudentDto){
    const studentUpdate = await this.studentModel.findById(studentDto._id)
    if(!studentUpdate) throw new BadRequestException('El id no existe!')
    const {cedulaFile, bulletinFile} = studentDto
    if(cedulaFile)
      studentUpdate.cedulaImageUrl = await this.storage.uploadFile(cedulaFile.fileName, cedulaFile.base64)
    if(bulletinFile)
      studentUpdate.bulletinImageUrl = await this.storage.uploadFile(bulletinFile.fileName, bulletinFile.base64)
    Object.assign(studentUpdate, {...studentDto})
    await studentUpdate.save()
    return await this.studentModel
      .findById(studentUpdate._id)
      .populate('_representative1')
      .populate('_representative2')
  }
}
