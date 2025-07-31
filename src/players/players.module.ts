import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlayersController } from './controllers/players.controller';
import { PlayersService } from './services/players.service';
import { Player, PlayerSchema } from './entities/player.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Player.name,
        schema: PlayerSchema,
      }
    ])
  ],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule { }
