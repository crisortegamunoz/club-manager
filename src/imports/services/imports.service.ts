import { Injectable } from '@nestjs/common';
import { ExcelHelper } from '../utils/excel-read';
import { PlayersService } from '../../players/services/players.service';
import { CreatePlayerDTO } from '../../players/dtos/player.dto';

@Injectable()
export class ImportsService {

    constructor(private readonly playersService: PlayersService) { }

    async savePlayers(buffer: Buffer) {
        const { data, errors } = await ExcelHelper.parsePlayers(buffer);

        let successful = 0;

        for (const playerDto of data) {
            try {
                await this.playersService.create(playerDto as CreatePlayerDTO);
                successful++;
            } catch (err) {
                errors.push({ row: -1, error: `DB error: ${err.message}` });
            }
        }

        return {
            totalRecords: data.length + errors.length,
            successful,
            failed: errors.length,
            errors,
        };
    }

}
