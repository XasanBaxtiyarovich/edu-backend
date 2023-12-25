import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { StudentGroup } from './entities';
import { CreateStudentGroupDto, UpdateStudentGroupDto } from './dto';


@Injectable()
export class StudentGroupService {
  constructor(@InjectRepository(StudentGroup)private studentGroupRepo: Repository<StudentGroup> ){}

  async create_student_group(createStudentGroupDto: CreateStudentGroupDto): Promise<Object> {
    const new_student_group = await this.studentGroupRepo.save({...createStudentGroupDto});

    return {
            message: 'Create successfully',
            status: HttpStatus.OK,
            new_student_group
           };
  }

  async find_student_groups(): Promise<Object> {
    const student_groups = await this.studentGroupRepo.find();

    if (student_groups.length === 0) return {
                                              message: 'Students Groups Not Found',
                                              status: HttpStatus.NOT_FOUND
                                            };
    return {
            status: HttpStatus.OK,
            student_groups
           }
  }

  async find_one_student_group(id: number): Promise<Object> {
    const student_group = await this.studentGroupRepo.findBy({ id });

    if (!student_group) return {
                                  message: 'Student Group Not Found',
                                  status: HttpStatus.NOT_FOUND
                               };
    return {
            status: HttpStatus.OK,
            student_group
           }
  }

  async update_student_group(id: number, updateStudentGroupDto: UpdateStudentGroupDto): Promise<Object> {
    const [ student_group ] = await this.studentGroupRepo.findBy({ id });

    if(!student_group) return {
                          message: 'Student Group not found',
                          status: HttpStatus.NOT_FOUND
                         };
    
    await this.studentGroupRepo.update(
      { 
        id
      },
      {
        ...updateStudentGroupDto
      }
    );

    const update_student_group = await this.studentGroupRepo.findBy({ id });

    return {
            status: HttpStatus.OK,
            update_student_group
           }
  }

  async remove_student_group(id: number): Promise<HttpStatus> {
    const [ student_group ] = await this.studentGroupRepo.findBy({ id });
    if(!student_group) return HttpStatus.NOT_FOUND;

    await this.studentGroupRepo.delete({ id });

    return HttpStatus.OK;
  } 
}