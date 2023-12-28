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

    @ApiProperty({ example: '12.02.2019', description: 'Course start date'})
    @Column({type: 'text'})
    start_date: string;
   
    @ApiProperty({ example: '12.02.2020', description: 'Course end date'})
    @Column({type: 'text'})
    end_date: string;
}