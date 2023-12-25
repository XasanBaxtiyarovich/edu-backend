import { IsString, IsNotEmpty } from "class-validator";

export class UpdateRoomDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    size:number
}
