import {ApiProperty} from "@nestjs/swagger";

export class AccessTokenDto {
    @ApiProperty({example: 'xxxxx.yyyyy.zzzzz', description: 'Token'})
    access_token: string;
}