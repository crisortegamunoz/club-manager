import { ValidationHelper } from "src/common/validators/validator-helper";
import { CreatePlayerDTO } from "../../players/dtos/player.dto";

export class PlayerValidator {

    public validateAndTransform(row: any) {

        const requiredFields = [
            'firstName',
            'lastName',
            'rut',
            'birthDate',
            'email',
            'address',
            'phone'
        ];
        const missingFields = requiredFields.filter(field => !row[field]);

        if (missingFields.length > 0) {
            throw new Error(`Faltan campos obligatorios: ${missingFields.join(', ')}`);
        }

        const player: CreatePlayerDTO = {
            firstName: ValidationHelper.validateStringLetters(row.firstName),
            lastName: ValidationHelper.validateStringLetters(row.lastName),
            rut: ValidationHelper.validateRut(row.rut),
            birthDate: ValidationHelper.validateBirthDate(row.birthDate),
            email: ValidationHelper.validateBirthDate(row.email),
            address: row.address?.toString() || '',
            phone: ValidationHelper.validateBirthDate(row.phone),
        };

        return player;
    }

    validaRut(rutCompleto) {
        if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto))
            return false;
        var tmp = rutCompleto.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv == 'K') digv = 'k';
        return (this.dv(rut) == digv);
    }

    dv(rut) {
        var M = 0,
            S = 1;
        for (; rut; rut = Math.floor(rut / 10))
            S = (S + rut % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}