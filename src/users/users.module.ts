import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../cross-models/userRoles.model";
import {RolesModule} from "../roles/roles.module";
import {Order} from "../orders/orders.model";
import {OrdersModule} from "../orders/orders.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Order]),
      RolesModule,
      OrdersModule
  ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
