import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn('increment')
    room_id: number;
  
    @Column({type: 'text'})
    name: string;
    
    @Column({type: 'integer'})
    size: number;
}