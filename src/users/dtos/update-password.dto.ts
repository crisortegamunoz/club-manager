import { IsEmail, Matches } from "class-validator";
import { Match } from "../../common/decorators/match.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePassword {

    @ApiProperty()
    @Matches(/^(?=(?:.*[A-Za-z]){4,})(?=(?:.*\d){4,}).{8,}$/, {
        message: 'Password must be at least 8 characters long and contain at least 4 letters and 4 numbers',
    })
    newPassword: string;

    @ApiProperty()
    @Match('newPassword', { message: 'Passwords do not match' })
    confirmPassword: string;
}