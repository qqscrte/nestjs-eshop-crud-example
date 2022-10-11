import {Body, Controller, HttpCode, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/createUser.dto";
import {LocalAuthGuard} from "../guards/localAuth.guard";
import {AccessTokenDto} from "./dto/accessToken.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Create and return an access token for user'})
    @ApiResponse({status: 200, type: AccessTokenDto})
    @ApiResponse({status: 401})
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('/login')
    async logIn(@Request() req, @Body() dto: CreateUserDto) {
        return await this.authService.logIn(req.user);
    }

    @ApiOperation({summary: 'Create a user and return their access token'})
    @ApiResponse({status: 200, type: AccessTokenDto})
    @ApiResponse({status: 400})
    @HttpCode(200)
    @Post('/signup')
    async signUp(@Body() dto: CreateUserDto) {
        return await this.authService.signUp(dto);
    }
}
