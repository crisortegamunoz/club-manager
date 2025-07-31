import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Role } from '../../common/enums/role.enum';
import { Player } from '../../players/entities/player.entity';

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    @ExcludeProperty()
    password: string;

    @Prop({
        type: String,
        enum: Object.values(Role)
    })
    role: Role;

    @Prop({ type: Types.ObjectId, ref: Player.name })
    player?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);