import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { FilesModule } from '../files/files.module';
import { LessonController } from './lesson.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Lesson
      ]
    ),
    FilesModule
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}