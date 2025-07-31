import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Filter } from '../../common/filters/filter.dto';
import { CreatePlayerDTO, UpdatePlayerDTO } from '../dtos/player.dto';
import { Player } from '../entities/player.entity';

@Injectable()
export class PlayersService {

    findAll(params: Filter) {

    }

    async findById(id: string) {
      
    }

    async create(data: CreatePlayerDTO) {

    }

    async update(id: string, changes: UpdatePlayerDTO) {

    }

    async delete(id: string) {

    }

    registerPayment(id: string) {

    }

    async createUserForPlayer(id: string) {

    }

}
