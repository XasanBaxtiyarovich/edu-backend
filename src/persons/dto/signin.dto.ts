import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Person email'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Qwerty!2345', description: 'Person password'})
    @IsNotEmpty()
    password: string;
}