import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsString} from "class-validator";

export class CreateProductDto {
    @ApiProperty({example: 'Google Pixel 5'})
    @IsString()
    readonly name: string;

    @ApiProperty({example: 'Smartphone'})
    @IsString()
    readonly type: string;

    @ApiProperty({example: '100'})
    @IsNumberString()
    readonly price: number;
}