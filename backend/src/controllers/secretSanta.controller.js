import { secretSantaService } from '../services/secretSanta.service.js';
import { HTTP_STATUS } from '../config/constants.js';

export async function sendSecretSantaEmail(req, res) {
  const { pair } = req.body;
  
  const emailResponse = await secretSantaService.sendSecretSantaEmail(
    pair.giver,
    pair.receiver
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    messageId: emailResponse.id
  });
}