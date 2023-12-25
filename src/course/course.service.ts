import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Course }  from './entities';
import { CreateCourseDto, UpdateCourseDto } from './dto';


@Injectable()
export class CourseService {
  constructor( @InjectRepository(Course)private courseRepository: Repository<Course> ){}

  async createCOURSE(createCourseDto: CreateCourseDto): Promise<Object> {    
    const  [course]  = await this.courseRepository.findBy({ name: createCourseDto.name });
    if (course) return {
                         message: 'This course already exists',
                         status: HttpStatus.CONFLICT
                       };

    const newCourse = await this.courseRepository.save(createCourseDto);

    return {
            message: 'Create successfully',
            book: newCourse,
            status: HttpStatus.OK
           };
  }

  async findAllCOURSE(): Promise<Object> {
    const courses = await this.courseRepository.find();

    if(courses.length === 0) return {
                                      message: 'COURSES Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            courses,
            status: HttpStatus.OK
           };
  }

  async findOneCourse(id: number): Promise<Object> {
    const [ course ] = await this.courseRepository.findBy({ course_id: id });
    if (!course) return {
                          message: 'Course Not Found',
                          status: HttpStatus.NOT_FOUND
                        };
    return {
            course,
            status: HttpStatus.OK
           };
  }

  async updateCOURSE(id: number, updateCourseDto: UpdateCourseDto): Promise<Object> {
    const [ course ] = await this.courseRepository.findBy({ course_id: id });
    if (!course) return {
                          message: 'Course Not Found',
                          status: HttpStatus.NOT_FOUND
                        };
    
    await this.courseRepository.update(
      { 
        course_id: id
      },
      {
        ...updateCourseDto
      }
    );

    const [ updateRoom ] =  await this.courseRepository.findBy({ course_id: id });

    return {
            book: updateRoom,
            status: HttpStatus.OK
           };
  }

  async removeCOURSE(id: number): Promise<HttpStatus | Object> {
    const [ course ] = await this.courseRepository.findBy({ course_id: id });
    if (!course) return {
                          message: 'Course Not Found',
                          status: HttpStatus.NOT_FOUND
                        };

    await this.courseRepository.delete({ course_id: id });

    return HttpStatus.OK;
  }

  async searchCourses(name: string): Promise<Object> {
    const course = await this.courseRepository.find({
      where : {
        name : Like(`%${name}%`)
      }
    });

    if (course.length === 0) return {
                                      message: 'Course Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            course
           };
  }
}