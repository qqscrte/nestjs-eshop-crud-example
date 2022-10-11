import {Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/createRole.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {JwtAuthGuard} from "../guards/jwtAuth.guard";
import {Roles} from "../guards/decorators/rolesAuth.decorator";
import {RolesGuard} from "../guards/roles.guard";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'Get role by its name (value)'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Role})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:value')
    async getByValue(@Param('value') value: string) {
        return await this.rolesService.getRoleByValue(value);
    }

    @ApiOperation({summary: 'Create a role'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Role})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() dto: CreateRoleDto) {
        return await this.rolesService.createRole(dto);
    }
}
