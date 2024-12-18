import { ERROR_MESSAGES } from '../config/constants';
import { sendSecretSantaRequest } from '../utils/api';
import type { SecretSantaPair } from '../types';

export async function sendSecretSantaEmail(pair: SecretSantaPair): Promise<void> {
  if (!pair?.giver?.email || !pair?.receiver?.name || !pair?.giver?.name) {
    throw new Error(ERROR_MESSAGES.INCOMPLETE_DATA);
  }

  try {
    await sendSecretSantaRequest(pair);
  } catch (error) {
    console.error('Error sending secret santa email:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        throw new Error(ERROR_MESSAGES.RATE_LIMIT);
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error(ERROR_MESSAGES.CONNECTION_ERROR);
      }
      throw new Error(`Falha ao enviar email para ${pair.giver.name}: ${error.message}`);
    }
    
    throw new Error(`${ERROR_MESSAGES.UNEXPECTED_ERROR} para ${pair.giver.name}`);
  }
}