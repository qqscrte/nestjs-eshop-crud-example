import {ApiProperty, PickType} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: 'USER'})
    @IsString()
    readonly roleValue: string;

    @ApiProperty({example: '1'})
    @IsNumber()
    readonly userId: number;
}