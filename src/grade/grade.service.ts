import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GradeModel } from './model/grade.schema';
import mongoose, { Model } from 'mongoose';
import { Parallel } from 'src/parallel/model/parallel.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectModel(GradeModel.name) private readonly gradeModel: Model<GradeModel>,
    @InjectModel(Parallel.name) private readonly parallelModel: Model<Parallel>,
    ) {}

  async create(createGradeDto: CreateGradeDto) {
    const newGrade = await this.gradeModel.create({
      name: createGradeDto.name,
      description: createGradeDto.description,
      subjects: createGradeDto.subjects,
    });

    return newGrade;
  }

  async findAll(schoolTermId: string): Promise<GradeModel[]> {
    const objectIdSchoolTermId = new mongoose.Types.ObjectId(schoolTermId);

    try {
      const courses = await this.gradeModel.find().lean();

      const parallelQuery = {
        $or: [
          { _schoolTerm: objectIdSchoolTermId },
          { _schoolTerm: null }
        ]
      };

      const allParallels = await this.parallelModel
        .find(parallelQuery)
        .populate('_professor')
        .populate('_schoolTerm')
        .lean();

      const result = courses.map(course => {
        const courseParallels = allParallels.filter(parallel =>
          parallel._grade.toString() === course._id.toString()
        );

        return {
          _id: course._id,
          name: course.name,
          description: course.description,
          subjects: course.subjects,
          parallels: courseParallels.map(parallel => ({
            _id: parallel._id,
            name: parallel.name,
            quotas: parallel.quotas,
            status: parallel.status,
            _grade: parallel._grade,
            schoolterm: [parallel._schoolTerm],
            professors: [parallel._professor],
          })),
        };
      });

      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  
  async update(id: string, updateGradeDto: UpdateGradeDto) {
    const updatedGrade = await this.gradeModel.findByIdAndUpdate(id, {
      name: updateGradeDto.name,
      description: updateGradeDto.description,
      subjects: updateGradeDto.subjects,
    });

    return updatedGrade;
  }

  async remove(id: string) {
    return await this.gradeModel.findByIdAndDelete(id);
  }
}
