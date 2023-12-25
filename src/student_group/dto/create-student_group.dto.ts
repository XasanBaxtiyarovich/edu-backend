import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStudentGroupDto {
    @IsNumber()
    @IsNotEmpty()
    group_id: number;

    @IsNumber()
    @IsNotEmpty()
    student_id: number;
}
