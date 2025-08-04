import { BadRequestException } from '@nestjs/common';
import { parse, isValid } from 'date-fns';
import validator from 'validator';

export class ValidationHelper {

    static validateStringLetters(value: string): string {
        return value.trim();
    }

    static validateRut(value: string): string {
        return value.trim();
    }


    static validateEmail(email: string): string {
        if (!email || !validator.isEmail(email)) {
            throw new BadRequestException(`Formato del email invalido: ${email}`);
        }
        return email.toLowerCase().trim();
    }

    static validatePhone(phone: string): string {
        if (!phone) {
            throw new BadRequestException('El número de telefono es requerido');
        }

        let cleanPhone = phone.toString().replace(/\s+/g, '');

        if (cleanPhone.startsWith('+56')) cleanPhone = cleanPhone.substring(3);
        if (cleanPhone.startsWith('56')) cleanPhone = cleanPhone.substring(2);

        if (!/^\d{9}$/.test(cleanPhone)) {
            throw new BadRequestException(`El número debe tener al menos nueve digitos: ${phone}`);
        }

        return `+56${cleanPhone}`;
    }

    static validateBirthDate(dateStr: string): string {
        if (!dateStr) {
            throw new BadRequestException('Fecha de nacimiento es requerido');
        }

        const parsedDate = parse(dateStr, 'dd-MM-yyyy', new Date());
        if (!isValid(parsedDate)) {
            throw new BadRequestException(
                `Formato de la fecha es invalido: ${dateStr}. Se espera que sea dd-MM-yyyy`,
            );
        }

        return parsedDate.toISOString();
    }
}