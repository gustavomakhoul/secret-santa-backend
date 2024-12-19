import { Socket } from 'socket.io';
import { Client } from 'whatsapp-web.js';
import { sendWhatsAppMessage } from '../../whatsapp/services/messageService.js';
import { logger } from '../../utils/logger.js';

export async function handleMessageSending(
  socket: Socket,
  client: Client,
  data: { to: string; message: string },
  callback: (response: { success: boolean; error?: string }) => void
) {
  try {
    await sendWhatsAppMessage(client, data.to, data.message);
    callback({ success: true });
  } catch (error) {
    logger.error('Message sending failed:', error);
    callback({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}