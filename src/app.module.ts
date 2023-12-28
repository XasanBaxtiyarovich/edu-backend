import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';


import { Data } from './date/entities';
import { Room } from './room/entities';
import { Group } from './group/entities';
import { Course } from './course/entities';
import { Lesson } from './lesson/entities';
import { Person } from './persons/entities';
import { StudentGroup } from './student_group/entities';

import { RoomModule } from './room/room.module';
import { DateModule } from './date/date.module';
import { GroupModule } from './group/group.module';
import { LessonModule } from './lesson/lesson.module';
import { CourseModule } from './course/course.module';
import { PersonsModule } from './persons/persons.module';
import { StudentGroupModule } from './student_group/student_group.module';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }
    ),
    
    ServeStaticModule.forRoot(
      {
        rootPath: resolve(__dirname, 'static')
      }
    ),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ Person, Room, Course, Data, StudentGroup, Lesson, Group],
      synchronize: true,
    }),
    DateModule,
    RoomModule,
    GroupModule,
    LessonModule,
    CourseModule,
    PersonsModule,
    StudentGroupModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}