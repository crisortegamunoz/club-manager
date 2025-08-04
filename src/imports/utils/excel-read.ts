import * as XLSX from 'xlsx';
import { ImportDTO, ImportError } from '../dtos/import.dto';
import { CreatePlayerDTO } from '../../players/dtos/player.dto';
import { PlayerValidator } from './player-validator';

export class ExcelHelper {

    static async parsePlayers(buffer: Buffer): Promise<ImportDTO<CreatePlayerDTO>> {
        const validator = new PlayerValidator();
        try {
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows: any[] = XLSX.utils.sheet_to_json(sheet, {
                header: [
                    'timestamp',
                    'firstName',
                    'lastName',
                    'rut',
                    'birthDate',
                    'email',
                    'address',
                    'phone'
                ],
                range: 1
            });
            const data: CreatePlayerDTO[] = [];
            const errors: ImportError[] = [];

            rows.forEach((row, index) => {
                const rowNumber = index + 2;
                try {
                    const player = validator.validateAndTransform(row);
                    data.push(player);
                } catch (err) {
                    if (err instanceof Error) {
                        errors.push({ row: rowNumber, error: err.message });
                    } else {
                        errors.push({ row: rowNumber, error: 'Error desconocido durante el procesamiento.' });
                    }
                }
            });
            return { data, errors };
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error al procesar el archivo: ${err.message}`);
            }
            throw new Error('Error desconocido al procesar el archivo.');
        }
    }
}