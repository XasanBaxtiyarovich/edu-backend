import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { StudentGroupService } from './student_group.service';
import { CreateStudentGroupDto, UpdateStudentGroupDto } from './dto';


@Controller('student-group')
export class StudentGroupController {
  constructor(private readonly studentGroupService: StudentGroupService) {}

  // Create Student Group
  @Post('create')
  create_student_group(
    @Body() createStudentGroupDto: CreateStudentGroupDto
  ): Promise<Object> {
    return this.studentGroupService.create_student_group(createStudentGroupDto);
  }

  // Find All Student Group
  @Get('find')
  find_student_groups(): Promise<Object> {
    return this.studentGroupService.find_student_groups();
  }

  // Find One Student Group
  @Get('find/:id')
  find_one_student_group(
    @Param('id') id: number
  ): Promise<Object> {
    return this.studentGroupService.find_one_student_group(id);
  }

  // Update One Student Group
  @Put(':id')
  update_student_group(
    @Param('id') id: number, 
    @Body() updateStudentGroupDto: UpdateStudentGroupDto
  ): Promise<Object> {
    return this.studentGroupService.update_student_group(id, updateStudentGroupDto);
  }

  // Remove One Student Group
  @Delete(':id')
  remove_student_group(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.studentGroupService.remove_student_group(id);
  }
}