import dotenv from 'dotenv';
import { WhatsServer } from './whatsapp/whats_server';
import { Logger } from './helpers/logger';
import { CreateOptions } from '@wppconnect-team/wppconnect';

dotenv.config();

const config: CreateOptions  = {
    session: 'session',
    headless: 'shell',
    logQR: true,
    updatesLog: false,
    phoneNumber: process.env.PHONE_NUMBER,
    catchLinkCode: (str: any) => console.log('Code: ' + str)
    };

const logger = new Logger()
const whatsapp = new WhatsServer(logger);
whatsapp.start(config);