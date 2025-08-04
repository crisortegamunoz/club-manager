import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { environments } from './common/config/environments';
import { UserModule } from './users/user.module';
import { ImportsModule } from './imports/imports.module';

import * as Joi from 'joi';
import config from './config';

const env = process.env.NODE_ENV ?? '.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[env],
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_PORT: Joi.number().required()
      })
    }),
    HttpModule,
    PlayersModule,
    AuthModule,
    DatabaseModule,
    UserModule,
    ImportsModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService],
})
export class AppModule { }
