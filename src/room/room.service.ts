import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Room } from './entities';
import { CreateRoomDto, UpdateRoomDto } from './dto';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room)private roomRepository: Repository<Room> ){}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Object> {
    const [ room ] = await this.roomRepository.findBy({ name: createRoomDto.name });

    if (room) return {
                      message: 'This room name already exists',
                      status: HttpStatus.CONFLICT
                     };

    const newRoom = await this.roomRepository.save({...createRoomDto});

    return {
            message: 'Create successfully',
            book: newRoom,
            status: HttpStatus.OK
           };
  }

  async findAllRoom(): Promise<Object> {
    const rooms = await this.roomRepository.find();
    if(rooms.length === 0) return {
                                    message: 'Rooms Not Found',
                                    status: HttpStatus.NOT_FOUND
                                  };
    return {
            rooms,
            status: HttpStatus.OK
           };
  }

  async findOneRoom(id: number): Promise<Object> {
    const [room] = await this.roomRepository.findBy({ room_id: id });
    if (!room) return {
                        message: 'Room Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    return {
            room,
            status: HttpStatus.OK
           };
  }

  async updateRoom(id: number, updateRoomDto: UpdateRoomDto): Promise<Object> {
    const [ room ] = await this.roomRepository.findBy({ room_id: id });

    if (!room) return {
                        message: 'Book Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    
    const [ roomName ] = await this.roomRepository.findBy({ name: updateRoomDto.name });

    if (roomName) return {
                      message: 'This room name already exists',
                      status: HttpStatus.CONFLICT
                     };

    await this.roomRepository.update(
      { 
        room_id: id
      },
      {
        ...updateRoomDto
      }
    );

    const [ updateRoom ] =  await this.roomRepository.findBy({ room_id: id });

    return {
            room: updateRoom,
            status: HttpStatus.OK
           };
  }

  async removeRoom(id: number): Promise<HttpStatus | Object> {
    const [ room ] = await this.roomRepository.findBy({ room_id: id });
    if (!room) return {
                        message: 'Book Not Found',
                        status: HttpStatus.NOT_FOUND
                      };

    await this.roomRepository.delete({ room_id: id });

    return HttpStatus.OK;
  }

  async searcheRoom(name: string): Promise<Object> {
    const rooms = await this.roomRepository.find({
      where : {
        name: Like(`%${name}%`)
      }
    });

    if (rooms.length === 0) return {
                                      message: 'Rooms Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            rooms
           };
  }
}