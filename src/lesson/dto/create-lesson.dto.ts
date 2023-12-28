import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLessonDto {
    @ApiProperty({ example: 1, description: 'Teacher ID'})
    @IsNotEmpty()
    teacher_id: number;
   
    @ApiProperty({ example: 1, description: 'Group ID'})
    @IsNotEmpty()
    group_id: number;
   
    @ApiProperty({ example: 'Docker', description: 'Lesson subject'})
    @IsString()
    @IsNotEmpty()
    subject: string;
    
    @ApiProperty({ example: 'Deploy', description: 'Lesson home work'})
    @IsString()
    @IsNotEmpty()
    home_work: string;
}
