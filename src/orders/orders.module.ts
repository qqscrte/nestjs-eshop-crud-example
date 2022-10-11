import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Order} from "./orders.model";
import {Product} from "../products/products.model";
import {OrderProducts} from "../cross-models/orderProducts.model";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Order, Product, OrderProducts]),
  ],
  exports: [
      OrdersService
  ]
})
export class OrdersModule {}
