import { Socket } from 'socket.io';
import { Client } from 'whatsapp-web.js';
import { handleMessageSending } from '../services/socketService.js';

export function registerSocketEvents(socket: Socket, whatsappClient: Client): void {
  socket.on('sendMessage', async (data, callback) => {
    await handleMessageSending(socket, whatsappClient, data, callback);
  });
}