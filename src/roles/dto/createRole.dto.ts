import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'USER'})
    @IsString()
    readonly value: string;

    @ApiProperty({example: 'User role'})
    @IsString()
    readonly description: string;
}