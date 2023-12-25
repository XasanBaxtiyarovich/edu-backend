import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDateDto {
    @IsNotEmpty()
    start_time:string
    
    @IsNotEmpty()
    end_time:string

    @IsNumber()
    @IsNotEmpty()
    room_id: number
}