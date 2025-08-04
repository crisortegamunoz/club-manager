import { ApiProperty } from '@nestjs/swagger';

export class ImportError {
    @ApiProperty({ description: 'Row number where the error occurred' })
    row: number;

    @ApiProperty({ description: 'Error message for the specific row' })
    error: string;
}

export class ImportDTO<T> {
    @ApiProperty({ description: 'Valid parsed data ready for processing' })
    data: T[];

    @ApiProperty({ description: 'List of errors occurred during parsing' })
    errors: ImportError[];
}