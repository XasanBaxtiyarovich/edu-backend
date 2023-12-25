import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class Room {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    room_id: number;
    
    @ApiProperty({ example: 'Netflix', description: 'Education room name'})
    @Column({type: 'text'})
    name: string;
    
    @ApiProperty({ example: 12, description: 'Room size'})
    @Column({type: 'integer'})
    size: number;
}