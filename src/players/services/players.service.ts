import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Filter } from '../../common/filters/filter.dto';
import { CreatePlayerDTO, UpdatePlayerDTO } from '../dtos/player.dto';
import { Player } from '../entities/player.entity';
import { handleMongoDuplicateKeyError } from '../../common/exceptions/team-exception';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class PlayersService {

    constructor(@InjectModel(Player.name) private playerModel: Model<Player>,
        private readonly userService: UserService) {

    }

    findAll(params: Filter) {
        return this.playerModel.find().exec();
    }

    async findById(id: string) {
        return this.playerModel.findById(id);
    }

    async create(data: CreatePlayerDTO) {
        try {
            const newPlayer = this.playerModel.create(data);
            return (await newPlayer).save();
        } catch (error) {
            handleMongoDuplicateKeyError(error);
        }

    }

    async update(id: string, changes: UpdatePlayerDTO) {
        try {
            return await this.playerModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        } catch (error) {
            handleMongoDuplicateKeyError(error);
        }
    }

    async delete(id: string) {
        const player = await this.findById(id);
        if (!player) {
            throw new NotFoundException(`Player not found`);
        }
        return this.playerModel.findByIdAndDelete(id);
    }

    async createUserForPlayer(id: string) {
        const player = await this.findById(id);
        if (!player) {
            throw new NotFoundException(`Player not found`);
        }
        const user = await this.userService.createUserByPlayer(id, player);
        console.log(user);
        return user;
    }

    async registerPayment(id: string) {

    }

}
