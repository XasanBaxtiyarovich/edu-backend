import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class Course {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    course_id: number;
  
    @ApiProperty({ example: 'VueJS', description: 'Course name'})
    @Column({type: 'text'})
    name: string;
    
    @ApiProperty({ example: 1230000, description: 'Course price'})
    @Column({type: 'integer'})
    price: number;

    @ApiProperty({ example: '12:30', description: 'Course start date'})
    @Column({type: 'date'})
    start_date: Date;
   
    @ApiProperty({ example: '14:30', description: 'Course end date'})
    @Column({type: 'date'})
    end_date: Date;
}