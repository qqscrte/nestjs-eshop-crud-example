import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {OrderProducts} from "../cross-models/orderProducts.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product, OrderProducts]),
      FilesModule
  ]
})
export class ProductsModule {}
