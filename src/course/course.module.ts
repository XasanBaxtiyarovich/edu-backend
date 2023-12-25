import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from './entities';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';


@Module({
  imports: [
  TypeOrmModule.forFeature(
      [
        Course
      ]
    )
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}