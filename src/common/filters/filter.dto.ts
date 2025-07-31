import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPositive, Min } from "class-validator";

export class Filter {

    @ApiProperty({
        description: 'Maximum number of items to return in the response',
        default: 10
    })
    @IsOptional()
    @IsPositive()
    limit: number;

    @ApiProperty({
        description: 'Number of items to skip from the beginning of the collection, used for pagination',
        minimum: 0,
        default: 0
    })
    @IsOptional()
    @Min(0)
    offset: number;

}