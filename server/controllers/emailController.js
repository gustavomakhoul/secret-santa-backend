import { emailService } from '../services/emailService.js';
import { handleEmailError } from '../utils/errorHandlers.js';

export async function sendSecretSantaEmail(req, res) {
  try {
    const { pair } = req.body;
    const emailResponse = await emailService.sendEmail(pair.giver, pair.receiver);
    
    res.json({ 
      success: true, 
      messageId: emailResponse.id 
    });
  } catch (error) {
    const { statusCode, errorResponse } = handleEmailError(error);
    res.status(statusCode).json(errorResponse);
  }
}