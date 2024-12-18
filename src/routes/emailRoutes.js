import express from 'express';
import rateLimit from 'express-rate-limit';
import { sendEmail } from '../services/emailService.js';
import { validateEmailRequest } from '../middleware/validation.js';

const router = express.Router();

const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

router.post('/send-secret-santa', emailRateLimiter, validateEmailRequest, async (req, res) => {
  try {
    const { pair } = req.body;
    const emailResponse = await sendEmail(pair.giver, pair.receiver);
    
    res.json({ 
      success: true, 
      messageId: emailResponse.id 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Failed to send email';
    
    res.status(statusCode).json({
      error: message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export { router as emailRouter };