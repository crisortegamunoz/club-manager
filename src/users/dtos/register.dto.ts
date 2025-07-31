import { IsEmail, IsEnum, IsMongoId, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';

export class RegisterDTO {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @Matches(/^(?=(?:.*[A-Za-z]){4,})(?=(?:.*\d){4,}).{8,}$/, {
        message: 'Password must be at least 8 characters long and contain at least 4 letters and 4 numbers',
    })
    password: string;

    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role?: Role;

    @ApiPropertyOptional()
    @IsMongoId()
    @IsOptional()
    player?: string;

}

export class UpdateUserDTO extends PartialType(RegisterDTO) { } 