import dotenv from 'dotenv';
import { Logger } from './helpers/logger';
import { CreateOptions } from '@wppconnect-team/wppconnect';
import 'reflect-metadata';
import { WhatsAppServer } from './whatsapp/core/server';

dotenv.config();

const config: CreateOptions  = {
    session: 'session',
    headless: 'shell',
    debug: true,
    logQR: true,
    updatesLog: true,
    phoneNumber: process.env.PHONE_NUMBER,
    puppeteerOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
};

const logger = new Logger()
// const api_server = new ApiServer(logger, 3000);
const whatsapp = new WhatsAppServer();

whatsapp.start(config);