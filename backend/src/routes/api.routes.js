import express from 'express';
import { sendSecretSantaEmail } from '../controllers/secretSanta.controller.js';
import { validateSecretSantaPair } from '../middleware/validation.middleware.js';
import { rateLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

router.post(
  '/send-secret-santa',
  rateLimiter,
  validateSecretSantaPair,
  sendSecretSantaEmail
);

export { router as apiRouter };