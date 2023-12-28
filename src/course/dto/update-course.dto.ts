import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class UpdateCourseDto {
    @ApiProperty({ example: 'VueJS', description: 'Course name'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({ example: 1230000, description: 'Course price'})
    @IsNotEmpty()
    price:number

    @ApiProperty({ example: '12.02.2019', description: 'Course start date'})
    @IsNotEmpty()
    @IsString()
    start_date: string

    @ApiProperty({ example: '12.02.2020', description: 'Course end date'})
    @IsNotEmpty()
    @IsString()
    end_date: string
}