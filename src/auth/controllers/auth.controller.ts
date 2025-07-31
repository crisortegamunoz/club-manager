import { Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dtos/login.dto';
import { ExcludePropertyInterceptor } from '../../common/interceptors/exclude-properties.interceptor';
import { User } from '../../users/entities/user.entity';


@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ExcludePropertyInterceptor)
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }

    @Post('/login')
    @ApiOperation({ summary: 'Login to app with user', description: 'Validate the user in database' })
    @ApiBody({ type: LoginDTO, description: 'Details of the user credentials' })
    @ApiResponse({ status: 201, description: 'The user has been successfully validated.', type: LoginDTO })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @UseGuards(AuthGuard('local'))
    login(@Req() request: Request) {
        const user = request.user as User;
        return this.authService.generateJWT(user);
    }
}
