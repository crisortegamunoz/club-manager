import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { PaymentStatus } from '../enums/payment-status.enum';
import { ClubStatus } from '../enums/club-status.enum';
import { Role } from '../../common/enums/role.enum';

@Schema({ timestamps: true })
export class Player extends Document {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    rut: string;

    @Prop({ required: true, type: Date })
    birthDate: Date;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    address: string;

    @Prop()
    phone: string;

    @Prop({
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING,
    })
    paymentStatus: PaymentStatus;

    @Prop({
        type: String,
        enum: Object.values(ClubStatus),
        default: ClubStatus.ACTIVE,
    })
    clubStatus: ClubStatus;

    @Prop({
        type: String,
        enum: Object.values(Role),
        default: Role.PLAYER,
    })
    role: Role;

    @Prop({ type: Date })
    lastPaymentDate?: Date;

}

export const PlayerSchema = SchemaFactory.createForClass(Player);