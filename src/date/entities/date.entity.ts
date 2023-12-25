import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dates')
export class Data {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    date_id: number;
  
    @ApiProperty({ example: '12:30', description: 'Lesson start time'})
    @Column({type: 'text'})
    start_time: string;

    @ApiProperty({ example: '14:30', description: 'Lesson end time'})
    @Column({type: 'text'})
    end_time: string;

    @ApiProperty({ example: 1, description: 'Room ID'})
    @Column({type:"integer"})
    room_id:number
}   