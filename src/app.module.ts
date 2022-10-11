import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./cross-models/userRoles.model";
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import {Order} from "./orders/orders.model";
import {Product} from "./products/products.model";
import {OrderProducts} from "./cross-models/orderProducts.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";

@Module( {
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, 'static'),
        }),
        SequelizeModule.forRootAsync({
            useFactory: () => ({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [User, Role, UserRoles, Order, Product, OrderProducts],
                autoLoadModels: true,
            })
            }
        ),
        UsersModule,
        RolesModule,
        OrdersModule,
        ProductsModule,
        AuthModule,
        FilesModule,
    ]
})
export class AppModule {}