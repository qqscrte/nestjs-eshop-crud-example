import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {CreateUserDto} from "./dto/createUser.dto";
import {UsersService} from "./users.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {AddRoleDto} from "./dto/addRole.dto";
import {Roles} from "../guards/decorators/rolesAuth.decorator";
import {JwtAuthGuard} from "../guards/jwtAuth.guard";
import {RolesGuard} from "../guards/roles.guard";
import {UserDto} from "./dto/response/user.dto";
import {Order} from "../orders/orders.model";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Get all users'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [User]})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Get user\s orders'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [Order]})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('USER')
    @Get('/orders/my')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getMyOrders(@Request() req) {
        return await this.usersService.getMyOrders(req.user.id);
    }

    @ApiOperation({summary: 'Create a user'})
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: UserDto})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() dto: CreateUserDto) {
        const user = await this.usersService.createUser(dto);
        return new UserDto(user);
    }

    @ApiOperation({summary: 'Give a role to a user'})
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: AddRoleDto})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role')
    async addRole(@Body() dto: AddRoleDto) {
        return await this.usersService.addRole(dto);
    }
}
