import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class Course {
    @PrimaryGeneratedColumn('increment')
    course_id: number;
  
    @Column({type: 'text'})
    name: string;
    
    @Column({type: 'integer'})
    price: number;
   
    @Column({type: 'date'})
    start_date: Date;
   
    @Column({type: 'date'})
    end_date: Date;
}