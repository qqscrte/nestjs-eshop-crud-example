import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/createUser.dto";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.model";
import {JwtService} from "@nestjs/jwt";
import {AccessTokenDto} from "./dto/accessToken.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async logIn(user: User) {
        return this.generateToken(user);
    }

    async signUp(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException('This user already exists', HttpStatus.BAD_REQUEST);
        }

        const passwordHash = await bcrypt.hash(dto.password, 4);
        const user = await this.userService.createUser({...dto, password: passwordHash});
        return this.generateToken(user);
    }

    async validateUser(email, password) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new HttpException('User is not found', HttpStatus.UNAUTHORIZED);
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    generateToken(user: User): AccessTokenDto {
        const payload = {id: user.id, roles: user.roles, email: user.email};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}
