import { Client } from 'whatsapp-web.js';
import { formatPhoneNumber, validatePhoneNumber } from './messageFormatter.js';
import { WhatsAppError } from '../errors/WhatsAppError.js';

export async function sendWhatsAppMessage(
  client: Client, 
  to: string, 
  message: string
): Promise<void> {
  if (!validatePhoneNumber(to)) {
    throw new WhatsAppError('Invalid phone number format');
  }

  try {
    const formattedNumber = formatPhoneNumber(to);
    await client.sendMessage(formattedNumber, message);
  } catch (error) {
    throw new WhatsAppError(
      'Failed to send WhatsApp message',
      { cause: error }
    );
  }
}