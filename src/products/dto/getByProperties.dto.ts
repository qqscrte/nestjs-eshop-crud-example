import {IsNumber, IsNumberString, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetByPropertiesDto {
    @ApiProperty({example: 'Google Pixel 5'})
    @IsOptional()
    @IsString()
    readonly name: string;

    @ApiProperty({example: 'Smartphone'})
    @IsOptional()
    @IsString()
    readonly type: string;

    @ApiProperty({example: 'Google'})
    @IsOptional()
    @IsString()
    readonly brand: string;

    @ApiProperty({description: 'Number of products to find'})
    @IsOptional()
    @IsNumberString()
    limit: number;

    @ApiProperty({description: 'Offset'})
    @IsOptional()
    @IsNumberString()
    offset: number;
}