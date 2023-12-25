import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Lesson } from './entities';
import { FilesService } from '../files/files.service';
import { CreateLessonDto, UpdateLessonDto } from './dto';


@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)private lessonRepository: Repository<Lesson>,
    private fileService: FilesService
  ){}

  async createLesson(createLessonDto: CreateLessonDto, image: any): Promise<Object> {
    const file = await this.fileService.createFile(image);

    const newLesson = await this.lessonRepository.save({ ...createLessonDto, video_url: `http://localhost:${process.env.API_PORT}/`+file });

    return {
            message: 'Create successfully',
            lesson: newLesson,
            status: HttpStatus.OK
           };
  }

  async findAllLesson(): Promise<Object> {
    const lessons = await this.lessonRepository.find();

    if(lessons.length === 0) return {
                                     message: 'Lessons Not Found',
                                     status: HttpStatus.NOT_FOUND
                                   };
    return {
            lessons,
            status: HttpStatus.OK
           };
  }

  async findOneLesson(id: number): Promise<Object> {
    const [ lesson ] = await this.lessonRepository.findBy({ lesson_id: id });

    if (!lesson) return {
                         message: 'Lesson Not Found',
                         status: HttpStatus.NOT_FOUND
                       };
    return {
            lesson,
            status: HttpStatus.OK
           };
  }

  async updateOneLesson(id: number, updateLessonDto: UpdateLessonDto, image: any): Promise<Object> {
    const file = await this.fileService.createFile(image);

    await this.lessonRepository.update(
      { 
        lesson_id: id
      },
      {
        ...updateLessonDto,
        video_url: `http://localhost:${process.env.API_PORT}/`+file
      }
    );

    const [ updateLesson ] =  await this.lessonRepository.findBy({ lesson_id: id });

    return {
            lesson: updateLesson,
            status: HttpStatus.OK
           };
  }

  async removeOneGroup(id: number): Promise<HttpStatus | Object> {
    const [ lesson ] = await this.lessonRepository.findBy({ lesson_id: id });
    if (!lesson) return {
                         message: 'Lesson Not Found',
                         status: HttpStatus.NOT_FOUND
                       };

    await this.lessonRepository.delete({ lesson_id: id });

    return HttpStatus.OK;
  }
}