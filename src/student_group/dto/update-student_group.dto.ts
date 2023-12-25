import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateStudentGroupDto {
    @IsNumber()
    @IsNotEmpty()
    group_id: number;

    @IsNumber()
    @IsNotEmpty()
    student_id: number;
}