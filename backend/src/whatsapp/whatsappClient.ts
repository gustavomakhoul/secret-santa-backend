import { Client } from 'whatsapp-web.js';

export function setupWhatsAppClient() {
  const client = new Client({
    puppeteer: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  });

  client.initialize().catch(error => {
    console.error('Failed to initialize WhatsApp client:', error);
  });

  return client;
}