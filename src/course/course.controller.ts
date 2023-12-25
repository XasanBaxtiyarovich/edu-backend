import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto'


@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Create Course
  @Post('create')
  createCourse(
    @Body() createCourseDto: CreateCourseDto
  ): Promise<Object> {
    return this.courseService.createCOURSE(createCourseDto);
  }

  // Find All Courses
  @Get('find')
  findAllCOURSE(): Promise<Object> {
    return this.courseService.findAllCOURSE();
  }

  // Find By ID Course
  @Get('find.BY-id/:id')
  findOneCourse(
    @Param('id') id: string
  ): Promise<Object> {
    return this.courseService.findOneCourse(+id);
  }

  // Update BY ID, One Course
  @Put('update/:id')
  updateCourse(
    @Param('id') id: string, 
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Object> {
    return this.courseService.updateCOURSE(+id, updateCourseDto);
  }

  // Remove BY ID, One Course
  @Delete('delete/:id')
  removeCourse(
    @Param('id') id: string
  ): Promise<Number | Object> {
    return this.courseService.removeCOURSE(+id);
  }

  // Searche One Teacher
  @Get('search')
  searchCourses(
    @Param('name') name: string
  ): Promise<Object> {
    return this.courseService.searchCourses(name);
  }
}