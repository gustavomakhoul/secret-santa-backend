import { Resend } from 'resend';
import { emailConfig } from '../config/email.config.js';
import { EmailServiceError } from '../utils/errors.js';

class ResendService {
  constructor() {
    if (!emailConfig.resendApiKey) {
      throw new EmailServiceError('Resend API key is not configured');
    }
    this.client = new Resend(emailConfig.resendApiKey);
  }

  async sendEmail(to, html) {
    try {
      const response = await this.client.emails.send({
        from: emailConfig.defaults.from,
        to,
        subject: emailConfig.defaults.subject,
        html,
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

export const resendService = new ResendService();