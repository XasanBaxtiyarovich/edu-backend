import { IsString, IsNotEmpty } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    size:number
}
