import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './dto';


@Controller('room')
export class RoomsController {
  constructor(private readonly roomService: RoomService) {}

  // Create Room
  @Post('create')
  createRoom(
    @Body() CreateRoomDto: CreateRoomDto
  ): Promise<Object> {
    return this.roomService.createRoom(CreateRoomDto);
  }

  // Find All Room
  @Get('find')
  findAllRoom(): Promise<Object> {
    return this.roomService.findAllRoom();
  }

  // Find By ID Room
  @Get('find/:id')
  findOneRoom(
    @Param('id') id: number
  ): Promise<Object> {
    return this.roomService.findOneRoom(id);
  }

  // Update BY ID, One Room
  @Put('update/:id')
  updateRoom(
    @Param('id') id: number, 
    @Body() UpdateRoomDto: UpdateRoomDto,
  ): Promise<Object> {
    return this.roomService.updateRoom(id, UpdateRoomDto);
  }

  // Remove BY ID, One Room
  @Delete('remove/:id')
  removeRoom(
    @Param('id') id: number
  ): Promise<Number | Object> {
    return this.roomService.removeRoom(id);
  }

  // Searche One Room
  @Get('search')
  searcheRoom(
    @Param('name') name: string
  ): Promise<Object> {
    return this.roomService.searcheRoom(name);
  }
}