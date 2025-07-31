
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';

import { PayLoadToken } from "../models/token.model";
import { AuthService } from "../services/auth.service";

import config from "../../config";


@Injectable()
export class JwtStragegy extends PassportStrategy(Strategy, 'jwt') {

    constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
        const JWT_SECRET = configService.jwtSecret || '';
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET
        });
    }

    validate(payload: PayLoadToken): unknown {
        return payload;
    }

}