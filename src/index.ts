import dotenv from 'dotenv';
import { WhatsServer } from './whatsapp/whats_server';

dotenv.config();

new WhatsServer();