import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs";
import {ROLES_KEY} from "./decorators/rolesAuth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) {
                return true;
            }

            const request = context.switchToHttp().getRequest();
            const userRoles = request.user.roles.map(roleObj => roleObj.value);

            return requiredRoles.every(role => userRoles.includes(role));
        }

        catch (e) {
            console.log(e);
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}