import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables first
const requiredEnvVars = ['RESEND_API_KEY'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const environment = {
  port: process.env.PORT || 3001,
  resendApiKey: process.env.RESEND_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://secret-santa-backend.vercel.app'
    : 'http://localhost:3001'
};