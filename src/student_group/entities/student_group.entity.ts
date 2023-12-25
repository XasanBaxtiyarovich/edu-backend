import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('student_group')
export class StudentGroup {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: 1, description: 'Student Group ID'})
    @Column()
    group_id: number;

    @ApiProperty({ example: 1, description: 'Student ID'})
    @Column()
    student_id: number;
}