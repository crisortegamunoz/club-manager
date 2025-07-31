import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';


import { LocalStragegy } from './strategies/local.strategy';
import { JwtStragegy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/user.module';

import config from '../config';


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                return {
                    secret: configService.jwtSecret,
                    signOptions: {
                        expiresIn: '10m'
                    }
                };
            },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStragegy, JwtStragegy]
})
export class AuthModule { }
