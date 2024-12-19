import { ClientOptions } from 'whatsapp-web.js';
import { puppeteerConfig } from '../../config/puppeteerConfig.js';

export const whatsappConfig: ClientOptions = {
  puppeteer: puppeteerConfig
};