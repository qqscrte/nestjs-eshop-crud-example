import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Order} from "../orders/orders.model";
import {Product} from "../products/products.model";

@Table({tableName: 'order_products', createdAt: false, updatedAt: false})
export class OrderProducts extends Model<OrderProducts> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER})
    orderId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}