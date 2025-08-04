import { ApiProperty } from "@nestjs/swagger";
import { ImportError } from "./import.dto";

export class ImportResponse {

    @ApiProperty({
        description: 'Total number of records processed from the imported file',
        example: 15,
    })
    totalRecords: number;

    @ApiProperty({
        description: 'Number of records successfully processed and saved',
        example: 12,
    })
    successful: number;

    @ApiProperty({
        description: 'Number of records that failed during processing',
        example: 3,
    })
    failed: number;

    @ApiProperty({
        description: 'Detailed list of errors for the failed records',
        type: [ImportError],
        example: [
            { row: 3, error: 'Invalid RUT format' },
            { row: 7, error: 'Email already registered' }
        ]
    })
    errors: ImportError[];
}
