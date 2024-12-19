import { Client } from 'whatsapp-web.js';
import { Socket } from 'socket.io';

export function handleWhatsAppEvents(client: Client, socket: Socket) {
  client.on('qr', (qr) => {
    console.log('QR Code received');
    socket.emit('qr', qr);
  });

  client.on('ready', () => {
    console.log('WhatsApp client is ready');
    socket.emit('ready');
  });

  client.on('disconnected', () => {
    console.log('WhatsApp client disconnected');
    socket.emit('disconnected');
  });

  client.on('auth_failure', (error) => {
    console.error('WhatsApp authentication failed:', error);
    socket.emit('error', 'Authentication failed');
  });
}