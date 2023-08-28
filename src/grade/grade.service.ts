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
    const newGrade = await this.gradeModel.create({
      name: createGradeDto.name,
      description: createGradeDto.description,
      subjects: createGradeDto.subjects,
    });

    return newGrade;
  }

  async findAll(): Promise<GradeModel[]> {
    return await this.gradeModel.aggregate([
      {
        $lookup: {
          from: 'parallels',
          localField: '_id',
          foreignField: '_grade',
          as: 'parallels',
        },
      },
      {
        $lookup: {
          from: 'professors',
          localField: 'parallels._professor',
          foreignField: '_id',
          as: 'professors',
        },
      },
      {
        $unwind: {
          path: '$parallels',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          description: { $first: '$description' },
          subjects: { $first: '$subjects' },
          parallels: { $push: '$parallels' },
          professors: { $first: '$professors' },
        },
      },
      {
        $lookup: {
          from: 'schoolterms',
          localField: 'parallels._schoolTerm',
          foreignField: '_id',
          as: 'parallelSchoolterms',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          subjects: 1,
          parallels: {
            $map: {
              input: '$parallels',
              as: 'parallel',
              in: {
                $mergeObjects: [
                  '$$parallel',
                  {
                    schoolterm: {
                      $filter: {
                        input: '$parallelSchoolterms',
                        as: 'schoolterm',
                        cond: {
                          $eq: ['$$schoolterm._id', '$$parallel._schoolTerm'],
                        },
                      },
                    },
                  },
                  {
                    professors: {
                      $filter: {
                        input: '$professors',
                        as: 'professor',
                        cond: {
                          $eq: ['$$professor._id', '$$parallel._professor'],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]);
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
