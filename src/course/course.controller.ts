import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { Course } from './entities';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto'


@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Create Course
  @ApiOperation({summary: 'Create course'})
  @ApiResponse({status: 200, type: Course})
  @Post('create')
  createCourse(
    @Body() createCourseDto: CreateCourseDto
  ): Promise<Object> {
    return this.courseService.createCOURSE(createCourseDto);
  }

  // Find All Courses
  @ApiOperation({summary: 'Find all course'})
  @ApiResponse({status: 200, type: [Course]})
  @Get('find')
  findAllCOURSE(): Promise<Object> {
    return this.courseService.findAllCOURSE();
  }

  // Find One Course
  @ApiOperation({summary: 'Find one course'})
  @ApiResponse({status: 200, type: Course})
  @Get('find/:id')
  findOneCourse(
    @Param('id') id: number
  ): Promise<Object> {
    return this.courseService.findOneCourse(id);
  }

  // Update One Course
  @ApiOperation({summary: 'Update one course'})
  @ApiResponse({status: 200, type: Course})
  @Put('update/:id')
  updateCourse(
    @Param('id') id: string, 
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Object> {
    return this.courseService.updateCOURSE(+id, updateCourseDto);
  }

  // Remove One Course
  @ApiOperation({summary: 'Remove course'})
  @ApiResponse({status: 200, type: Course})
  @Delete('delete/:id')
  removeCourse(
    @Param('id') id: string
  ): Promise<Number | Object> {
    return this.courseService.removeCOURSE(+id);
  }

  // Searche One Teacher
  @ApiOperation({summary: 'Searche course'})
  @ApiResponse({status: 200, type: Course})
  @Get('search/:name')
  searchCourses(
    @Param('name') name: string
  ): Promise<Object> {
    return this.courseService.searchCourses(name);
  }
}