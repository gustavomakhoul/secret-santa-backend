export const config = {
  port: process.env.PORT || 3001,
  resendApiKey: process.env.RESEND_API_KEY,
  environment: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://secret-santa-backend.onrender.com'
    : 'http://localhost:3001'
};