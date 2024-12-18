import { Resend } from 'resend';
import { EMAIL_CONSTANTS } from '../config/constants.js';
import { generateSecretSantaEmail } from '../templates/secretSanta.js';
import { EmailServiceError } from '../utils/errors.js';

class EmailService {
  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new EmailServiceError('Resend API key is not configured');
    }
    this.client = new Resend(apiKey);
  }

  async sendEmail(giver, receiver) {
    try {
      const response = await this.client.emails.send({
        from: EMAIL_CONSTANTS.FROM_ADDRESS,
        to: giver.email,
        subject: EMAIL_CONSTANTS.SUBJECT,
        html: generateSecretSantaEmail(giver, receiver),
      });

      if (!response?.id) {
        throw new EmailServiceError('Failed to send email - no response ID');
      }

      return response;
    } catch (error) {
      if (error instanceof EmailServiceError) {
        throw error;
      }
      throw new EmailServiceError('Failed to send email', { cause: error });
    }
  }
}

export const emailService = new EmailService();