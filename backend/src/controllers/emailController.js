import { emailService } from '../services/emailService.js';
import { HTTP_STATUS } from '../config/constants.js';

export async function sendSecretSantaEmail(req, res) {
  const { pair } = req.body;
  
  if (!pair?.giver || !pair?.receiver) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: 'Invalid request data',
      details: 'Missing pair data'
    });
  }

  const emailResponse = await emailService.sendEmail(pair.giver, pair.receiver);
  return { success: true, messageId: emailResponse.id };
}