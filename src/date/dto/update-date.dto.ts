import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdateDateDto {
    @IsNotEmpty()
    start_time:string
    
    @IsNotEmpty()
    end_time:string

    @IsNumber()
    @IsNotEmpty()
    room_id: number
}