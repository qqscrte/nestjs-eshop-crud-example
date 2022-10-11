import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../guards/passport-strategies/local.strategy";
import {JwtStrategy} from "../guards/passport-strategies/jwt.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
      PassportModule,
      UsersModule,
      JwtModule.registerAsync({
          useFactory: () => ({
              secret: String(process.env.SECRET_KEY),
              signOptions: {
                  expiresIn: '24h'
              }
          })
      })
  ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
