import { Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './model/professor.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectModel(Professor.name)
    private readonly modelProfesor: Model<Professor>,
    private readonly serviceStorage: StorageService,
  ) {}

  async create(createProfessorDto: CreateProfessorDto) {
    const { cv } = createProfessorDto;
    const urlFile = await this.serviceStorage.uploadFile(
      cv.fileName,
      cv.base64,
    );
    if (!urlFile) throw new Error('Error subiendo el archivo');
    return await this.modelProfesor.create({
      ...createProfessorDto,
      cv: urlFile,
    });
  }

  async findAll(): Promise<Professor[]> {
    return this.modelProfesor.find({ status: true });
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    const findProfesorId = await this.modelProfesor.findById(id);
    if (!findProfesorId) throw new Error('id no encontrado');
    const { cv } = updateProfessorDto;
      if(cv){
        findProfesorId.cv = await this.serviceStorage.uploadFile(
        cv.fileName,
        cv.base64,
      );
    }
    findProfesorId.fullName = updateProfessorDto.fullName;
    findProfesorId.cedula = updateProfessorDto.cedula;
    findProfesorId.dateBirth = updateProfessorDto.dateBirth;
    findProfesorId.email = updateProfessorDto.email;
    findProfesorId.address = updateProfessorDto.address;
    findProfesorId.disability = updateProfessorDto.disability;
    await findProfesorId.save();
    return findProfesorId
  }

  async remove(id: string) {
    return await this.modelProfesor.findByIdAndUpdate(id, {
      status: false,
    });
  }
}
