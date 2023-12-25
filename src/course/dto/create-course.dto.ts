import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateCourseDto {
    @ApiProperty({ example: 'VueJS', description: 'Course name'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({ example: 1230000, description: 'Course price'})
    @IsNotEmpty()
    price:number

    @ApiProperty({ example: '12:30', description: 'Course start date'})
    @IsNotEmpty()
    @IsDateString()
    start_date:Date

    @ApiProperty({ example: '14:30', description: 'Course end date'})
    @IsNotEmpty()
    @IsDateString()
    end_date:Date
}