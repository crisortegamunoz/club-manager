import { BadRequestException, ConflictException } from '@nestjs/common';

export function handleMongoDuplicateKeyError(error: any): never {
  if (error.code === 11000) {
    const duplicatedField = Object.keys(error.keyValue)[0];
    let message = `El valor del campo '${duplicatedField}' ya está en uso`;

    switch (duplicatedField) {
      case 'email':
        message = 'El email ya esta en uso, procura utilizar otro o verificar si la persona ya existe en el sistema.';
        break;
    }

    throw new ConflictException(message);
  }
  throw new BadRequestException('Hubo un error, favor comuniquese con su administrador');
}