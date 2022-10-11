import {Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Req, UseGuards, Type} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dto/createOrder.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Order} from "./orders.model";
import {Roles} from "../guards/decorators/rolesAuth.decorator";
import {JwtAuthGuard} from "../guards/jwtAuth.guard";
import {RolesGuard} from "../guards/roles.guard";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {};

    @ApiOperation({summary: 'Get all orders', })
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [Order]})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.ordersService.getAll();
    }

    @ApiOperation({summary: 'Create an order', })
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: Order})
    @ApiResponse({ status: 403, description: 'User doesn\'t meet the role requirements'})
    @Roles('USER')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createOrder(@Body() dto: CreateOrderDto, @Req() request) {
        return await this.ordersService.createOrder(request.user.id, dto.productIds);
    }

    @ApiOperation({summary: 'Get orders by ID', })
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [Order]})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:ids')
    async getOrdersById(@Param('ids', new ParseArrayPipe({items: Number})) ids: number[]) {
        return await this.ordersService.getOrdersById(ids);
    }

    @ApiOperation({summary: 'Get specified user\'s orders'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [Order]})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/user/:id')
    async getUserOrders(@Param('id', ParseIntPipe) userId: number) {
        return await this.ordersService.getUserOrders(userId);
    }
}
