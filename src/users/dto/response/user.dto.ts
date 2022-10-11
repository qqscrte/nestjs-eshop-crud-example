import {User} from "../../users.model";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
    }

    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly email: string;
}