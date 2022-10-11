import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../cross-models/userRoles.model";
import {Order} from "../orders/orders.model";
import {Exclude} from "class-transformer";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: 1, description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'example@example.com', description: 'email'})
    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Exclude()
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({type: () => Order, isArray: true})
    @HasMany(() => Order)
    orders: Order[];

    @ApiProperty({example: ['User'], description: 'User\'s roles'})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}