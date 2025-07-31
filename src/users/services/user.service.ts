import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../../users/entities/user.entity';
import { RegisterDTO } from '../dtos/register.dto';
import { UpdatePassword } from '../dtos/update-password.dto';


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
        const newUser = new this.userModel(data);
        const hassPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hassPassword;
        return newUser.save();
    }

    changePassword(email: string, changes: UpdatePassword) {

    }

    createUserByPlayer() {

    }

}
