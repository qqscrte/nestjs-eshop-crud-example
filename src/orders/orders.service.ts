import {HttpException, HttpStatus, Injectable, Req} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "./orders.model";
import {CreateOrderDto} from "./dto/createOrder.dto";

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

    async getAll() {
        return await this.orderRepository.findAll({include: {all:true}});
    }

    async createOrder(userId, productIds) {
        if (!userId || !productIds) {
            throw new HttpException('No userID or productIDs', HttpStatus.BAD_REQUEST);
        }

        const order = await this.orderRepository.create(userId);
        await order.$set('products', [...productIds]);
        await order.$set('user', userId);
        return order;
    }

    async getOrdersById(ids: number[]) {
        const orders = [];
        for (const id of ids) {
            const order = await this.orderRepository.findByPk(id, {include: {all: true}});
            if (order)
                orders.push(order);
        }

        if (orders.length === 0) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return orders;
    }

    async getUserOrders(userId) {
        if (!userId) {
            throw new HttpException('No ID has been received', HttpStatus.BAD_REQUEST);
        }

        return await this.orderRepository.findAll({
            where: {userId},
            attributes: ['id', 'userId'],
            include: {
                association: 'products',
                through: {
                    attributes: []
                }
            }
        });
    }
}
