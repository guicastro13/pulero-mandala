import dotenv from 'dotenv';
import { WhatsServer } from './whatsapp/whats_server';
import { Logger } from './helpers/logger';
import { CreateOptions } from '@wppconnect-team/wppconnect';
import { ApiServer } from './api/server';
import { HealthCheck } from './api/controller/heath_controller';
import { SampleController } from './api/controller/sample.controller';
import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import { PersonRepository } from './database/repository/person_repository';
import { Person } from './database/entity/person';
import { Place } from './database/entity/place';

dotenv.config();

// const config: CreateOptions  = {
//     session: 'session',
//     headless: 'shell',
//     logQR: true,
//     updatesLog: false,
//     // phoneNumber: process.env.PHONE_NUMBER,
//     puppeteerOptions: {
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     },
// };

// const logger = new Logger()
// const api_server = new ApiServer(logger, 3000);
// const whatsapp = new WhatsServer(logger);

// whatsapp.start(config);

// api_server.registerControllers([HealthCheck, SampleController]);
// api_server.start();
