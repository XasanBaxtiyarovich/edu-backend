import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from './entities';
import { RoomService } from './room.service';
import { RoomsController } from './room.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Room
      ]
    )
  ],
  controllers: [RoomsController],
  providers: [RoomService],
})
export class RoomModule {}