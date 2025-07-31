import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, Matches, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { parse } from 'date-fns';


import { PaymentStatus } from '../enums/payment-status.enum';
import { ClubStatus } from '../enums/club-status.enum';
import { Role } from '../../common/enums/role.enum';


export class CreatePlayerDTO {

    @ApiProperty({ description: 'Player`s First Name' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'Player`s Lastname' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'Player`s rut' })
    @IsString()
    @Matches(/^\d{7,8}-[0-9Kk]{1}$/, { message: 'RUT format must be like 18456456-1' })
    rut: string;

    @ApiProperty({ description: 'Player`s Birthdate (ISO 8601)', example: '1992-08-28' })
    @IsDateString({}, { message: 'Birthdate must be a valid ISO 8601 date string' })
    birthDate: string;

    @ApiProperty({ description: 'Player`s Email' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Player`s Address' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Player`s Phone' })
    @IsString()
    phone: string;

    @ApiPropertyOptional({ description: 'Player`s Payment Status' })
    @IsOptional()
    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus;

    @ApiPropertyOptional({ description: 'Player`s Club Status' })
    @IsOptional()
    @IsEnum(ClubStatus)
    clubStatus?: ClubStatus;

    @ApiPropertyOptional({ description: 'Player`s Role' })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @ApiPropertyOptional({ description: 'Player`s Last Payment Date (ISO 8601)', example: '2025-07-05' })
    @IsOptional()
    @IsDateString({}, { message: 'Last payment date must be a valid ISO 8601 date string' })
    lastPaymentDate?: string;
}

export class UpdatePlayerDTO extends PartialType(CreatePlayerDTO) { }
