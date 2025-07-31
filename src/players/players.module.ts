import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlayersController } from './controllers/players.controller';
import { PlayersService } from './services/players.service';
import { Player, PlayerSchema } from './entities/player.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    UserModule,
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
