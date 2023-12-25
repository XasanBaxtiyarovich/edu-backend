import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group')
export class Group {
    @PrimaryGeneratedColumn('increment')
    group_id: number;
  
    @Column({type: 'text'})
    name: string;
    
    @Column({type: 'integer'})
    teacher_id: number;
   
    @Column({type: 'integer'})
    course_id: number;
   
    @Column({type: 'integer'})
    date_id: number;
    
    @Column({type: 'boolean', default:true})
    status: boolean;
}