import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lesson')
export class Lesson {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    lesson_id: number;
    
    @ApiProperty({ example: 1, description: 'Teacher ID'})
    @Column({type: 'integer'})
    teacher_id: number;
   
    @ApiProperty({ example: 1, description: 'Group ID'})
    @Column({type: 'integer'})
    group_id: number;
   
    @ApiProperty({ example: 'Docker', description: 'Lesson subject'})
    @Column({type: 'text'})
    subject: string;

    @ApiProperty({ example: 'Deploy', description: 'Lesson home work'})
    @Column({type: 'text'})
    home_work: string;

    @ApiProperty({example: 'http://localhost:4000/VIDEO_URL', description: 'Video URL'})
    @Column({type: 'text'})
    video_url: string;
}