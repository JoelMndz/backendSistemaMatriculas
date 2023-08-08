import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GradeModel } from './model/grade.schema';
import { Model } from 'mongoose';

@Injectable()
export class GradeService {
  constructor(
    @InjectModel(GradeModel.name)
    private readonly gradeModel: Model<GradeModel>,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    console.log(createGradeDto);

    return await this.gradeModel.create({
      name: createGradeDto.name,
      description: createGradeDto.description,
      materias: createGradeDto.grades,
    });
  }

  async findAll(): Promise<GradeModel[]> {
    return this.gradeModel.find();
  }

  async findOne(id: string) {
    return this.gradeModel.findById(id);
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    return await this.gradeModel.findByIdAndUpdate(
      id,
      {
        name: updateGradeDto.name,
        description: updateGradeDto.description,
        materias: updateGradeDto.grades,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return this.gradeModel.findByIdAndDelete(id);
  }
}
