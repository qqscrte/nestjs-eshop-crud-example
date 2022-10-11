import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/createUser.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/addRole.dto";
import {UserDto} from "./dto/response/user.dto";
import {OrdersService} from "../orders/orders.service";
import {Order} from "../orders/orders.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private rolesService: RolesService,
                private ordersService: OrdersService) {}

    async getMyOrders(userId: number) {
        if (!userId) {
            throw new HttpException('No ID has been received', HttpStatus.BAD_REQUEST);
        }

        return await this.ordersService.getUserOrders(userId);
    }

    async createUser(dto: CreateUserDto) {
        let role = await this.rolesService.getRoleByValue('USER');
        if (!role) {
            role = await this.rolesService.createRole({value: 'USER', description: 'User'})
        }

        const user = await this.userRepository.create(dto);
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll({include: [{association: 'orders'}, {association: 'roles'}]});
    }

    async getUserByEmail(email: string) {
        const user = this.userRepository.findOne({
            where: {email},
            attributes: ['id', 'email', 'password'],
            include: {
                association: 'roles',
                attributes: ['id', 'value'],
                through: {
                    attributes: []
                }
            }
        });

        if (!user) {
            throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const role = await this.rolesService.getRoleByValue(dto.roleValue);
        const user = await this.userRepository.findByPk(dto.userId);

        if (role && user) {
            await user.$add('roles', role.id);
            return dto;
        }

        throw new HttpException('User or role are not found', HttpStatus.NOT_FOUND);
    }
}
