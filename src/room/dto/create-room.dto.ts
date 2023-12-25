import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateRoomDto {
    @ApiProperty({ example: 'Netflix', description: 'Education room name'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({ example: 12, description: 'Room size'})
    @IsNotEmpty()
    size:number
}
