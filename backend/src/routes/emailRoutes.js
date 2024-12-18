import express from 'express';
import { sendSecretSantaEmail } from '../controllers/emailController.js';
import { validateSecretSantaPair } from '../middleware/validation.middleware.js';
import { rateLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

router.post(
  '/send-secret-santa',
  rateLimiter,
  validateSecretSantaPair,
  async (req, res, next) => {
    try {
      const result = await sendSecretSantaEmail(req, res);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router as emailRouter };