import { Client } from 'whatsapp-web.js';

export async function sendWhatsAppMessage(
  client: Client, 
  to: string, 
  message: string
) {
  try {
    const formattedNumber = `${to}@c.us`;
    await client.sendMessage(formattedNumber, message);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw new Error('Failed to send WhatsApp message');
  }
}