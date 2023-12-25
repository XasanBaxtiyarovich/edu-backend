import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateGroupDto {
    @IsString()
    @IsNotEmpty()
    group_name:string
    
    @IsNumber()
    @IsNotEmpty()
    course_id: number

    @IsNumber()
    @IsNotEmpty()
    date_id: number

    @IsNumber()
    @IsNotEmpty()
    teacher_id: number
}