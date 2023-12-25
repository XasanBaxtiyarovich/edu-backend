import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Data } from './entities';
import { DateService } from './date.service';
import { DateController } from './date.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Data
      ]
    ),
  ],
  controllers: [DateController],
  providers: [DateService],
})
export class DateModule {}