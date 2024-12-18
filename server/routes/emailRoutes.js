import express from 'express';
import { sendSecretSantaEmail } from '../controllers/emailController.js';
import { emailRateLimiter } from '../middleware/rateLimiter.js';
import { validateEmailRequest } from '../middleware/validation.js';

const router = express.Router();

router.use(emailRateLimiter);
router.use(validateEmailRequest);
router.post('/send-secret-santa', sendSecretSantaEmail);

export default router;