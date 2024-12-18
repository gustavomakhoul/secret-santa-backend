import express from 'express';
import { sendSecretSantaEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send-secret-santa', async (req, res, next) => {
  try {
    const result = await sendSecretSantaEmail(req, res);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router as emailRouter };