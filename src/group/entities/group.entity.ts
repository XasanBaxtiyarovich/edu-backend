import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group')
export class Group {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    group_id: number;
  
    @ApiProperty({ example: 'VueJS N9', description: 'Group name'})
    @Column({type: 'text'})
    name: string;
    
    @ApiProperty({ example: 1, description: 'Teacher ID'})
    @Column({type: 'integer'})
    teacher_id: number;
   
    @ApiProperty({ example: 1, description: 'Course ID'})
    @Column({type: 'integer'})
    course_id: number;
   
    @ApiProperty({ example: 1, description: 'Date ID'})
    @Column({type: 'integer'})
    date_id: number;
}