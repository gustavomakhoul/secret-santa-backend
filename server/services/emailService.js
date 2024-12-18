import { Resend } from 'resend';
import { environment } from '../config/environment.js';
import { generateSecretSantaEmail } from '../templates/secretSanta.js';
import { EMAIL_CONSTANTS } from '../config/constants.js';

class EmailService {
  constructor() {
    if (!environment.resendApiKey) {
      throw new Error('Resend API key is not configured');
    }
    this.client = new Resend(environment.resendApiKey);
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
        throw new Error('Failed to send email - no response ID');
      }

      return response;
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();