import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../../users/entities/user.entity';
import { RegisterDTO, UpdateUserDTO } from '../dtos/register.dto';
import { UpdatePassword } from '../dtos/update-password.dto';
import { Player } from '../../players/entities/player.entity';
import { Role } from '../../common/enums/role.enum';
import { handleMongoDuplicateKeyError } from '../../common/exceptions/team-exception';


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {

    }

    findAll() {
        return this.userModel.find().exec()
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }

    async delete(id: string) {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return this.userModel.findByIdAndDelete(id);
    }

    async findByEmail(email: string) {
        const user = await this.userModel.findOne({ email }).exec();
        return user;
    }

    async register(data: RegisterDTO) {
        try {
            const newUser = new this.userModel(data);
            const hashPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashPassword;
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            handleMongoDuplicateKeyError(error);
        }
    }

    async changePassword(email: string, update: UpdatePassword) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        const hashPassword = await bcrypt.hash(update.newPassword, 10);
        const changes: UpdateUserDTO = {
            password: hashPassword
        }
        return await this.userModel.findByIdAndUpdate(user._id, { $set: changes }, { new: true }).exec();

    }

    async createUserByPlayer(id: string, player: Player) {
        const password = this.generatePassword(player.firstName, player.birthDate);
        console.log(password);
        const data: RegisterDTO = {
            email: player.email,
            password: password,
            role: Role.DELEGATE,
            player: id
        }
        const user = await this.register(data);
        return user
    }

    private generatePassword(firstName: string, birthDate: Date) {
        const first4 = firstName.substring(0, 4);
        const day = birthDate.getUTCDate().toString().padStart(2, '0');
        const month = (birthDate.getUTCMonth() + 1).toString().padStart(2, '0');
        return `${first4}${day}${month}`
    }

}
