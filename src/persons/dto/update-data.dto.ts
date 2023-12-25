import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateDataDto {
    @ApiProperty({ example: 'Xasan', description: 'Person first name'})
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Avalov', description: 'Person last name'})
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: '+998881758888', description: 'Person phone number'})
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Person email'})
    @IsEmail()
    @IsNotEmpty()
    email: string;
}