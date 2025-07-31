import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../users/services/user.service';
import { User } from '../../users/entities/user.entity';
import { PayLoadToken } from '../models/token.model';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {

    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (user && isMatch) {
                return user;
            }
        }
        return null;
    }

    generateJWT(user: User) {
        const payload: PayLoadToken = { role: user.role, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
