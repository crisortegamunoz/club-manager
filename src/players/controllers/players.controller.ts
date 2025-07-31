import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Filter } from '../../common/filters/filter.dto';
import { PlayersService } from '../services/players.service';
import { MongoIdPipe } from '../../common/pipes/mongo-id.pipe';
import { CreatePlayerDTO, UpdatePlayerDTO } from '../dtos/player.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth.guard';
import { ExcludePropertyInterceptor } from '../../common/interceptors/exclude-properties.interceptor';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles.decorator';


@UseGuards(JwtAuthGuard, RoleAuthGuard)
@ApiTags('players')
@Controller('players')
@UseInterceptors(ExcludePropertyInterceptor)
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {

    }

    @Get()
    @ApiOperation({ summary: 'Find players', description: 'Find a players from the database.' })
    @ApiResponse({ status: 200, description: 'The players has been successfully found.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    findAll(@Query() params: Filter) {
        return this.playersService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a player', description: 'Find a player by id from the database.' })
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
        description: 'Unique id from player'
    })
    @ApiResponse({ status: 200, description: 'The player has been successfully found.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'player not found' })
    findById(@Param('id', MongoIdPipe) id: string) {
        return this.playersService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new player', description: 'Adds a new player to the database.' })
    @ApiBody({ type: CreatePlayerDTO, description: 'Details of the player to be created.' })
    @ApiResponse({ status: 201, description: 'The player has been successfully created.', type: CreatePlayerDTO })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    create(@Body() payload: CreatePlayerDTO) {
        return this.playersService.create(payload);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a player', description: 'Update a player by id from the database.' })
    @ApiBody({ type: UpdatePlayerDTO, description: 'Details of the player to be updated.' })
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
        description: 'Unique id from player'
    })
    @ApiResponse({ status: 200, description: 'The player has been successfully updated.', type: UpdatePlayerDTO })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'player not found' })
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdatePlayerDTO) {
        return this.playersService.update(id, payload);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a player', description: 'Delete a player by id from the database.' })
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
        description: 'Unique id from player'
    })
    @ApiResponse({ status: 204, description: 'The player has been successfully deleted.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'player not found' })
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.playersService.delete(id);
    }

    @Post('/:id/user')
    @ApiOperation({ summary: 'Create a new user by player info ', description: 'Adds a new user by player info to the database.' })
    @ApiParam({
        name: 'id',
        required: true,
        type: String,
        description: 'Unique id from player'
    })
    @ApiResponse({ status: 201, description: 'The user for the player has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @Roles(Role.ADMINISTRATOR)
    createUserForPlayer(@Param('id', MongoIdPipe) id: string) {
        return this.playersService.createUserForPlayer(id);
    }

}
