import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {User} from "../users/users.model";
import {OrderProducts} from "../cross-models/orderProducts.model";
import {ApiProperty} from "@nestjs/swagger";

interface OrderCreationAttrs {
    userId: number;
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrderCreationAttrs> {
    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'User ID'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ApiProperty({type: () => Product, isArray: true})
    @BelongsToMany(() => Product, () => OrderProducts)
    products: Product[];
}