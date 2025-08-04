import { Module } from '@nestjs/common';
import { ImportsController } from './controllers/imports.controller';
import { ImportsService } from './services/imports.service';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    PlayersModule
  ],
  controllers: [ImportsController],
  providers: [ImportsService]
})
export class ImportsModule { }
