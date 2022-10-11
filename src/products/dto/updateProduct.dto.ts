import {IsNumberString, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateProductDto {
    @ApiProperty({example: 'Google Pixel 5'})
    @IsOptional()
    @IsString()
    readonly name: string;

    @ApiProperty({example: 'Smartphone'})
    @IsOptional()
    @IsString()
    readonly type: string;

    @ApiProperty({example: '100'})
    @IsOptional()
    @IsNumberString()
    readonly price: number;

    @ApiProperty({example: 'Google'})
    @IsOptional()
    @IsString()
    readonly brand: string;

    @ApiProperty({example: 'Pixel 5'})
    @IsOptional()
    @IsString()
    readonly model: string;

    @ApiProperty({example: 'A brand new Google smartphone'})
    @IsOptional()
    @IsString()
    readonly description: string;
}