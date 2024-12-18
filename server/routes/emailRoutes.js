import express from 'express';
import { emailRateLimiter } from '../middleware/rateLimiter.js';
import { validateEmailRequest } from '../middleware/validation.js';
import { sendSecretSantaEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send-secret-santa', emailRateLimiter, validateEmailRequest, sendSecretSantaEmail);

export { router as emailRouter };