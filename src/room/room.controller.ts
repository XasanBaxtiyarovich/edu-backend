import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { Room } from './entities';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './dto';


@ApiTags('Room')
@Controller('room')
export class RoomsController {
  constructor(private readonly roomService: RoomService) {}

  // Create Room
  @ApiOperation({summary: 'Create room'})
  @ApiResponse({status: 200, type: Room})
  @Post('create')
  createRoom(
    @Body() CreateRoomDto: CreateRoomDto
  ): Promise<Object> {
    return this.roomService.createRoom(CreateRoomDto);
  }

  // Find All Room
  @ApiOperation({summary: 'Find all room'})
  @ApiResponse({status: 200, type: [Room]})
  @Get('find')
  findAllRoom(): Promise<Object> {
    return this.roomService.findAllRoom();
  }

  // Find By ID Room
  @ApiOperation({summary: 'Find one room'})
  @ApiResponse({status: 200, type: Room})
  @Get('find/:id')
  findOneRoom(
    @Param('id') id: number
  ): Promise<Object> {
    return this.roomService.findOneRoom(id);
  }

  // Update BY ID, One Room
  @ApiOperation({summary: 'Update room'})
  @ApiResponse({status: 200, type: Room})
  @Put('update/:id')
  updateRoom(
    @Param('id') id: number, 
    @Body() UpdateRoomDto: UpdateRoomDto,
  ): Promise<Object> {
    return this.roomService.updateRoom(id, UpdateRoomDto);
  }

  // Remove BY ID, One Room
  @ApiOperation({summary: 'Remove room'})
  @ApiResponse({status: 200})
  @Delete('remove/:id')
  removeRoom(
    @Param('id') id: number
  ): Promise<Number | Object> {
    return this.roomService.removeRoom(id);
  }

  // Searche One Room
  @ApiOperation({summary: 'Searche room'})
  @ApiResponse({status: 200, type: Room})
  @Get('search/:name')
  searcheRoom(
    @Param('name') name: string
  ): Promise<Object> {
    return this.roomService.searcheRoom(name);
  }
}