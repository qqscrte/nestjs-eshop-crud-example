import {IsEmail, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'example@example.com'})
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: '123Asd'})
    @IsString()
    readonly password: string;
}