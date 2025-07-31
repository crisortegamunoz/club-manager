import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/pipes/mongo-id.pipe';
import { UserService } from '../services/user.service';
import { ExcludePropertyInterceptor } from '../../common/interceptors/exclude-properties.interceptor';
import { RegisterDTO } from '../dtos/register.dto';
import { UpdatePassword } from '../dtos/update-password.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
@UseInterceptors(ExcludePropertyInterceptor)
export class UsersController {

    constructor(private readonly userService: UserService) {

    }

    @Post('/register')
    @ApiOperation({ summary: 'Create a new user', description: 'Adds a new user to the database.' })
    @ApiBody({ type: RegisterDTO, description: 'Details of the user to be created.' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: RegisterDTO })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    register(@Body() payload: RegisterDTO) {
        return this.userService.register(payload);
    }

    @Put(':email')
    @ApiOperation({ summary: 'Update a user password', description: 'Update a user password by email from the database.' })
    @ApiBody({ type: UpdatePassword, description: 'User new password' })
    @ApiParam({
        name: 'email',
        required: true,
        type: String,
        description: 'Unique email from user'
    })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: UpdatePassword })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'user not found' })
    update(@Param('email') email: string, @Body() payload: UpdatePassword) {
        return this.userService.changePassword(email, payload);
    }


    @Get('')
    @ApiOperation({ summary: 'Find all users', description: 'Find all users from the database.' })
    @ApiResponse({ status: 200, description: 'The users have been successfully found.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'Users not found' })
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a user', description: 'Find a user by id from the database.' })
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
        description: 'Unique id from User'
    })
    @ApiResponse({ status: 200, description: 'The user has been successfully found.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'User not found' })
    findById(@Param('id', MongoIdPipe) id: string) {
        return this.userService.findById(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user', description: 'Delete a user by id from the database.' })
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
        description: 'Unique id from User'
    })
    @ApiResponse({ status: 204, description: 'The user has been successfully deleted.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @HttpCode(204)
    delete(@Param('id', MongoIdPipe) id: string) {
        this.userService.delete(id);
    }

}
