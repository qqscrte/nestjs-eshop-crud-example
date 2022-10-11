import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsNumberString} from "class-validator";

export class CreateOrderDto {
    @ApiProperty({example: [1, 2, 3], description: 'Products\' IDs'})
    @IsNumber({},{each:true})
    readonly productIds: number[];
}