import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('persons')
export class Person {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  person_id: number;

  @ApiProperty({example: 'http://localhost:4000/VIDEO_URL', description: 'Image URL'})
  @Column({type: 'text'})
  img_url: string;

  @ApiProperty({ example: 'Xasan', description: 'Person first name'})
  @Column({type: 'text'})
  first_name: string;

  @ApiProperty({ example: 'Avalov', description: 'Person last name'})
  @Column({type: 'text'})
  last_name: string;

  @ApiProperty({ example: '+998881758888', description: 'Person phone number'})
  @Column({type: 'text'})
  phone: string;

  @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Person email'})
  @Column({type: 'text'})
  email: string;

  @ApiProperty({ example: 'xndjbechfruevbyrbv', description: 'Person hashed password'})
  @Column({type: 'text'})
  hashed_password: string;

  @ApiProperty({ example: true, description: 'Person active?'})
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({ example: false, description: 'Person is admin?'})
  @Column({ default: false })
  is_admin: boolean;

  @ApiProperty({ example: true, description: 'Person is super admin?'})
  @Column({ default: false })
  is_super_admin: boolean;

  @ApiProperty({ example: false, description: 'Person is teacher?'})
  @Column({ default: false })
  is_teacher: boolean;

  @ApiProperty({ example: false, description: 'Person is student?'})
  @Column({ default: false })
  is_student: boolean;

  @CreateDateColumn()
  created_at: Date; // Creation date
}