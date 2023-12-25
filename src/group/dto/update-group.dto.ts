import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateGroupDto {
    @ApiProperty({ example: 'VueJS N9', description: 'Group name'})
    @IsString()
    @IsNotEmpty()
    name:string
    
    @ApiProperty({ example: 1, description: 'Course ID'})
    @IsNumber()
    @IsNotEmpty()
    course_id: number

    @ApiProperty({ example: 1, description: 'Date ID'})
    @IsNumber()
    @IsNotEmpty()
    date_id: number

    @ApiProperty({ example: 1, description: 'Teacher ID'})
    @IsNumber()
    @IsNotEmpty()
    teacher_id: number
}