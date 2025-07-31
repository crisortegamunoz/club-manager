import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {

    @ApiProperty()
    @IsEmail()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

}