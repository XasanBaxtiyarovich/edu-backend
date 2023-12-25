import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentGroup } from './entities';
import { StudentGroupService } from './student_group.service';
import { StudentGroupController } from './student_group.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        StudentGroup
      ]
    )
  ],
  controllers: [StudentGroupController],
  providers: [StudentGroupService],
})
export class StudentGroupModule {}