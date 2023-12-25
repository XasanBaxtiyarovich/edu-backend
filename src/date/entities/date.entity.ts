import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dates')
export class Data {
    @PrimaryGeneratedColumn('increment')
    date_id: number;
  
    @Column({type: 'text'})
    start_time: string;

    @Column({type:"integer"})
    room_id:number
    
    @Column({type: 'text'})
    end_time: string;
}   