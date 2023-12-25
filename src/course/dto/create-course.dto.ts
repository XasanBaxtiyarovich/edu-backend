import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    price:number

    @IsNotEmpty()
    @IsDateString()
    start_date:Date

    @IsNotEmpty()
    @IsDateString()
    end_date:Date
}
