import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Order} from "../orders/orders.model";
import {OrderProducts} from "../cross-models/orderProducts.model";

interface ProductCreationAttrs {
    name: string;
    type: string;
    price: number;
    image: string;
}

@Table({tableName: 'products'})
export class Product extends Model<Product, ProductCreationAttrs> {
    @ApiProperty({example: 1, description: 'Product ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Google Pixel 5', description: 'Product name'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: 'Smartphone', description: 'Product type'})
    @Column({type: DataType.STRING, allowNull: false})
    type: string;

    @ApiProperty({example: '100', description: 'Product price'})
    @Column({type: DataType.NUMBER, allowNull: false})
    price: number;

    @ApiProperty({example: 'Google', description: 'Product brand'})
    @Column({type: DataType.STRING})
    brand: string;

    @ApiProperty({example: 'Pixel 5', description: 'Product model'})
    @Column({type: DataType.STRING})
    model: string;

    @ApiProperty({example: 'A brand new Google smartphone', description: 'Product description'})
    @Column({type: DataType.STRING})
    description: string;

    @ApiProperty({description: 'Product picture'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @BelongsToMany(() => Order, () => OrderProducts)
    orders: Order[];
}