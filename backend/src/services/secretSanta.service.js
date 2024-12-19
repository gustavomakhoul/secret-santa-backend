import { resendService } from './resend.service.js';
import { generateSecretSantaEmail } from '../templates/secretSanta.js';

export class SecretSantaService {
  async sendSecretSantaEmail(giver, receiver) {
    const html = generateSecretSantaEmail(giver, receiver);
    return resendService.sendEmail(giver.email, html);
  }
}

export const secretSantaService = new SecretSantaService();