import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';

import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { CreateLessonDto, UpdateLessonDto } from './dto';


@ApiTags('lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  // Create lesson
  @ApiOperation({summary: 'Create lesson'})
  @ApiResponse({status: 200, type: Lesson})
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile() image: any
  ): Promise<Object> {
    return this.lessonService.createLesson(createLessonDto, image);
  }

  // Find All Lessons
  @ApiOperation({summary: 'Find all lessons'})
  @ApiResponse({status: 200, type: [Lesson]})
  @Get('find')
  findAllLesson(): Promise<Object> {
    return this.lessonService.findAllLesson();
  }

  // Find One Lesson
  @ApiOperation({summary: 'Find one lesson'})
  @ApiResponse({status: 200, type: Lesson})
  @Get('find/:id')
  findOne(
    @Param('id') id: string
  ): Promise<Object> {
    return this.lessonService.findOneLesson(+id);
  }

  // Update One Lesson
  @ApiOperation({summary: 'Update one lesson'})
  @ApiResponse({status: 200, type: Lesson})
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @UploadedFile() image: any
  ): Promise<Object> {
    return this.lessonService.updateOneLesson(+id, updateLessonDto, image);
  }

  // Remove One Lesson
  @ApiOperation({summary: 'Remove one lesson'})
  @ApiResponse({status: 200})
  @Delete('remove/:id')
  removeOneGroup(
    @Param('id') id: string
  ): Promise<Object | Number> {
    return this.lessonService.removeOneGroup(+id);
  }
}