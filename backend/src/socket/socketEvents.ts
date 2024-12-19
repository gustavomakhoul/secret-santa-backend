import { Socket } from 'socket.io';
import { Client } from 'whatsapp-web.js';
import { sendWhatsAppMessage } from '../whatsapp/messageService.js';

export function handleSocketEvents(socket: Socket, whatsappClient: Client) {
  socket.on('sendMessage', async (data, callback) => {
    try {
      await sendWhatsAppMessage(whatsappClient, data.to, data.message);
      callback({ success: true });
    } catch (error) {
      console.error('Error sending message:', error);
      callback({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });
}