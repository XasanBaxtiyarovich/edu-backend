import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDateDto {
    @ApiProperty({ example: '12:30', description: 'Lesson start time'})
    @IsNotEmpty()
    start_time:string
    
    @ApiProperty({ example: '14:30', description: 'Lesson end time'})
    @IsNotEmpty()
    end_time:string

    @ApiProperty({ example: 1, description: 'Room ID'})
    @IsNumber()
    @IsNotEmpty()
    room_id: number
}