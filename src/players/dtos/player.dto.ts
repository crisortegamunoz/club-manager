import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

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

    @ApiProperty({ description: 'Player`s Birthdate' })
    @IsDateString()
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
}

export class UpdatePlayerDTO extends PartialType(CreatePlayerDTO) { }
