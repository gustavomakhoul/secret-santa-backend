export const serverConfig = {
  port: process.env.PORT || 3001,
  environment: process.env.NODE_ENV || 'development',
  resendApiKey: process.env.RESEND_API_KEY,
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:5173',
    'https://courageous-horse-5119ed.netlify.app'
  ]
};