import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStudentGroupDto {
    @ApiProperty({ example: 1, description: 'Student Group ID'})
    @IsNumber()
    @IsNotEmpty()
    group_id: number;

    @ApiProperty({ example: 1, description: 'Student ID'})
    @IsNumber()
    @IsNotEmpty()
    student_id: number;
}
