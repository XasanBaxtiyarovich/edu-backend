import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('student_group')
export class StudentGroup {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    group_id: number;

    @Column()
    student_id: number;
}