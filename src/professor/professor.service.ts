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
    if (!urlFile) throw new Error('Error uploading CV file, Create');

    return await this.modelProfesor.create({
      ...createProfessorDto,
      cv: urlFile,
    });
  }

  async findAll(): Promise<Professor[]> {
    return this.modelProfesor.find();
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    const findProfesorId = await this.modelProfesor.findById(id);
    if (!findProfesorId) throw new Error('id not find');

    const { cv } = updateProfessorDto;
    const urlFile = await this.serviceStorage.uploadFile(
      cv.fileName,
      cv.base64,
    );
    if (!urlFile) throw new Error('Error uploading CV file, Update');

    return await this.modelProfesor.findByIdAndUpdate(findProfesorId, {
      ...updateProfessorDto,
      cv: urlFile,
    });
  }

  async remove(id: string) {
    const findProfesorId = await this.modelProfesor.findById(id);
    if (!findProfesorId) throw new Error('id no encontrado');
    return this.modelProfesor.findByIdAndUpdate(findProfesorId, {
      status: false,
    });
  }
}
