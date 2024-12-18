import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://courageous-horse-5119ed.netlify.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email template
function generateSecretSantaEmail(giver, receiver) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #dc2626; text-align: center;">🎁 Amigo Secreto em Família</h1>
      <p style="font-size: 16px; line-height: 1.5;">
        Olá ${giver.name},
      </p>
      <p style="font-size: 16px; line-height: 1.5;">
        O sorteio do amigo secreto foi realizado! Você irá presentear:
      </p>
      <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <h2 style="color: #dc2626; margin: 0;">${receiver.name}</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.5;">
        Lembre-se: mantenha o segredo até o dia da revelação! 🤫
      </p>
      <p style="font-size: 14px; color: #666; margin-top: 40px; text-align: center;">
        Este é um email automático, por favor não responda.
      </p>
    </div>
  `;
}

// Routes
app.post('/api/send-secret-santa', limiter, async (req, res) => {
  try {
    const { pair } = req.body;

    if (!pair?.giver?.email || !pair?.receiver?.name || !pair?.giver?.name) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: 'Missing required participant information'
      });
    }

    const response = await resend.emails.send({
      from: 'Amigo Secreto <onboarding@resend.dev>',
      to: pair.giver.email,
      subject: '🎄 Seu Amigo Secreto foi sorteado!',
      html: generateSecretSantaEmail(pair.giver, pair.receiver),
    });

    if (!response?.id) {
      throw new Error('Failed to send email - no response ID');
    }

    res.json({ success: true, messageId: response.id });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Development server
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Vercel serverless export
export default app;